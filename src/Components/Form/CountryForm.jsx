import React, { useState } from 'react'
import { Button } from '../ui/button';
import CountryDailog from '../Dailog/CountryDailog';

export default function CountryForm() {
  const [countryOpen,setCountryOpen]= useState(false);
  return (
    <div className='w-full overflow-hidden'>
        <section className='w-full border-2 rounded-lg shadow-lg p-6 h-fit flex flex-col'>
            <div className='flex justify-between'>
                <p className='font-bold text-lg '>Countries</p>
                <Button onClick={ ()=>setCountryOpen(true) }  className="bg-orange-400 text-xs hover:bg-orange-700">Add</Button>
            </div>
            <div className='mt-3'>
                <div className='flex justify-between font-bold gap-3 p-1'>
                    <div className='w-9'>ID</div>
                    <div className='w-24 text-nowrap overflow-hidden text-ellipsis'>Image</div>
                    <div className='w-36 text-nowrap overflow-hidden text-ellipsis'>Name</div>
                    <div className='w-16 flex justify-center'>Action</div>
                </div>
                <div className='flex justify-between  gap-3 p-1'>
                    <div className='w-9'>ID</div>
                    <div className='w-24 text-nowrap overflow-hidden text-ellipsis'>Image</div>
                    <div className='w-36 text-nowrap overflow-hidden text-ellipsis'>Name</div>
                    <div className='w-16 flex justify-center'>Action</div>
                </div>
            </div>
            <CountryDailog isOpen={countryOpen} setOpen={setCountryOpen} />    
        </section>
    </div>
  )
}
