import React, { useEffect, useState } from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

interface User {
  name: string
  email: string
  password: string
}

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
})

const LoginForm: React.FC = () => {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [users, setUsers] = useState<User[]>([])
  const [rememberMe, setRememberMe] = useState(false)

  useEffect(() => {
    const storedUsers = localStorage.getItem('users')
    if (!storedUsers) {
      fetch('/data/users.json')
        .then((response) => response.json())
        .then((data) => {
          setUsers(data.users)
          localStorage.setItem('users', JSON.stringify(data.users))
        })
    } else {
      setUsers(JSON.parse(storedUsers))
    }

    const storedUser = localStorage.getItem('loggedInUser')
    if (storedUser) {
      navigate('/home') // Redirect to home if user is already logged in
    }
  }, [])

  const handleSubmit = (
    values: { email: string; password: string },
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    const user = users.find(
      (user) => user.email === values.email && user.password === values.password
    )

    if (user) {
      login(user.name)
      localStorage.setItem('loggedInUser', user.name)

      if (rememberMe) {
        localStorage.setItem('rememberMe', 'true')
        localStorage.setItem('userEmail', values.email) // Save email if 'Remember Me' is checked
        localStorage.setItem('userPassword', values.password) // Save password if 'Remember Me' is checked
      }

      navigate('/home')
    } else {
      alert('Invalid credentials! Please try again.')
    }

    setSubmitting(false)
  }

  const handleRememberMeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRememberMe(e.target.checked)
  }

  return (
    <div className='bg-white p-8 rounded-2xl shadow-md w-full max-w-md'>
      <h1 className='text-2xl font-bold text-center mb-6 font-[Poppins]'>Sign In</h1>

      <Formik
        initialValues={{
          email: localStorage.getItem('userEmail') || '',
          password: localStorage.getItem('userPassword') || '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className='space-y-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Email</label>
              <Field
                type='email'
                name='email'
                placeholder='you@example.com'
                className='w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
              <ErrorMessage name='email' component='div' className='text-red-500 text-xs mt-1' />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Password</label>
              <Field
                type='password'
                name='password'
                placeholder='••••••••'
                className='w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
              <ErrorMessage name='password' component='div' className='text-red-500 text-xs mt-1' />
            </div>

            <div className='flex items-center'>
              <Field
                type='checkbox'
                name='rememberMe'
                id='rememberMe'
                checked={rememberMe}
                onChange={handleRememberMeChange}
                className='mr-2'
              />
              <label htmlFor='rememberMe' className='text-sm text-gray-700'>
                Remember Me
              </label>
            </div>

            <button
              type='submit'
              disabled={isSubmitting}
              className='w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl shadow transition duration-300'
            >
              Login
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default LoginForm
