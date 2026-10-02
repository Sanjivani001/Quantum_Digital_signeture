import { Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { AboutPage } from './pages/AboutPage'
import { CreateSignaturePage } from './pages/CreateSignaturePage'
import { HomePage } from './pages/HomePage'
import { LearnPage } from './pages/LearnPage'
import { QuantumLabPage } from './pages/QuantumLabPage'
import { TamperingDemoPage } from './pages/TamperingDemoPage'
import { VerifyPage } from './pages/VerifyPage'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/learn" element={<LearnPage />} />
        <Route path="/create" element={<CreateSignaturePage />} />
        <Route path="/verify" element={<VerifyPage />} />
        <Route path="/lab" element={<QuantumLabPage />} />
        <Route path="/demo" element={<TamperingDemoPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  )
}

export default App
