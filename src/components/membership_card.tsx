import React from 'react'
import Link from 'next/link'

interface MembershipCardProps {
  image: string
  heading: string
  tagline: string
  description: string
  link:string
}

const MembershipCard: React.FC<MembershipCardProps> = ({
  image,
  heading,
  tagline,
  description,
  link
}) => {
  return (
    <Link href={link} className='my-6 card-wrap w-11/12 rounded-[20px] bg-[rgba(255,157,251,0.31)] shadow-[0_4px_4px_rgba(0,0,0,0.25)]'>
      <div className='image_and_content flex items-center gap-5 p-5'>
        <img className='h-4/5 w-1/2' src={image} alt='Membership' />
        <div className='content'>
          <h3 className='heading font-greatvibes text-2xl font-medium lg:text-3xl sm:text-3xl'>
            {heading}
          </h3>
          <h4 className='tagline font-cormorant text-xl -mt-2 mb-2 font-semibold lg:text-2xl'>
            {tagline}
          </h4>
          <p className='paragraph font-poppins text-xs lg:text-sm lg:mt-7' >
            {description}
          </p>
        </div>
      </div>
    </Link>
  )
}

export default MembershipCard
