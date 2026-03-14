import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import PricingPage from './pages/PricingPage'
import QuizPage from './pages/QuizPage'
import WelcomePage from './pages/WelcomePage'
import Src2App from '../src2/App'
import '../src2/index.css'

const QUIZ_ROUTE = '/quiz'

function App() {
  const location = useLocation()
  const isProductPage = location.pathname === '/page-4'

  return (
    <main className={isProductPage ? 'product-page' : ''}>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path={QUIZ_ROUTE} element={<QuizPage />} />
        <Route path="/page-2" element={<Navigate to={QUIZ_ROUTE} replace />} />
        <Route path="/page-3" element={<PricingPage />} />
        <Route path="/page-4" element={<Src2App />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </main>
  )
}

export default App
