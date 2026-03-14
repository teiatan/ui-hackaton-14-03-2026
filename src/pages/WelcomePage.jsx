import { Link } from 'react-router-dom'
import capsuleLogo from '../assets/CAPSULE.svg'

function WelcomePage() {
  return (
    <section className="landing">
      <header className="landing-header">
        <img className="landing-logo" src={capsuleLogo} alt="CAPSULE" />
        <nav className="landing-nav" aria-label="Main navigation">
          <a href="#how-it-works">How it works</a>
          <a href="#">Why Capsule</a>
        </nav>
        <Link className="landing-top-button" to="/quiz">
          Start Quiz
        </Link>
      </header>

      <div className="landing-hero">
        <p className="landing-kicker">AI-POWERED PERSONAL STYLING</p>
        <h1>Your wardrobe, curated by AI</h1>
        <p className="landing-subtitle">
          Answer questions — get a personalized lookbook in seconds
        </p>
        <Link className="landing-cta" to="/quiz">
          Start Quiz
        </Link>
      </div>

      <div className="landing-scroll">
        <p>SCROLL TO EXPLORE</p>
        <span>↓</span>
      </div>

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

      <section className="landing-features" aria-label="What Capsule does">
        <h2>What Capsule does</h2>
        <div className="features-grid">
          <article className="feature-card">
            <div className="feature-media" aria-hidden="true"></div>
            <h3>Style Quiz</h3>
            <p>Understands your taste in 6 questions</p>
          </article>

          <article className="feature-card">
            <div className="feature-media" aria-hidden="true"></div>
            <h3>AI Capsule</h3>
            <p>Generates 6–12 outfits tailored to you</p>
          </article>

          <article className="feature-card">
            <div className="feature-media" aria-hidden="true"></div>
            <h3>Brand Picks</h3>
            <p>Real products matched to your budget</p>
          </article>

          <article className="feature-card">
            <div className="feature-media" aria-hidden="true"></div>
            <h3>Lookbook PDF</h3>
            <p>Save and share your capsule</p>
          </article>
        </div>
      </section>
    </section>
  )
}

export default WelcomePage
