import React from 'react'
import { plans } from '../../public/assets/assets'
import { useStore } from '../Store/useStore'

const Plan = () => {
    const openModel = useStore((state)=>state.openModel)
    const isOpen = useStore((state)=>state.isOpen)
    
  return (
    <div className='my-6 md:my-8'>
        <div className='flex flex-col justify-center text-center items-center'>
            <p className='text-xs font-extralight px-6 py-2 border border-gray-300 rounded-full text-gray-600'>OUR PLANS</p>
            <p className='text-2xl font-bold my-4 max-w-xs md:w-full'>Choose the plan thats right for you!</p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-10 max-w-4xl my-6 mx-auto'>
            {plans.map((plan)=>(
                <div key={plan.id} className='flex flex-col bg-gray-100 justify-start gap-1 px-5 md:px-8 py-6 max-w-lg  rounded-xl drop-shadow-md hover:scale-105 transistion-all duration-500 text-left'>
                    <img src="/Images/bg.png" alt="" className='w-8'/>
                    <p className='font-semibold my-2'>{plan.id}</p>
                    <p className='text-sm font-extralight'>{plan.desc}</p>
                    <div className='block'>
                        <p className='text-2xl'>${plan.price} /<span className='text-sm'>{plan.credits}</span></p>
                    </div>
                    <button className='w-full py-2 rounded bg-[#17565D] text-white mt-5 cursor-pointer' onClick={()=>openModel(plan)}>Get started</button>
                </div>
            ))}
        </div>
        
    </div>
  )
}

export default Plan