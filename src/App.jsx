import { Navigate, Route, Routes } from 'react-router-dom'
import PricingPage from './pages/PricingPage'
import QuizPage from './pages/QuizPage'
import WelcomePage from './pages/WelcomePage'

const QUIZ_ROUTE = '/quiz'

function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path={QUIZ_ROUTE} element={<QuizPage />} />
        <Route path="/page-2" element={<Navigate to={QUIZ_ROUTE} replace />} />
        <Route path="/page-3" element={<PricingPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </main>
  )
}

export default App
