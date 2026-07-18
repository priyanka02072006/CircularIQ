import React from 'react'
import { createRoot } from 'react-dom/client'
import { AppProvider } from './context/AppContext'
import { CopilotProvider } from './context/CopilotContext'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppProvider>
      <CopilotProvider>
        <App />
      </CopilotProvider>
    </AppProvider>
  </React.StrictMode>,
)
