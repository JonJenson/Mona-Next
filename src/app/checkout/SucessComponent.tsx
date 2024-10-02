'use client'
interface SuccessComponentProps {
  onClose: () => void
  loading: boolean
}

const SuccessComponent: React.FC<SuccessComponentProps> = ({ onClose, loading }) => {
  return (
    <div className='mx-auto max-w-md rounded-md p-6 shadow-md'>
      <h2 className='mb-4 text-xl text-center font-semibold text-gray-700'>
        {loading ? 'Invoice is being generated...' : 'Invoice has been generated successfully'}
      </h2>

      <button
        className={`w-full rounded-md px-4 py-2 text-white ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600'}`}
        onClick={onClose}
      >
        Continue
      </button>
    </div>
  )
}

export default SuccessComponent
