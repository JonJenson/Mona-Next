'use client'
import React, { useState } from 'react'

const MembershipDropdown = () => {
  const [selectedPlan, setSelectedPlan] = useState('Choose Membership')
  const [showDropdown, setShowDropdown] = useState(false)
  const handlePlanSelect = (plan: string) => {
    setSelectedPlan(plan);
    setShowDropdown(false);
  };
  return (
    <>
      <div className='relative'>
        <button
          className='w-auto rounded-2xl bg-yellow-400 py-1 px-2 text-center text-lg font-medium'
          onClick={() => setShowDropdown(!showDropdown)}
        >
          {selectedPlan}
          <i className='bx bxs-right-arrow-circle pl-1 flex align-center'></i>
        </button>

        {/* Dropdown for selecting plans */}
        {showDropdown && (
          <div className='absolute mt-2 w-full rounded border bg-white shadow-lg border-yellow-400'>
            <ul className='py-2'>
              <li
                className='cursor-pointer px-4 py-2 hover:bg-yellow-200'
                onClick={() => handlePlanSelect('Basic Plan')}
              >
                Basic Plan
              </li>
              <li
                className='cursor-pointer px-4 py-2 hover:bg-yellow-200'
                onClick={() => handlePlanSelect('Premium Plan')}
              >
                Premium Plan
              </li>
              <li
                className='cursor-pointer px-4 py-2 hover:bg-yellow-200'
                onClick={() => handlePlanSelect('Pro Plan')}
              >
                Pro Plan
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  )
}

export default MembershipDropdown
