import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import TodoPage from './pages/TodoPage'
import { AuthProvider, useAuth } from './context/AuthContext' // Import useAuth to use inside PrivateRoute

// PrivateRoute component that will redirect if the user is not logged in
const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth() // Now use the useAuth hook here

  // If user is not logged in, redirect to login page
  if (!user) {
    return <Navigate to='/login' />
  }

  return <>{children}</> // Render the children components if the user is logged in
}

const App: React.FC = () => {
  return (
    <AuthProvider>
      {' '}
      {/* Wrap the app with AuthProvider to provide the auth context */}
      <Router>
        <Routes>
          {/* Redirect root to login */}
          <Route path='/' element={<Navigate to='/login' />} />

          {/* Login screen */}
          <Route path='/login' element={<LoginPage />} />

          {/* Protected Home page */}
          <Route
            path='/home'
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />

          {/* Specific todo list page */}
          <Route
            path='/todos/:listId'
            element={
              <PrivateRoute>
                <TodoPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
