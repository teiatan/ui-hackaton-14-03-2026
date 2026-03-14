/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const QUIZ_STORAGE_KEY = 'quizAnswers'

const QUIZ_QUESTIONS = [
  {
    question: 'What’s your gender?',
    options: ['Female', 'Male', 'Non-binary', 'Prefer not to say'],
  },
  {
    question: 'What’s your age group?',
    options: ['18–24', '25–34', '35–44', '45+'],
  },
  {
    question: 'What’s the biggest problem with your wardrobe right now?',
    options: [
      'I have clothes but don’t know how to combine them',
      'I wear the same outfits all the time',
      'My style feels outdated',
      'I want to look more polished',
    ],
  },
  {
    question: 'Which style feels closest to you?',
    options: [
      'Minimal / clean',
      'Elegant / classic',
      'Casual / street',
      'Trendy / fashion-forward',
      'I’m not sure',
    ],
  },
  {
    question: 'Where do you usually need outfits for?',
    options: [
      'Work / office',
      'Everyday casual',
      'Dates / social events',
      'A mix of everything',
    ],
  },
  {
    question: 'Would you like a personalized capsule wardrobe created for you?',
    options: ['Yes, definitely', 'That’s exactly what I need', 'I’d love to try it'],
  },
]

const createInitialAnswers = () =>
  QUIZ_QUESTIONS.map(({ question }) => ({
    question,
    answer: '',
  }))

function QuizPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const [answers, setAnswers] = useState(() => createInitialAnswers())
  const [currentIndex, setCurrentIndex] = useState(0)
  const forceStart = location.state?.forceStart === true

  useEffect(() => {
    if (forceStart) {
      const initialAnswers = createInitialAnswers()
      setAnswers(initialAnswers)
      setCurrentIndex(0)
      localStorage.setItem(QUIZ_STORAGE_KEY, JSON.stringify(initialAnswers))
      return
    }

    const savedAnswers = localStorage.getItem(QUIZ_STORAGE_KEY)

    if (!savedAnswers) {
      localStorage.setItem(QUIZ_STORAGE_KEY, JSON.stringify(createInitialAnswers()))
      return
    }

    try {
      const parsed = JSON.parse(savedAnswers)
      const isValidArray =
        Array.isArray(parsed) &&
        parsed.length === QUIZ_QUESTIONS.length &&
        parsed.every(
          (item) =>
            item && typeof item.question === 'string' && typeof item.answer === 'string',
        )

      if (!isValidArray) {
        localStorage.setItem(
          QUIZ_STORAGE_KEY,
          JSON.stringify(createInitialAnswers()),
        )
        return
      }

      const answerMap = new Map(parsed.map((item) => [item.question, item.answer]))
      const normalizedAnswers = QUIZ_QUESTIONS.map(({ question }) => ({
        question,
        answer: answerMap.get(question) || '',
      }))

      setAnswers(normalizedAnswers)

      const firstUnanswered = normalizedAnswers.findIndex((item) => !item.answer)
      if (firstUnanswered === -1) {
        navigate('/page-3', { replace: true })
      } else {
        setCurrentIndex(firstUnanswered)
      }
    } catch {
      localStorage.setItem(QUIZ_STORAGE_KEY, JSON.stringify(createInitialAnswers()))
    }
  }, [forceStart, navigate])

  useEffect(() => {
    localStorage.setItem(QUIZ_STORAGE_KEY, JSON.stringify(answers))
  }, [answers])

  const activeQuestion = QUIZ_QUESTIONS[currentIndex]
  const selectedAnswer = answers[currentIndex]?.answer || ''
  const isLastQuestion = currentIndex === QUIZ_QUESTIONS.length - 1

  const selectAnswer = (answer) => {
    setAnswers((prevAnswers) =>
      prevAnswers.map((item, index) =>
        index === currentIndex ? { ...item, answer } : item,
      ),
    )
  }

  const goNext = () => {
    if (!selectedAnswer) {
      return
    }

    if (isLastQuestion) {
      navigate('/page-3')
      return
    }

    setCurrentIndex((prevIndex) => prevIndex + 1)
  }

  const goBack = () => {
    if (currentIndex === 0) {
      navigate('/')
      return
    }

    setCurrentIndex((prevIndex) => prevIndex - 1)
  }

  return (
    <section className="quiz-page">
      <p className="quiz-brand">CAPSULE</p>

      <div className="quiz-card">
        <p className="quiz-intro">
          {currentIndex + 1} of {QUIZ_QUESTIONS.length} questions
        </p>
        <h1 className="quiz-question">{activeQuestion.question}</h1>
        <div className="quiz-options">
          {activeQuestion.options.map((option) => (
            <button
              key={option}
              type="button"
              className={`option-btn${selectedAnswer === option ? ' active' : ''}`}
              onClick={() => selectAnswer(option)}
            >
              <span className="option-dot" aria-hidden="true"></span>
              <span>{option}</span>
            </button>
          ))}
        </div>
        <div className="quiz-actions">
          <button
            type="button"
            className="btn secondary"
            onClick={goBack}
          >
            Back
          </button>
          <button
            type="button"
            className="btn"
            onClick={goNext}
            disabled={!selectedAnswer}
          >
            {isLastQuestion ? 'Finish' : 'Next'}
          </button>
        </div>
      </div>
    </section>
  )
}

export default QuizPage
