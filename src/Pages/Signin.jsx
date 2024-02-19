import React from 'react'

export default function Signin() {
  return (
    <div className='bg-gray-100 h-screen flex justify-center items-center'>
        <div className='w-96 p-6 shadow-lg rounded-lg bg-white xl:w-1/3'>
            <div className="flex items-center space-x-3 mb-6">
                <a href="/">
                    <img src="/logo.jpg" className="h-16" alt="" />
                </a>
                <p className="">Cambodia Scholarship Center</p>
            </div>
            <div>
                <label className='text-sm my-2 font-medium'>Email</label>
                <input type="text" className='border-2 h-12 rounded-lg w-full p-3' />
            </div>
            <div className='mt-3'>
                <label className='text-sm my-2 font-medium'>Password</label>
                <input type="Password" className='border-2 h-12 rounded-lg w-full p-3' />
            </div>

            <div className='mt-6 flex justify-between items-center'>
                <a href="/signup" className='underline text-gray-500'>Create an account ?</a>
                <button className='py-2 px-4 rounded-lg bg-slate-900 text-white'>Login</button>
            </div>
        </div>
    </div>
  )
}
