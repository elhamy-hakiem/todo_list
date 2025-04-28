import React, { useEffect, useState } from 'react'
import { Search } from 'lucide-react'
import UserBadge from '../components/Home/UserBadge'
import TodoListCard from '../components/Home/TodoListCard'
import useLocalStorage from '../hooks/useLocalStorage'
import Todo from '../types/Todo'
import { v4 as uuidv4 } from 'uuid'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
  const [lists, setLists] = useLocalStorage<Todo[]>('todo-lists', [])
  const [user, setUser] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState<string>('') // State for search query
  const navigate = useNavigate()

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser')
    if (loggedInUser) {
      setUser(loggedInUser)
    } else {
      navigate('/login')
    }
  }, [navigate])

  const handleAddTodo = (title: string) => {
    const newList: Todo = {
      id: uuidv4(),
      title,
      tasks: [],
    }
    setLists([...lists, newList])
  }

  // Filter lists based on search query
  const filteredLists = lists.filter(
    (list) => list.title.toLowerCase().includes(searchQuery.toLowerCase()) // Case-insensitive search
  )

  return (
    <div className='min-h-screen bg-gray-100 p-6'>
      <div className='flex flex-col sm:flex-row justify-between items-center mb-6'>
        <div className='relative w-full sm:max-w-sm mb-4 sm:mb-0'>
          <input
            type='text'
            placeholder='Search to-do lists...'
            value={searchQuery} // Bind input value to state
            onChange={(e) => setSearchQuery(e.target.value)} // Update search query on input change
            className='w-full p-2 pl-10 pr-4 border-2 border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200 ease-in-out'
          />
          <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
        </div>

        <div className='flex items-center mb-4 sm:mb-0'>
          <span className='mx-6 text-2xl sm:text-3xl font-bold text-gray-700'>MY Lists</span>
        </div>

        <div className='flex items-center'>
          {user && (
            <div className='relative'>
              <span className='inline-flex items-center rounded-md bg-green-50 px-2 py-2 text-xs font-medium text-green-700 ring-1 ring-green-600/20 ring-inset'>
                <div className='w-3 h-3 bg-green-500 rounded-full mr-2' />
                <UserBadge username={user} />
              </span>
            </div>
          )}
        </div>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
        {filteredLists.length === 0 ? (
          <p className='text-center text-gray-500'>No to-do lists found</p>
        ) : (
          filteredLists.map((list) => {
            const completedCount = list.tasks.filter((task) => task.completed).length
            const progress = list.tasks.length ? completedCount / list.tasks.length : 0

            return (
              <TodoListCard key={list.id} title={list.title} progress={progress} todoId={list.id} />
            )
          })
        )}

        {/* Show the Add New List card only when searchQuery is empty */}
        {searchQuery === '' && <TodoListCard isAddNew onAdd={handleAddTodo} />}
      </div>
    </div>
  )
}

export default HomePage
