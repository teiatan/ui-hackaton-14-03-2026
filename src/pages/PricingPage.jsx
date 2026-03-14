import { Link } from 'react-router-dom'

function PricingPage() {
  return (
    <section className="page">
      <h1>Ефективні стратегії продажу та прозорі тарифні плани</h1>
      <div className="btn-group">
        <div className="plan-card">
          <p>тижнева підписка</p>
          <Link className="btn" to="/page-4">
            купити
          </Link>
        </div>
        <div className="plan-card">
          <p>місячна підписка</p>
          <Link className="btn" to="/page-4">
            купити
          </Link>
        </div>
        <div className="plan-card">
          <p>річна підписка</p>
          <Link className="btn" to="/page-4">
            купити
          </Link>
        </div>
      </div>
    </section>
  )
}

export default PricingPage
