import React, { useState, useEffect, useRef } from 'react'
import TodoHeader from '../components/Todo/TodoHeader'
import TaskForm from '../components/Todo/TaskForm'
import TodoItem from '../components/Todo/TodoItem'
import { DndContext, DragEndEvent } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { arrayMove } from '@dnd-kit/sortable'
import { Task, Todo } from '../types/Todo'
import { useParams } from 'react-router-dom'

const TodoPage: React.FC = () => {
  // Retrieve the todo list ID from the URL params
  const { listId: todoId } = useParams<{ listId: string }>()

  if (!todoId) {
    throw new Error('todoId is required and cannot be undefined') // Throw an error if no todoId is found
  }

  // States for managing tasks, the task being edited, and the selected task index
  const [tasks, setTasks] = useState<Task[]>([])
  const [title, setTitle] = useState<string>('') // State for the title of the todo list
  const [imageUrl, setImageUrl] = useState<string | undefined>('') // New state for image URL
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null)
  const [selectedTaskIndex, setSelectedTaskIndex] = useState<number | null>(null)
  const taskListRef = useRef<HTMLDivElement | null>(null)

  // Load tasks from localStorage whenever the todoId changes
  useEffect(() => {
    try {
      const storedLists: Todo[] = JSON.parse(localStorage.getItem('todo-lists') || '[]')
      const currentList = storedLists.find((list) => list.id === todoId)

      if (currentList) {
        setTitle(currentList.title) // Set the title for the current list
        setTasks(currentList.tasks) // Set tasks for the current list
        setImageUrl(currentList.imageUrl) // Set image URL
      }
    } catch (e) {
      console.error('Error loading tasks from localStorage:', e) // Handle any errors loading from localStorage
    }
  }, [todoId])

  // Update the todo list in localStorage after changes are made
  const updateTodoListInLocalStorage = (updatedList: Todo) => {
    const storedLists: Todo[] = JSON.parse(localStorage.getItem('todo-lists') || '[]')
    const updatedLists = storedLists.map((list) =>
      list.id === updatedList.id
        ? { ...list, tasks: updatedList.tasks, imageUrl: updatedList.imageUrl }
        : list
    )
    localStorage.setItem('todo-lists', JSON.stringify(updatedLists))
  }

  // Handle adding a new task
  const handleAddTask = (taskText: string) => {
    const newTask: Task = {
      text: taskText,
      completed: false,
      id: new Date().toISOString(),
      todoId,
    }
    const updatedTasks = [...tasks, newTask]
    const storedLists: Todo[] = JSON.parse(localStorage.getItem('todo-lists') || '[]')
    const currentList = storedLists.find((list) => list.id === todoId)
    const updatedList: Todo = {
      id: todoId,
      title: currentList?.title || '',
      tasks: updatedTasks,
      imageUrl: currentList?.imageUrl || '', // Include the imageUrl in the update
    }
    updateTodoListInLocalStorage(updatedList)
    setTasks(updatedTasks)
  }

  // Handle updating a task's title
  const handleUpdateTask = (todoId: string, taskId: string, taskText: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, text: taskText } : task
    )
    const storedLists: Todo[] = JSON.parse(localStorage.getItem('todo-lists') || '[]')
    const currentList = storedLists.find((list) => list.id === todoId)
    if (currentList) {
      const updatedList: Todo = {
        id: todoId,
        title: currentList?.title || '',
        tasks: updatedTasks,
        imageUrl: currentList?.imageUrl || '', // Include the imageUrl in the update
      }
      updateTodoListInLocalStorage(updatedList)
    }
    setTasks(updatedTasks)
    setTaskToEdit(null) // Clear the task being edited
  }

  // Toggle the completion status of a task
  const toggleTaskCompletion = (id: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    )
    const storedLists: Todo[] = JSON.parse(localStorage.getItem('todo-lists') || '[]')
    const currentList = storedLists.find((list) => list.id === todoId)
    const updatedList: Todo = {
      id: todoId,
      title: currentList?.title || '',
      tasks: updatedTasks,
    }
    updateTodoListInLocalStorage(updatedList)
    setTasks(updatedTasks)
  }

  // Handle task deletion
  const handleDeleteTask = (id: string) => {
    const updatedTasks = tasks.filter((task) => task.id !== id)
    const storedLists: Todo[] = JSON.parse(localStorage.getItem('todo-lists') || '[]')
    const currentList = storedLists.find((list) => list.id === todoId)
    const updatedList: Todo = {
      id: todoId,
      title: currentList?.title || '',
      tasks: updatedTasks,
    }
    updateTodoListInLocalStorage(updatedList)
    setTasks(updatedTasks)
  }

  // Handle drag-and-drop functionality to reorder tasks
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (active.id !== over?.id) {
      const oldIndex = tasks.findIndex((task) => task.id === active.id)
      const newIndex = tasks.findIndex((task) => task.id === over?.id)
      const reorderedTasks = arrayMove(tasks, oldIndex, newIndex)
      const storedLists: Todo[] = JSON.parse(localStorage.getItem('todo-lists') || '[]')
      const currentList = storedLists.find((list) => list.id === todoId)
      const updatedList: Todo = {
        id: todoId,
        title: currentList?.title || '',
        tasks: reorderedTasks,
      }
      updateTodoListInLocalStorage(updatedList)
      setTasks(reorderedTasks)
    }
  }

  // Calculate the progress percentage (how many tasks are completed)
  const calculateProgress = () => {
    const completedCount = tasks.filter((task) => task.completed).length
    return tasks.length ? Math.round((completedCount / tasks.length) * 100) : 0
  }

  // Handle keyboard navigation for task selection
  const handleKeyNavigation = (e: React.KeyboardEvent) => {
    if (selectedTaskIndex !== null) {
      let newIndex = selectedTaskIndex
      if (e.key === 'ArrowUp' && selectedTaskIndex > 0) {
        newIndex -= 1
      } else if (e.key === 'ArrowDown' && selectedTaskIndex < tasks.length - 1) {
        newIndex += 1
      }
      setSelectedTaskIndex(newIndex) // Update the selected task index
    }
  }

  // Handle task click to set the selected task index
  const handleTaskClick = (index: number) => {
    setSelectedTaskIndex(index)
  }

  // Handle image upload (called from TodoHeader)
  const handleImageUpload = (newImageUrl: string) => {
    setImageUrl(newImageUrl)

    // Update localStorage with the new image URL
    const storedLists: Todo[] = JSON.parse(localStorage.getItem('todo-lists') || '[]')
    const currentList = storedLists.find((list) => list.id === todoId)
    const updatedList: Todo = {
      id: todoId,
      title: currentList?.title || '',
      tasks: currentList?.tasks || [],
      imageUrl: newImageUrl,
    }
    updateTodoListInLocalStorage(updatedList)
  }

  return (
    <div className='min-h-screen bg-gray-100 p-6'>
      <TodoHeader title={title} imageUrl={imageUrl} onImageUpload={handleImageUpload} />{' '}
      {/* Display header for the todo list */}
      <TaskForm
        onAdd={handleAddTask}
        onUpdate={handleUpdateTask}
        taskToEdit={taskToEdit}
        todoId={todoId}
      />
      <DndContext onDragEnd={handleDragEnd}>
        {' '}
        {/* Drag-and-drop context for tasks */}
        <SortableContext
          items={tasks.map((task) => task.id)}
          strategy={verticalListSortingStrategy}
        >
          <div
            className='space-y-4 mt-6'
            ref={taskListRef}
            tabIndex={0}
            onKeyDown={handleKeyNavigation} // Enable keyboard navigation
          >
            {tasks.length === 0 ? (
              <p>No tasks in this to-do list yet!</p> // Display a message if no tasks exist
            ) : (
              tasks.map((task, index) => (
                <TodoItem
                  key={task.id}
                  task={task}
                  todoId={task.todoId}
                  onToggle={() => toggleTaskCompletion(task.id)}
                  onDelete={() => handleDeleteTask(task.id)}
                  onUpdate={handleUpdateTask}
                  isSelected={index === selectedTaskIndex} // Mark selected task
                  onClick={() => handleTaskClick(index)} // Set selected task on click
                  index={index}
                  onReorder={() => {}} // Empty function (can be updated if needed)
                />
              ))
            )}
          </div>
        </SortableContext>
      </DndContext>
      <div className='mt-6'>
        {/* Progress display */}
        <div className='text-lg'>Progress: {calculateProgress()}%</div>
        <div className='w-full bg-gray-300 h-2 rounded-full mt-2'>
          <div
            className='bg-blue-500 h-2 rounded-full'
            style={{ width: `${calculateProgress()}%` }}
          ></div>
        </div>
      </div>
    </div>
  )
}

export default TodoPage
