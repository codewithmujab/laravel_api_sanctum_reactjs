import React from 'react'
import ReactDOM from 'react-dom/client'
import './assets/index.css'
import('preline')
import { RouterProvider } from 'react-router-dom'
import router from './router/router.jsx'
import { ContextProvider } from './context/ContextProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
  </React.StrictMode>,
)
