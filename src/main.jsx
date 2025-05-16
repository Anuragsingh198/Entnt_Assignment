import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {AuthProvider} from './contexts/AuthContext.jsx'
import { NotificationProvider } from './contexts/Notification.jsx'
import { JobProvider } from './contexts/JobContext.jsx'
import { ComponentProvider } from './contexts/ComponentsContext.jsx'
import { ShipProvider } from './contexts/ShipsContext.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NotificationProvider>
    <AuthProvider>
      <ShipProvider>
      <JobProvider>
    <ComponentProvider>
    <App />
    </ComponentProvider>
      </JobProvider>
      </ShipProvider>
    </AuthProvider>
    </NotificationProvider>
  </StrictMode>,
)
