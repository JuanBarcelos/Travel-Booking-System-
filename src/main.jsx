import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Router } from './App.jsx'
import { RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToastContainer theme='dark'/>
    <RouterProvider router={Router} />
  </StrictMode>,
)
