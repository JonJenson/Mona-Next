'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import TotalCartCheckout from '@/app/checkout/total_cart'
import MainLayout from '@/components/mainLayout'
import CartItem from './cart_item'
import FormComponent from '@/app/checkout/formComponent'
import { useCart } from '@/context/CartContext'
import LoginComponent from './loginComponent'

// Dynamically import the PDFGenerator component to ensure it only runs client-side
const PDFGenerator = dynamic(() => import('./pdfGenerator'), {
  ssr: false
})

const Checkout: React.FC = () => {
  const router = useRouter()
  const { cart, clearCart } = useCart()
  const [isFormVisible, setIsFormVisible] = useState(false)
  const [userDetails, setUserDetails] = useState<{
    name: string
    phone: string
    email: string
  } | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [showLogin, setShowLogin] = useState<boolean>(false)

  // Check the logged-in status after the component mounts
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const loggedInStatus = localStorage.getItem('isLoggedIn')
      setIsLoggedIn(loggedInStatus === 'true')

      if (loggedInStatus !== 'true') {
        const timer = setTimeout(() => {
          setShowLogin(true)
        }, 1500)
        return () => clearTimeout(timer)
      }
    }
  }, [])

  const subtotal = cart.reduce((total, item) => total + (item.price || 0), 0)
  const discount = 5
  const tax = 5

  const handleToggleForm = () => {
    if (localStorage.getItem('isLoggedIn') === 'true') {
      setIsFormVisible(prevState => !prevState)
    }
  }

  const handleFormSubmit = (formData: {
    name: string
    phone: string
    email: string
  }) => {
    setUserDetails(formData)
    setIsFormVisible(false)
  }

  const handleLoginSuccess = () => {
    localStorage.setItem('isLoggedIn', 'true')
    setIsLoggedIn(true)
    setShowLogin(false)
  }

  return (
    <MainLayout>
      <div className='container mx-auto px-4 py-8'>
        <h2 className='mb-6 font-playfair text-2xl font-bold'>YOUR CART</h2>

        <div className='flex flex-col gap-8 lg:flex-row'>
          <CartItem />
          {cart.length > 0 && (
            <div className='rounded-lg bg-gray-100 p-6 shadow-md lg:w-1/3'>
              <TotalCartCheckout
                subtotal={subtotal}
                discount={discount}
                tax={tax}
              />
              <br />
              <button
                onClick={handleToggleForm}
                className='w-full rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700'
              >
                Checkout
              </button>
            </div>
          )}
        </div>

        {showLogin && !isLoggedIn && (
          <div className='fixed inset-0 z-50 flex items-center justify-center bg-gray-900/75 transition-opacity duration-1000'>
            <div className='relative w-full max-w-lg rounded-md bg-white p-6'>
              <i
                onClick={() => router.push('/')}
                className='bx bx-x absolute right-4 top-4 cursor-pointer rounded-full border border-gray-500 text-2xl text-gray-500 hover:text-red-500'
              ></i>
              <LoginComponent onLoginSuccess={handleLoginSuccess} />
            </div>
          </div>
        )}

        {isFormVisible && (
          <div className='fixed inset-0 z-50 flex items-center justify-center bg-gray-900/75'>
            <div className='relative w-full max-w-lg rounded-md bg-white p-6'>
              <i
                onClick={handleToggleForm}
                className='bx bx-x absolute right-4 top-4 cursor-pointer rounded-full border border-gray-500 text-2xl text-gray-500 hover:text-red-500'
              ></i>
              <FormComponent onFormSubmit={handleFormSubmit} />
            </div>
          </div>
        )}

        {userDetails && cart.length > 0 && (
          <PDFGenerator
            userDetails={userDetails}
            cartItems={cart}
            subtotal={subtotal}
            discount={discount}
            tax={tax}
            clearCart={clearCart}
            router={router}
          />
        )}
      </div>
    </MainLayout>
  )
}

export default Checkout
