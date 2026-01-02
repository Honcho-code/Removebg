import React, { useState } from 'react'
import { assets } from '../../public/assets/assets'

const Bgslider = () => {
    const [sliderPosition, setSliderPosition] = useState(50)
    const handleSliderChange = (e) => {
        setSliderPosition(e.target.value)
    }
  return (
    <div className='flex flex-col items-center justify-center my-10 md:my-16'>
        <h1 className='mb-10 md:mb-12 text-2xl font-bold text-center'>Remove Background With High <br /> Quality and Accuracy</h1>
        <div className='relative w-full max-w-3xl overflow-hidden m-auto rounded-xl'>
            <img src={assets.image_w_bg} style={{clipPath: `inset(0 ${100.2 - sliderPosition}% 0 0)`}} alt="" />
            <img className='absolute top-0 left-0 w-full h-full ' src={assets.image_wo_bg} style={{clipPath: `inset(0 0 0 ${sliderPosition}%)`}} alt="" />
            <input className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full z-10 slider' type="range" min="0" max="100" value={sliderPosition} onChange={handleSliderChange} />
        </div>
    </div>
  )
}

export default Bgslider