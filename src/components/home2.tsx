import React from 'react'

const Home2: React.FC = () => {
  return (
    <section id='home2' className='relative h-[85vh] w-full'>
      <div className='relative flex h-full w-full flex-col items-center justify-end bg-home2 bg-cover bg-center bg-no-repeat font-playfair '>
        <div className='absolute inset-0 z-10 bg-gradient-to-b from-transparent to-[rgba(3,41,152,0.58)]'></div>
        <h1 className='relative z-20 pb-10 text-center text-4xl font-bold text-white'>
          Regardless of colour, we elevate
          <br />
          what you got naturally with our premium service
        </h1>
      </div>
    </section>
  )
}

export default Home2
