// frontend/src/index.js
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// Find the root HTML element to mount the React app
const root = ReactDOM.createRoot(document.getElementById('root'))

// Render your App.jsx inside that root element
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
