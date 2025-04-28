import React, { useState } from 'react'
import { Plus, ListTodo } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useDraggable } from '@dnd-kit/core'

interface Props {
  title?: string
  progress?: number
  isAddNew?: boolean
  todoId?: string
  onAdd?: (title: string) => void
}

const TodoListCard: React.FC<Props> = ({
  title,
  progress = 0,
  isAddNew = false,
  onAdd,
  todoId,
}) => {
  const [newTitle, setNewTitle] = useState('')
  const [isAdding, setIsAdding] = useState(false)
  const navigate = useNavigate()

  const handleAdd = () => {
    if (newTitle.trim() && onAdd) {
      onAdd(newTitle.trim())
      setNewTitle('')
      setIsAdding(false)
    }
  }

  const { attributes, listeners, setNodeRef } = useDraggable({
    id: todoId || 'new-list',
  })

  if (isAddNew) {
    return (
      <div className='bg-white rounded-2xl p-6 shadow flex items-center justify-center min-h-[120px]'>
        {isAdding ? (
          <div className='w-full'>
            <input
              type='text'
              placeholder='List title'
              className='w-full border border-gray-300 rounded-lg p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-green-500'
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
              autoFocus
            />
            <button
              onClick={handleAdd}
              className='bg-green-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-600'
            >
              Add
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsAdding(true)}
            className='flex items-center text-green-600 hover:text-green-700'
          >
            <Plus className='mr-2' />
            <span className='font-medium'>Add New List</span>
          </button>
        )}
      </div>
    )
  }

  return (
    <div
      ref={setNodeRef}
      className='bg-white rounded-2xl p-6 shadow hover:shadow-lg transition cursor-pointer'
      onClick={() => navigate(`/todos/${todoId?.toLowerCase().replace(/\s+/g, '-')}`)}
      {...listeners}
      {...attributes}
    >
      <div className='flex items-center mb-4'>
        <ListTodo className='text-green-500 mr-2' />
        <h3 className='text-lg font-semibold text-gray-800'>{title}</h3>
      </div>
      <div className='w-full bg-gray-200 rounded-full h-3'>
        <div
          className='bg-green-500 h-3 rounded-full transition-all duration-300'
          style={{ width: `${progress * 100}%` }}
        ></div>
      </div>
      <p className='text-right text-sm text-gray-600 mt-2'>{Math.round(progress * 100)}% done</p>
    </div>
  )
}

export default TodoListCard
