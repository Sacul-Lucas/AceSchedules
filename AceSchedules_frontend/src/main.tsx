import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import '../src/Core/Css/Owned/Globals.css'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
