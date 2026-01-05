import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../Store/useStore'

const Header = () => {
  const navigate = useNavigate()
  const { startRemoveBgFlow, user, signin } = useStore()
  const fileInputRef = React.useRef(null)

  const handleUpload = () => {
    if (user) {
      fileInputRef.current.click()
    } else {
      signin()
    }
  }

  return (
    <div className=' mx-auto  py-10'>
      <div className='grid grid-cols-1 items-center md:grid-cols-2 gap-4'>
        <div className='flex flex-col gap-4'>
          <h1 className='text-4xl font-bold leading-normal w-full md:max-w-xl'>Instantly Remove Image <span className='text-[#17565D]'>Backgrounds</span> in One Click.</h1>
          <p className='w-full md:w-3/4 font-extralight leading-loose'>Upload your image and our AI will remove the background instantly, helping you
            create product photos, designs, and marketing visuals faster than ever.</p>
          <div>
            <input
              ref={fileInputRef}
              type='file'
              className='hidden'
              accept='image/*'
              onChange={(e) => startRemoveBgFlow(e.target.files[0], navigate)}
            />
            <button
              onClick={handleUpload}
              className='bg-[#17565D] text-white px-6 py-3 rounded-md cursor-pointer hover:bg-[#0f3d40] transition-all duration-300 ease-in-out flex items-center gap-2 w-max'
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4-4m0 0L8 8m4-4v12" />
              </svg>
              <p>Upload Image</p>
            </button>
          </div>
        </div>
        <div>
          <img src='/Images/removebg.png' alt='Remove Background' className='rounded-lg shadow-md' />
        </div>
      </div>
    </div>
  )
}

export default Header