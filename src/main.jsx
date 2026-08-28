import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import BackToTop from './components/BackToTop'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <BackToTop />
  </StrictMode>,
)
