import React from 'react'
import 'boxicons/css/boxicons.min.css'
import Link from 'next/link'

interface NavbarProps {
  toggleSidebar: () => void
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  return (
    <nav className='relative z-50 flex h-[15vh] w-full items-center bg-softYellow/50 text-lg'>
      <div className='flex w-full items-center justify-between px-3 md:px-6'>
        <div className='flex items-center'>
          <div
            className='flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-black'
            onClick={toggleSidebar}
          >
            <i className='bx bx-menu text-lg text-white'></i>
          </div>
        </div>
        <Link
          href='/'
          className='absolute left-1/2 flex h-full -translate-x-1/2 transform items-center'
        >
          <img
            src='/logo-new.png'
            alt='MONA'
            className='max-h-full w-96 object-contain'
          />
        </Link>
        <div className='flex items-center'>
          <div className='mr-3 hidden h-8 w-8 items-center justify-center rounded-full bg-black md:flex'>
            <i className='bx bx-search text-white'></i>
          </div>
          <Link
            href='/checkout'
            className='flex h-8 w-8 items-center justify-center rounded-full bg-black'
          >
            <i className='bx bx-cart text-white'></i>
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
