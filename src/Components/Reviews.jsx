import React from 'react'
import { assets, testimonialsData } from '../../public/assets/assets'

const Reviews = () => {
  return (
    <div className='my-10 space-y-2 text-center'>
        <div className='flex flex-col items-center space-y-2'>
            <h1 className='text-2xl font-bold'>Users Reviews</h1>
            <p className='text-gray-600 font-extralight'>Reviews from satisfied designers, developers, and users.</p>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl my-6 mx-auto'>
            {testimonialsData.map((testimonial, index)=>(
                <div key={index} className='flex flex-col bg-gray-100 justify-start gap-1 px-5 md:px-8 py-6 max-w-lg m-auto rounded-xl drop-shadow-md hover:scale-105 transistion-all duration-500 text-left'>
                    <span className='text-4xl text-gray-500 font-serif'>"</span>
                    <p className='text-sm text-gray-500 text-left'>{testimonial.text}</p>
                    <div className='flex items-center gap-4 mt-3'>
                        <img src={testimonial.image} alt="" className='w-9 rounded-full'/>
                        <div>
                            <p className='text-sm'>{testimonial.author}</p>
                            <p className='text-xs font-extralight'>{testimonial.jobTitle}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Reviews