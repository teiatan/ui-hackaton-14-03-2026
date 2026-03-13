import { useEffect, useState } from 'react'
import { Link, Navigate, Route, Routes } from 'react-router-dom'

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
  const [isLoading, setIsLoading] = useState(true)
  const [responseData, setResponseData] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    const loadApiStatus = async () => {
      setIsLoading(true)
      setError('')

      try {
        const response = await fetch(
          'https://api-hackaton-14-03-2026.onrender.com/health',
          {
            signal: controller.signal,
          },
        )

        const rawBody = await response.text()
        let parsedBody = rawBody

        try {
          parsedBody = JSON.parse(rawBody)
        } catch {
          parsedBody = rawBody
        }

        setResponseData({
          status: response.status,
          ok: response.ok,
          body: parsedBody,
        })
      } catch (requestError) {
        if (requestError.name !== 'AbortError') {
          setError(requestError.message || 'Помилка запиту до API')
        }
      } finally {
        setIsLoading(false)
      }
    }

    loadApiStatus()

    return () => {
      controller.abort()
    }
  }, [])

  return (
    <section className="page">
      <h1>демо АІ рішення</h1>
      <div className="api-status-card">
        <h2>статус АРІ</h2>
        {isLoading && <p className="loader">Завантаження...</p>}
        {!isLoading && error && <p>{error}</p>}
        {!isLoading && !error && responseData && (
          <pre>{JSON.stringify(responseData, null, 2)}</pre>
        )}
      </div>
      <Link className="btn" to="/page-3">
        кнопка на монетизацію
      </Link>
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
