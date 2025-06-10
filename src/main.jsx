import { createRoot } from 'react-dom/client'
import './App.css'
import App from './App.jsx'
import { LanguageProvider } from './LanguageContext.jsx'

createRoot(document.getElementById('root')).render(
  <LanguageProvider>
    <App/>
  </LanguageProvider>,
)
