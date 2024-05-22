import Footer from '@/Components/Frontend-Footer/Footer'
import Navbar from '@/Components/Frontend-Navbar/Navbar'
import React from 'react'

export default function YourClass() {
  return (
    <div>
        <Navbar/>
            <div className='p-12'>
                {/* <div className='w-full h-screen flex justify-center items-center'>
                    <h1 className='text-3xl font-bold'>No Classes !!</h1>
                </div> */}
                <h1 className='text-3xl font-bold'>You Classes</h1>
            </div>
        <Footer/>
    </div>
  )
}
