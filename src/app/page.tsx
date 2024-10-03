'use client'
import React, { useState, useEffect } from 'react'
import Home1 from '@/components/home1'
import Home2 from '@/components/home2'
import Home3 from '@/components/home3'
import MainLayout from '@/components/mainLayout'

const HomePage = () => {
  console.log("https://chatgpt.com/share/66fd7c8c-7b3c-8001-b074-dc3aa30d5fef")
  const [currentIndex, setCurrentIndex] = useState(0)
  const components = [
    <Home1 key='home1' />,
    <Home2 key='home2' />,
    <Home3 key='home3' />
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % components.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [components.length])

  return (
    <MainLayout>
    <div className='relative h-full'>
      {components.map((component, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'z-10 opacity-100' : 'z-0 opacity-0'}`}
        >
          {component}
        </div>
      ))}
    </div>
    </MainLayout>
  )
}

export default HomePage
