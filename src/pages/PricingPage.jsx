import { Link } from 'react-router-dom'

function PricingPage() {
  return (
    <section className="pricing-page">
      <h1 className="pricing-title">Choose your Capsule plan</h1>
      <p className="pricing-subtitle">Pick the subscription that fits your rhythm</p>

      <div className="pricing-grid">
        <div className="pricing-card">
          <p className="pricing-label">тижнева підписка</p>
          <Link className="pricing-buy-btn" to="/page-4">
            купити
          </Link>
        </div>

        <div className="pricing-card">
          <p className="pricing-label">місячна підписка</p>
          <Link className="pricing-buy-btn" to="/page-4">
            купити
          </Link>
        </div>

        <div className="pricing-card">
          <p className="pricing-label">річна підписка</p>
          <Link className="pricing-buy-btn" to="/page-4">
            купити
          </Link>
        </div>
      </div>
    </section>
  )
}

export default PricingPage
