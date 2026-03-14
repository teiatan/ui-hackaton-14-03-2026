import { Link } from 'react-router-dom'

function WelcomePage() {
  return (
    <section className="page">
      <h1>вітальне слово. опис продукту.</h1>
      <Link className="btn" to="/quiz">
        call to action
      </Link>
    </section>
  )
}

export default WelcomePage
