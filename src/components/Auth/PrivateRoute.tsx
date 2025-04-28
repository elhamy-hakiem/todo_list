// src/components/Auth/PrivateRoute.tsx
import React from 'react'
import { Navigate } from 'react-router-dom' // Use Navigate instead of Redirect in React Router v6
import { useAuth } from '../../context/AuthContext'

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth()

  // If no user is logged in, redirect to login page
  if (!user) {
    return <Navigate to='/login' replace />
  }

  return <>{children}</> // Render the children if the user is logged in
}

export default PrivateRoute
