import { useEffect, useState } from 'react'
import { Link, Navigate, Route, Routes } from 'react-router-dom'

const QUIZ_STORAGE_KEY = 'styleQuizAnswers'

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

function WelcomePage() {
  return (
    <section className="page">
      <h1>вітальне слово. опис продукту.</h1>
      <Link className="btn" to="/page-2">
        call to action
      </Link>
    </section>
  )
}

function SecondPage() {
  const [answers, setAnswers] = useState(() => createInitialAnswers())
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)

  useEffect(() => {
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
        setCurrentIndex(QUIZ_QUESTIONS.length - 1)
        setIsCompleted(true)
      } else {
        setCurrentIndex(firstUnanswered)
      }
    } catch {
      localStorage.setItem(QUIZ_STORAGE_KEY, JSON.stringify(createInitialAnswers()))
    }
  }, [])

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
      setIsCompleted(true)
      return
    }

    setCurrentIndex((prevIndex) => prevIndex + 1)
  }

  const goBack = () => {
    if (currentIndex === 0) {
      return
    }

    setCurrentIndex((prevIndex) => prevIndex - 1)
  }

  return (
    <section className="page">
      <h1>Квіз</h1>
      <div className="quiz-card">
        {!isCompleted && (
          <>
            <p className="quiz-progress">
              Питання {currentIndex + 1} з {QUIZ_QUESTIONS.length}
            </p>
            <h2>{activeQuestion.question}</h2>
            <div className="quiz-options">
              {activeQuestion.options.map((option) => (
                <button
                  key={option}
                  type="button"
                  className={`option-btn${selectedAnswer === option ? ' active' : ''}`}
                  onClick={() => selectAnswer(option)}
                >
                  {option}
                </button>
              ))}
            </div>
            <div className="quiz-actions">
              <button
                type="button"
                className="btn secondary"
                onClick={goBack}
                disabled={currentIndex === 0}
              >
                Назад
              </button>
              <button
                type="button"
                className="btn"
                onClick={goNext}
                disabled={!selectedAnswer}
              >
                {isLastQuestion ? 'Завершити' : 'Далі'}
              </button>
            </div>
          </>
        )}

        {isCompleted && (
          <>
            <h2>Дякуємо! Відповіді збережені.</h2>
            <p>Дані записані в localStorage як масив із 6 об’єктів.</p>
            <Link className="btn" to="/page-3">
              кнопка на монетизацію
            </Link>
          </>
        )}
      </div>
    </section>
  )
}

function ThirdPage() {
  return (
    <section className="page">
      <h1>Ефективні стратегії продажу та прозорі тарифні плани</h1>
      <div className="btn-group">
        <div className="plan-card">
          <p>тижнева підписка</p>
          <Link className="btn" to="/">
            купити
          </Link>
        </div>
        <div className="plan-card">
          <p>місячна підписка</p>
          <Link className="btn" to="/">
            купити
          </Link>
        </div>
        <div className="plan-card">
          <p>річна підписка</p>
          <Link className="btn" to="/">
            купити
          </Link>
        </div>
      </div>
    </section>
  )
}

function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/page-2" element={<SecondPage />} />
        <Route path="/page-3" element={<ThirdPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </main>
  )
}

export default App
