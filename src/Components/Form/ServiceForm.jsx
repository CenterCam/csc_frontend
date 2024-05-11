import React, { useState } from 'react'
import { Button } from '../ui/button';
import ServiceDailog from '../Dailog/ServiceDailog';
import { Trash } from 'lucide-react';

export default function ServiceForm({data}) {
  const [serviceOpen,setServiceOpen]= useState(false);
  return (
    <div className='w-full overflow-hidden'>
        <section className='w-full border-2 rounded-lg shadow-lg p-6 h-fit flex flex-col'>
            <div className='flex justify-between'>
                <p className='font-bold text-lg '>Service</p>
                <Button onClick={ ()=>setServiceOpen(true) }  className="bg-orange-400 text-xs hover:bg-orange-700">Add</Button>
            </div>
            <div className='mt-3'>
                <div className='flex justify-between font-bold gap-3 p-1'>
                    <div className='w-9'>ID</div>
                    <div className='w-36 text-nowrap overflow-hidden text-ellipsis'>Name</div>
                    <div className='w-16 flex justify-center'>Action</div>
                </div>
                {
                    data.length == 0 ?
                    <div className='w-full h-24 flex justify-center items-center'>
                        <h1 className='font-bold'>No Item!!</h1>
                    </div> :
                    data.map((item,i)=>(
                        <div className='flex justify-between  gap-3 py-3 border-b'>
                            <div className='w-9'>{i+1}</div>
                            <div className='w-36 text-nowrap overflow-hidden text-ellipsis'>{item.name}</div>
                            <div className='w-16 flex justify-center'><Trash /></div>
                        </div>
                    ))
                }
            </div>
            <ServiceDailog isOpen={serviceOpen} setOpen={setServiceOpen} />    
        </section>
    </div>
  )
}
