import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { UserProvider } from '../src/context/UserContext.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BookingProvider } from './context/BookingContext.jsx'
import { Router } from './routes/Router.jsx'

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToastContainer theme='dark'/>
    <QueryClientProvider client={queryClient}>
      <BookingProvider>
        <UserProvider>
          <RouterProvider router={Router} />
        </UserProvider>
      </BookingProvider>
    </QueryClientProvider>
  </StrictMode>,
)
