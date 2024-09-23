import Categories from './categories'
import MainLayout from '@/components/mainLayout'
import Membership from '@/app/services/membership'
import React from 'react'

const ServicesPage = () => {
  return (
    <MainLayout>
      <div className='bg-gradient-to-b from-[rgba(255,157.60,251.10,0.16)_34%] via-[rgba(106,196,224,0.25)_47%]'>
        <Categories />
        <Membership />
      </div>
    </MainLayout>
  )
}

export default ServicesPage;
