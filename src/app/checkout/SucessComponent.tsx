'use client'
import { useRouter } from 'next/navigation'

interface SuccessComponentProps {
  onClose: () => void
}

const SuccessComponent: React.FC=()=> {


  return (
    <div className='mx-auto max-w-md rounded-md p-6 shadow-md'>
    <h2 className='mb-4 text-xl font-semibold text-gray-700'>
      Inserted seccusfully
    </h2>
    <button >
        Click me
    </button>
  </div>
  )
}

export default SuccessComponent