'use client'
interface SuccessComponentProps {
  onClose: () => void
}

const SuccessComponent: React.FC<SuccessComponentProps> = ({ onClose }) => {
  return (
    <div className='mx-auto max-w-md rounded-md p-6 shadow-md'>
      <h2 className='mb-4 text-xl text-center font-semibold text-gray-700'>
        Invoice has been generated succesfully
      </h2>
      <button
        className='w-full rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700'
        onClick={onClose}
      >
        Continue
      </button>
    </div>
  )
}

export default SuccessComponent
