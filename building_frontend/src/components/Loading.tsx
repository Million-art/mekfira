import { FiLoader } from "react-icons/fi"

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="flex flex-col items-center">
        <FiLoader className="text-5xl text-white animate-spin" />
        <p className="mt-4 text-lg text-gray-100">Loading...</p>
      </div>
    </div>
  )
}

export default Loading