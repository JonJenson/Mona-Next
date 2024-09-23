import React from 'react'
import MembershipCard from './membership_card'
import { MembershipData } from '@/utils/data'

const Membership: React.FC = () => {
  return (
    <>
      <div className='title mt-20 text-center font-greatvibes text-4xl font-normal'>
        Beauty Bundles
      </div>
      <div className='mb-10 mt-5 text-center font-cormorant text-4xl'>
        Ultimate Beauty, Ultimate Savings!
      </div>
      <div className='card-holder mx-auto flex w-4/5 flex-col items-center justify-center bg-white/50'>
        {MembershipData.map((item, index) => (
          <MembershipCard
            key={index}
            heading={item.heading}
            image={item.image}
            tagline={item.tagline}
            description={item.description}
            link={item.link}
          />
        ))}
      </div>
    </>
  )
}

export default Membership
