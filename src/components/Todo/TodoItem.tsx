import React, { useState } from 'react'
import { Task } from '../../types/Task'
import { Check, Edit, Trash, GripVertical } from 'lucide-react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

interface TodoItemProps {
  task: Task
  todoId: string
  onToggle: (todoId: string, taskId: string) => void
  onDelete: (todoId: string, taskId: string) => void
  onUpdate: (todoId: string, taskId: string, newTitle: string) => void
  isSelected: boolean
  onClick: () => void
  index?: number
  onReorder?: () => void
}

const TodoItem: React.FC<TodoItemProps> = ({
  task,
  todoId,
  onToggle,
  onDelete,
  onUpdate,
  isSelected,
  onClick,
}) => {
  // State for managing the editing state and the new task title
  const [isEditing, setIsEditing] = useState(false)
  const [newTitle, setNewTitle] = useState(task.text)

  // Hook from @dnd-kit for handling drag-and-drop functionality
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task.id })

  // Style for the drag-and-drop transform, applied to the component during dragging
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  // Handle toggle between edit mode and saving the updated task title
  const handleEdit = () => {
    // If in editing mode and the title has changed, update the task
    if (isEditing && newTitle !== task.text) {
      onUpdate(todoId, task.id, newTitle)
    }
    // Toggle the editing state
    setIsEditing(!isEditing)
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center justify-between bg-white p-4 mb-2 rounded-lg shadow-md ${
        isSelected ? 'bg-blue-100' : ''
      }`}
      onClick={onClick}
    >
      {/* Drag handle section */}
      <div className='cursor-grab pr-2 text-gray-400' {...attributes} {...listeners}>
        <GripVertical className='w-4 h-4' />
      </div>

      {/* Task information section */}
      <div className='flex-1 flex items-center'>
        {/* Toggle completion status button */}
        <button
          onClick={(e) => {
            e.stopPropagation() // Prevents triggering parent div's onClick
            onToggle(todoId, task.id)
          }}
          className={`mr-4 ${task.completed ? 'text-green-500' : 'text-gray-500'}`}
        >
          <Check className='w-5 h-5' />
        </button>

        {/* Display task text or input field for editing */}
        {isEditing ? (
          <input
            type='text'
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)} // Update new title while editing
            className='w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500'
          />
        ) : (
          <span className={`flex-1 ${task.completed ? 'line-through text-gray-400' : ''}`}>
            {task.text}
          </span>
        )}
      </div>

      {/* Actions for editing and deleting */}
      <div className='flex items-center'>
        {/* Edit button */}
        <button
          onClick={(e) => {
            e.stopPropagation() // Prevents triggering parent div's onClick
            handleEdit() // Toggle edit mode
          }}
          className='text-blue-500 hover:text-blue-600 mr-2'
        >
          <Edit className='w-5 h-5' />
        </button>
        {/* Delete button */}
        <button
          onClick={(e) => {
            e.stopPropagation() // Prevents triggering parent div's onClick
            onDelete(todoId, task.id) // Call delete function
          }}
          className='text-red-500 hover:text-red-600'
        >
          <Trash className='w-5 h-5' />
        </button>
      </div>
    </div>
  )
}

export default TodoItem
