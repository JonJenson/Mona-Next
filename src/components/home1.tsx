import React from 'react'
import Link from 'next/link'

const Home1: React.FC = () => {
  return (
    <section id='home1' className='relative h-[85vh] w-full'>
      <div className='relative flex h-full w-full flex-col items-center justify-center bg-home1 bg-cover bg-center bg-no-repeat'>
        <blockquote className='relative flex flex-col text-center font-playfair text-[60px] font-bold text-deepBlue drop-shadow-[0_4px_15px_rgba(253,223,57,1)]'>
          “Nothing wrong in being <br />
          <span className='block w-full text-center'>BEAUTY”</span>
          <cite className='no-shadow mr-[70px] flex justify-end font-poppins text-[30px] font-medium text-black'>
            ~Founder
          </cite>
        </blockquote>
        <Link href='/services'>
          <button className='absolute bottom-[20px] right-[20px] flex h-[42px] w-[125px] cursor-pointer items-center justify-center gap-[3px] rounded-[20px] border border-black bg-softYellow font-poppins text-[20px] font-[520px] text-black hover:bg-softYellow/75'>
            Explore{' '}
            <i className='bx bx-right-arrow-alt text-[25px] text-black'></i>
          </button>
        </Link>
      </div>
    </section>
  )
}

export default Home1
