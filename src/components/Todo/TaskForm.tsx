import React, { useEffect, useRef } from 'react'
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik'
import * as Yup from 'yup'

const taskSchema = Yup.object({
  task: Yup.string().min(2, 'Too short').required('Task is required'),
})

interface Props {
  onAdd: (taskText: string, todoId: string) => void // Include todoId when adding a task
  onUpdate?: (todoId: string, taskId: string, taskText: string) => void
  taskToEdit?: { id: string; text: string } | null // taskToEdit can be null now
  todoId: string // Pass todoId to associate with the task
}

const TaskForm: React.FC<Props> = ({ onAdd, onUpdate, taskToEdit, todoId }) => {
  const taskInputRef = useRef<HTMLInputElement | null>(null)

  // Effect to focus the input when Ctrl + N is pressed
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'n') {
        taskInputRef.current?.focus()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  // Handle form submission: Add or update task
  const handleSubmit = (
    values: { task: string },
    { resetForm }: FormikHelpers<{ task: string }>
  ) => {
    if (taskToEdit) {
      // Update existing task
      onUpdate?.(todoId, taskToEdit.id, values.task)
    } else {
      // Add a new task with the todoId
      onAdd(values.task, todoId) // Pass todoId when adding a new task
    }
    resetForm() // Clear the form after submission
  }

  return (
    <Formik
      initialValues={{ task: taskToEdit?.text || '' }} // Initialize with existing task text or empty
      validationSchema={taskSchema}
      onSubmit={handleSubmit}
      enableReinitialize={true} // This will allow the form to reinitialize when `taskToEdit` changes
    >
      {({ isSubmitting }) => (
        <Form className='space-y-2'>
          <div className='flex gap-2'>
            <Field
              name='task'
              type='text'
              placeholder='New Task...'
              ref={taskInputRef}
              className='w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            <button
              type='submit'
              disabled={isSubmitting}
              className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl'
            >
              {taskToEdit ? 'Update' : 'Add'} {/* Toggle button text */}
            </button>
          </div>
          <ErrorMessage name='task' component='div' className='text-red-500 text-sm' />
        </Form>
      )}
    </Formik>
  )
}

export default TaskForm
