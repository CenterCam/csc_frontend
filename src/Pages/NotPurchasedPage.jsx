import Footer from '@/Components/Frontend-Footer/Footer'
import Navbar from '@/Components/Frontend-Navbar/Navbar'
import React from 'react'

export default function NotPurchasedPage() {
  return (
    <div>
        <Navbar />
        <div className='w-full h-[450px] flex justify-center items-center flex-col'>
            <div className='sm:w-96'>
                <h1 className='text-xl font-bold text-center'>Please Contact To Admin To Purchase This Course</h1>
            </div>
            <a target='_blank' className='text-white font-bold p-3 bg-gray-600 rounded-lg mt-3' href="http://t.me/scholarshipcenter">Telegram</a>
        </div>
        <Footer />
    </div>
  )
}
