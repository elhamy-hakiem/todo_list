import React, { createContext, useState, ReactNode, useContext } from 'react'

// Define the type of the context
interface AuthContextType {
  user: string | null
  login: (username: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined) // Set type for context

// AuthProvider component to wrap the application
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(localStorage.getItem('loggedInUser'))

  const login = (username: string) => {
    setUser(username)
    localStorage.setItem('loggedInUser', username) // Store the user in localStorage
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('loggedInUser') // Remove the user from localStorage
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children} {/* Wrap children components */}
    </AuthContext.Provider>
  )
}

// Custom hook to access the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider') // Ensure context is used inside AuthProvider
  }
  return context
}
