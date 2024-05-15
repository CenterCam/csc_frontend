import React, { useContext, useState } from 'react'
import { Button } from '../ui/button';
import CountryDailog from '../Dailog/CountryDailog';
import LanguageDailog from '../Dailog/LanguageDailog';
import { Trash } from 'lucide-react';
import { Store } from '@/Utils/Store';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { proxy } from '@/Utils/Utils';
import axios from 'axios';
import { toast } from 'sonner';

export default function LanguageForm({data}) {
  const [languageOpen,setLanguageOpen]= useState(false);
  const {state , dispatch} = useContext(Store);
  const {csc_user} = state;
  const queryClient = useQueryClient();
  const { isPending , mutateAsync : deleteLanguageMutation } = useMutation({
    mutationFn : async (id)=>{
      try {
        const response = await axios.delete(`${proxy}/api/language/delete/${id}`,
          {
            headers : {
              authorization : `Bearer ${csc_user.token}`
          }
        }
        );  
        return response.data;
    } catch (error) {
        throw error;
    }
    },
    onSuccess : () => {
      queryClient.invalidateQueries(['data']);
      toast.success("Language is Deleted Successfully");
    },
    onError : (err) => {
      toast.error(err.response.data.message);
    }
  })
  return (
    <div className='w-full overflow-hidden'>
        <section className='w-full border-2 rounded-lg shadow-lg p-6 h-fit flex flex-col'>
            <div className='flex justify-between'>
                <p className='font-bold text-lg '>Language</p>
                <Button onClick={ ()=>setLanguageOpen(true) }  className="bg-orange-400 text-xs hover:bg-orange-700">Add</Button>
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
                        <div className='flex justify-between  gap-3 p-1 border-b py-3'>
                            <div className='w-9'>{i+1}</div>
                            <div className='w-36 text-nowrap overflow-hidden text-ellipsis capitalize'>{item.name}</div>
                            <button disabled={isPending} onClick={(e)=>deleteLanguageMutation(item.id)}  className='w-16 cursor-pointer flex justify-center'>
                                <Trash />
                            </button>
                        </div>
                    ))
                }
            </div>
            <LanguageDailog isOpen={languageOpen} setOpen={setLanguageOpen} />    
        </section>
    </div>
  )
}
