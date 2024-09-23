'use client'
import { Service } from '@/lib/types'
import React, { useEffect, useState } from 'react'

const CartItem = () => {
  const [getCart, setGetCart] = useState<Service[]>([])

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cart') as string) || []
    setGetCart(items)
  }, [])

  const handleRemoveItem = (id: number) => {
    const updatedCart = getCart.filter(item => item.id !== id)
    setGetCart(updatedCart)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
  }

  return (
    <div className='flex-1'>
      {getCart.length > 0 ? (
        getCart.map(item => (
          <li
            key={item.id}
            className='y-200 relative mb-2 flex items-center justify-between border border-deepBlue p-4 shadow-md'
          >
            <div className='flex items-center'>
              <img
                src={item.image}
                alt={item.title}
                className='h-24 w-24 flex-shrink-0 overflow-hidden rounded-md'
              />
              <div className='ml-4'>
                <h3 className='text-lg font-medium'>{item.title}</h3>
                <p className='text-gray-600'>₹{item.price}</p>
              </div>
            </div>
            {/* Close Icon */}
            <i
              onClick={() => handleRemoveItem(item.id)}
              className='bx bx-x absolute right-1 top-1 rounded-full border border-gray-400 p-1 text-xl text-gray-500 hover:text-red-500'
            ></i>
          </li>
        ))
      ) : (
        <h1 className='mb-6 text-2xl font-bold'>No items in the cart</h1>
      )}
    </div>
  )
}

export default CartItem
