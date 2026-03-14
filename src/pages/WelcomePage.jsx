import { useState } from 'react'
import { Link } from 'react-router-dom'
import capsuleLogo from '../assets/CAPSULE.svg'
import featureImage1 from '../assets/image 1.jpg'
import featureImage2 from '../assets/image 2.jpg'
import featureImage3 from '../assets/image 3.jpg'
import featureImage4 from '../assets/image 4.jpg'

function WelcomePage() {
  const [openFaqIndex, setOpenFaqIndex] = useState(2)

  const faqItems = [
    {
      question: 'How does the quiz work?',
      answer: 'You answer 6 quick questions about your lifestyle, preferences, and fit.',
    },
    {
      question: 'What do I get with a subscription?',
      answer: 'You get AI styling chat, outfit ideas, and capsule recommendations tailored to you.',
    },
    {
      question: 'Can I change my style preferences later?',
      answer:
        'Absolutely. You can retake the quiz anytime or simply tell your AI stylist about changes in your preferences during chat.',
    },
    {
      question: 'What budgets are supported?',
      answer: 'From budget-friendly picks to premium brands — your recommendations follow your budget.',
    },
    {
      question: 'Is my data private?',
      answer: 'Yes, your data is used only to personalize your styling experience.',
    },
    {
      question: 'Can I cancel anytime?',
      answer: 'Yes, you can cancel your subscription at any time in your account settings.',
    },
  ]

  const toggleFaq = (index) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index))
  }

  return (
    <section className="landing">
      <header className="landing-header">
        <img className="landing-logo" src={capsuleLogo} alt="CAPSULE" />
        <nav className="landing-nav" aria-label="Main navigation">
          <a href="#how-it-works">How it works</a>
          <a href="#why-capsule">Why Capsule</a>
          <a href="#faq">FAQ</a>
        </nav>
        <Link className="landing-top-button" to="/quiz" state={{ forceStart: true }}>
          Start Quiz
        </Link>
      </header>

      <div className="landing-hero">
        <p className="landing-kicker">AI-POWERED PERSONAL STYLING</p>
        <h1>Your wardrobe, curated by AI</h1>
        <p className="landing-subtitle">
          Answer questions — get a personalized lookbook in seconds
        </p>
        <Link className="landing-cta" to="/quiz" state={{ forceStart: true }}>
          Start Quiz
        </Link>
      </div>

      <div className="landing-scroll">
        <p>SCROLL TO EXPLORE</p>
        <span>↓</span>
      </div>

      <section id="why-capsule" className="landing-features" aria-label="What Capsule does">
        <h2>What Capsule does</h2>
        <div className="features-grid">
          <article className="feature-card">
            <img className="feature-media" src={featureImage1} alt="Style Quiz" />
            <h3>Style Quiz</h3>
            <p>Understands your taste in 6 questions</p>
          </article>

          <article className="feature-card">
            <img className="feature-media" src={featureImage2} alt="AI Capsule" />
            <h3>AI Capsule</h3>
            <p>Generates 6–12 outfits tailored to you</p>
          </article>

          <article className="feature-card">
            <img className="feature-media" src={featureImage3} alt="Brand Picks" />
            <h3>Brand Picks</h3>
            <p>Real products matched to your budget</p>
          </article>

          <article className="feature-card">
            <img className="feature-media" src={featureImage4} alt="Lookbook PDF" />
            <h3>Lookbook PDF</h3>
            <p>Save and share your capsule</p>
          </article>
        </div>
      </section>

      <section id="how-it-works" className="landing-how-it-works" aria-label="How it works">
        <h2>How it works</h2>
        <div className="steps-line" aria-hidden="true"></div>

        <div className="steps-grid">
          <article className="step-card">
            <div className="step-number">1</div>
            <h3>Take the quiz</h3>
            <p>6 questions about your lifestyle and taste</p>
          </article>

          <article className="step-card">
            <div className="step-number">2</div>
            <h3>Choose your plan</h3>
            <p>Unlock your personal AI stylis</p>
          </article>

          <article className="step-card">
            <div className="step-number">3</div>
            <h3>Chat with your stylist</h3>
            <p>Get outfits, advice, shopping picks on demand</p>
          </article>
        </div>
      </section>

      <section className="landing-stylist" aria-label="Meet your stylist">
        <h2>Meet your stylist</h2>

        <div className="stylist-card">
          <div className="stylist-card-header">
            <div className="stylist-avatar" aria-hidden="true"></div>
            <div className="stylist-meta">
              <p>Capsule Stylist</p>
              <span>Online</span>
            </div>
          </div>

          <div className="stylist-card-body">
            <p className="stylist-bubble stylist-bubble--user">I'd like a capsule for weekend getaways</p>
            <p className="stylist-bubble stylist-bubble--assistant">
              Here's your Weekend Escape capsule — 8 pieces that mix and match beautifully ✨
            </p>

            <div className="stylist-gallery" aria-hidden="true">
              <span></span>
              <span></span>
              <span></span>
            </div>

            <p className="stylist-generated">3 outfits generated</p>
          </div>
        </div>
      </section>

      <section id="faq" className="landing-faq" aria-label="Frequently asked questions">
        <h2>FAQ</h2>

        <div className="faq-list">
          {faqItems.map((item, index) => {
            const isOpen = openFaqIndex === index

            return (
              <article key={item.question} className={`faq-item${isOpen ? ' is-open' : ''}`}>
                <button
                  type="button"
                  className="faq-item-toggle"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={isOpen}
                >
                  <span>{item.question}</span>
                </button>
                {isOpen && <p>{item.answer}</p>}
              </article>
            )
          })}
        </div>
      </section>

      <section className="landing-cta-panel" aria-label="Final call to action">
        <h2>Ready to find your style?</h2>
        <Link className="landing-panel-button" to="/quiz" state={{ forceStart: true }}>
          Start Quiz
        </Link>
      </section>

      <footer className="landing-footer" aria-label="Footer">
        <div className="footer-brand-block">
          <p className="footer-brand">CAPSULE</p>
          <p className="footer-tagline">Your AI-powered personal stylist</p>
        </div>

        <nav className="footer-nav" aria-label="Footer navigation">
          <a href="#how-it-works">How it works</a>
          <a href="#">Why Capsule</a>
          <a href="#">FAQ</a>
          <a href="#">Privacy Policy</a>
        </nav>

        <p className="footer-copy">© 2026 CAPSULE, Inc.</p>
      </footer>
    </section>
  )
}

export default WelcomePage
