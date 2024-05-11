import React, { useState } from 'react'
import { Button } from '../ui/button';
import CountryDailog from '../Dailog/CountryDailog';
import { Trash } from 'lucide-react';

export default function CountryForm({data}) {
  const [countryOpen,setCountryOpen]= useState(false);
  return (
    <div className='w-full overflow-hidden'>
        <section className='w-full border-2 rounded-lg shadow-lg p-6 h-fit flex flex-col'>
            <div className='flex justify-between'>
                <p className='font-bold text-lg '>Country</p>
                <Button onClick={ ()=>setCountryOpen(true) }  className="bg-orange-400 text-xs hover:bg-orange-700">Add</Button>
            </div>
            <div className='mt-3'>
                <div className='flex justify-between font-bold gap-3 p-1'>
                    <div className='w-9'>ID</div>
                    <div className='w-24 text-nowrap overflow-hidden text-ellipsis'>Image</div>
                    <div className='w-36 text-nowrap overflow-hidden text-ellipsis'>Name</div>
                    <div className='w-16 flex justify-center'>Action</div>
                </div>
                {
                    data.length == 0 ?
                    <div className='w-full h-24 flex justify-center items-center'>
                        <h1 className='font-bold'>No Item!!</h1>
                    </div> :
                    data.map((item,i)=>(
                        <div key={i} className='flex justify-between  gap-3 py-3 items-center border-b'>
                            <div className='w-9'>{i+1}</div>
                            <div className='w-24 text-nowrap overflow-hidden text-ellipsis capitalize'>{item.ct_name}</div>
                            <div className='w-36 text-nowrap overflow-hidden text-ellipsis'>
                                <img src={item.ct_link} className='border h-12 w-24 object-cover' alt={item.ct_name} />
                            </div>
                            <div className='w-16 flex justify-center'>
                                <Trash />
                            </div>
                        </div>
                    ))
                }
            </div>
            <CountryDailog isOpen={countryOpen} setOpen={setCountryOpen} />    
        </section>
    </div>
  )
}
