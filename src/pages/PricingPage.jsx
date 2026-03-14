import { Link } from 'react-router-dom'
import capsuleLogo from '../assets/CAPSULE.svg'

function PricingPage() {
  const plans = [
    {
      title: 'Weekly',
      price: '$4,99',
      period: '/year',
      saveBadge: '',
      topBadge: '',
      highlighted: false,
    },
    {
      title: 'Monthly',
      price: '$11,99',
      period: '/year',
      saveBadge: 'Save 23%',
      topBadge: 'Best value',
      highlighted: true,
    },
    {
      title: 'Yearly',
      price: '$79,99',
      period: '/year',
      saveBadge: 'Save 45%',
      topBadge: '',
      highlighted: false,
    },
  ]

  const features = [
    'Unlimited capsule generation',
    'AI stylist chat',
    'Brand picks matched to budget',
    'PDF lookbook export',
    'Full quiz personalization',
  ]

  return (
    <section className="pricing-page">
      <Link className="pricing-close" to="/" aria-label="Go to homepage">
        ×
      </Link>

      <img className="pricing-brand" src={capsuleLogo} alt="CAPSULE" />
      <h1 className="pricing-title">Choose your plan</h1>
      <p className="pricing-subtitle">Unlock your personal AI stylist</p>

      <div className="pricing-grid">
        {plans.map((plan) => (
          <article
            key={plan.title}
            className={`pricing-card${plan.highlighted ? ' pricing-card--highlighted' : ''}`}
          >
            {plan.topBadge && <p className="pricing-top-badge">{plan.topBadge}</p>}

            <div className="pricing-card-body">
              {plan.saveBadge && <p className="pricing-save-badge">{plan.saveBadge}</p>}

              <div className="pricing-head">
                <h2>{plan.title}</h2>
                <p className="pricing-price">
                  <strong>{plan.price}</strong>
                  <span>{plan.period}</span>
                </p>
              </div>

              <ul className="pricing-feature-list" aria-label={`${plan.title} plan features`}>
                {features.map((feature) => (
                  <li key={`${plan.title}-${feature}`}>{feature}</li>
                ))}
              </ul>

              <Link className="pricing-buy-btn" to="/page-4">
                Get started
              </Link>
            </div>
          </article>
        ))}
      </div>

      <p className="pricing-note">All plans include the same features. Pay less when you commit longer.</p>
    </section>
  )
}

export default PricingPage
