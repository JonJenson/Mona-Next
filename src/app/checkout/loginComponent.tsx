'use client'
import React, { useState } from 'react'
import { supabase } from '@/config/supabase'

interface LoginComponentProps {
  onLoginSuccess: () => void
}

const LoginComponent: React.FC<LoginComponentProps> = ({ onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [message, setMessage] = useState<string | null>(null)
  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)
    setIsLoading(true)

    const { email, password } = formData

    try {
      // Attempt to sign in using Supabase Auth
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) {
        throw error
      }

      // Check if user exists and credentials are correct
      if (data.user) {
        setIsSuccess(true)
        setMessage('Login successful!')
        setFormData({ email: '', password: '' })

        // Call onLoginSuccess after 2 seconds
        setTimeout(() => {
          onLoginSuccess()
        }, 2000) // 2000 milliseconds = 2 seconds
      } else {
        setIsSuccess(false)
        setMessage('Login failed. Please try again.')
      }
    } catch (error: any) {
      setIsSuccess(false)
      setMessage(error.message || 'Login failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    
      <div className='mx-auto max-w-md rounded-md p-6 shadow-md'>
        <h2 className='mb-4 text-xl font-semibold text-gray-700'>
          Login to continue
        </h2>

        {message && (
          <div
            className={`mb-2 flex justify-center rounded-md p-4 text-white ${
              isSuccess ? 'bg-green-500' : 'bg-red-500'
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label
              htmlFor='email'
              className='block text-sm font-medium text-gray-700'
            >
              Email
            </label>
            <input
              type='email'
              id='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm'
              placeholder='Your Email'
              required
            />
          </div>

          <div className='mb-4'>
            <label
              htmlFor='password'
              className='block text-sm font-medium text-gray-700'
            >
              Password
            </label>
            <input
              type='password'
              id='password'
              name='password'
              value={formData.password}
              onChange={handleChange}
              className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm'
              placeholder='Your Password'
              required
            />
          </div>

          <button
            type='submit'
            className='w-full rounded-md bg-indigo-600 px-4 py-2 text-white'
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
   
  )
}

export default LoginComponent
