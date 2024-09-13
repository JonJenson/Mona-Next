import React from 'react'

interface CategoriesCardProps {
  image: string
  heading: string
  link: string
}

const CategoriesCard: React.FC<CategoriesCardProps> = ({
  image,
  heading,
  link
}) => {
  return (
    <a
      href={link}
      className='relative m-5 h-56 w-44 overflow-hidden rounded-2xl bg-cover bg-center bg-no-repeat'
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className='card-text absolute bottom-4 left-1/2 z-10 w-full -translate-x-1/2 transform text-center text-2xl font-bold text-white'>
        {heading}
      </div>
      <div className='card-overlay absolute inset-1 z-0 rounded-2xl bg-gradient-to-t from-black/30 to-transparent transform bottom-2'></div>
    </a>
  )
}

export default CategoriesCard
