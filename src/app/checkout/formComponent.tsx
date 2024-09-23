'use client'
import { checkCustomerExists, insertCustomer } from '@/utils/supabaseService'
import React, { useState } from 'react'

interface FormComponentProps {
  onFormSubmit: (formData: {
    name: string
    phone: string
    email: string
  }) => void
}

const FormComponent: React.FC<FormComponentProps> = ({ onFormSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: ''
  })
  const [message, setMessage] = useState<string | null>(null)
  const [isSuccess, setIsSuccess] = useState<boolean>(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null) // Reset message before checking

    try {
      // Simulate checking for existing customer
      const existingCustomer = await checkCustomerExists(formData.email) // Implement this function

      if (existingCustomer) {
        setMessage(`Welcome back, ${formData.name}!`)
        setIsSuccess(true)
      } else {
        await insertCustomer(formData.name, formData.phone, formData.email) // Implement this function
        setMessage(`Welcome, ${formData.name}!`)
        setIsSuccess(true)
      }
    } catch (error) {
      console.error('Error: ', error)
      setMessage('Error while processing the request.')
      setIsSuccess(false)
    }

    // Call the parent's onFormSubmit after 3 seconds
    setTimeout(() => {
      onFormSubmit(formData)
    }, 3000)
  }

  return (
    <div className='mx-auto max-w-md rounded-md bg-white p-6 shadow-md'>
      <h2 className='mb-4 text-xl font-semibold text-gray-700'>
        Enter Your Details
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
            htmlFor='name'
            className='block text-sm font-medium text-gray-700'
          >
            Name
          </label>
          <input
            type='text'
            id='name'
            name='name'
            value={formData.name}
            onChange={handleChange}
            className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm'
            placeholder='Your Name'
            required
          />
        </div>

        <div className='mb-4'>
          <label
            htmlFor='phone'
            className='block text-sm font-medium text-gray-700'
          >
            Phone
          </label>
          <input
            type='tel'
            id='phone'
            name='phone'
            value={formData.phone}
            onChange={handleChange}
            className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm'
            placeholder='Your Phone'
            required
          />
        </div>

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

        <button
          type='submit'
          className='w-full rounded-md bg-indigo-600 px-4 py-2 text-white'
        >
          Generate Invoice
        </button>
      </form>
    </div>
  )
}

export default FormComponent
