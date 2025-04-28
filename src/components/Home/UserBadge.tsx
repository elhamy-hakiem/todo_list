import React from 'react'
import { useNavigate } from 'react-router-dom'

interface Props {
  username: string
}

const UserBadge: React.FC<Props> = ({ username }) => {
  const navigate = useNavigate()

  // Handle sign-out functionality
  const handleSignOut = () => {
    localStorage.removeItem('loggedInUser') // Remove user session from localStorage
    navigate('/login') // Redirect to login page
  }

  return (
    <div className='flex items-center space-x-2'>
      <span className='font-semibold'>{username} |</span>
      <button
        className='text-sm text-green-500 hover:underline'
        onClick={handleSignOut} // Trigger sign-out
      >
        Sign Out
      </button>
    </div>
  )
}

export default UserBadge
