import { useState, useEffect } from 'react'

// Custom hook to manage state in localStorage
function useLocalStorage<T>(key: string, initialValue: T) {
  // Initialize the state with the stored value from localStorage or use the default initialValue
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error('Error reading from localStorage', error)
      return initialValue
    }
  })

  useEffect(() => {
    // Whenever storedValue changes, update the value in localStorage
    try {
      localStorage.setItem(key, JSON.stringify(storedValue))
    } catch (error) {
      console.error('Error writing to localStorage', error)
    }
  }, [key, storedValue])

  return [storedValue, setStoredValue] as const
}

export default useLocalStorage
