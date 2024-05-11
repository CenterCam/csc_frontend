import React from 'react'

export default function CardDashbaord({title,value,icon}) {
  return (
    <>
        <div className='p-6 w-full overflow-hidden border rounded-lg shadow'> 
            <div className='flex justify-between'>
                <p className='text-sm font-medium'>{title}</p>
                <div>
                    {icon}
                </div>
            </div>
            <div className='flex w-full  items-center mt-3'>
                <p className='font-bold text-3xl capitalize'>{value}</p>
            </div>
        </div>
    </>
  )
}
