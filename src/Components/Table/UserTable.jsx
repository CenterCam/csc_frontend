import { Edit, Trash2 } from 'lucide-react'
import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Input } from '../ui/input';
import MyPagination from '../Pagination/MyPagination';
  

export default function UserTable({users}) {
    const [selectedValue, setSelectedValue] = useState(null);

    const handleSelectionChange = (event) => {
      setSelectedValue(event.target.value);
      console.log("Selected value:", event.target.value);
    };
    
  return (
    <>
    <div className='flex justify-between mt-6 flex-wrap gap-3'>
        <div>
            <Input className="w-full sm:w-96" onChange={(e)=>console.log(e.target.value)} type="text"  placeholder="Search..." />
        </div>
        <Select onValueChange={(value)=>console.log(value)}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="newest" >Newest</SelectItem>
                <SelectItem value="oldest" >Oldest</SelectItem>
            </SelectContent>
        </Select>
    </div>
    <div className='p-6 border rounded-lg mt-6'>
        <div className='flex font-bold text-lg justify-between gap-3 border-b pb-3'>
            <div className='w-9 text-nowrap overflow-hidden text-ellipsis'>ID</div>
            <div className='w-36 text-nowrap overflow-hidden text-ellipsis'>Name</div>
            <div className='w-36 md:w-48 text-nowrap overflow-hidden text-ellipsis hidden lg:block'>Email</div>
            <div className='w-36 text-nowrap overflow-hidden text-ellipsis'>Role</div>
            <div className='w-20 text-nowrap overflow-hidden text-ellipsis hidden lg:block'>Status</div>
            <div className='flex justify-center w-20'>Action</div>
        </div>
        <div className='mt-3 gap-9 capitalize flex flex-col'>
            {
                users?.map((item,i)=>(
                    <div key={i} className='flex text-sm justify-between gap-3 items-center'>
                        <div className='w-9 text-nowrap overflow-hidden text-ellipsis'>{item.id}</div>
                        <div className='w-36 '>{item.name}</div>
                        <div className='w-36 md:w-48 text-nowrap overflow-hidden text-ellipsis hidden lg:block'>{item.email}</div>
                        <div className='w-36 text-nowrap overflow-hidden text-ellipsis'>{item.role}</div>
                        <div className='w-20 text-nowrap overflow-hidden text-ellipsis hidden lg:block'>{item.status}</div>
                        <div className='flex justify-center w-20 gap-1'>
                            <Link><Edit /></Link>
                            <Link><Trash2 /></Link>
                        </div>
                    </div>
                ))
            }
        </div>
    </div>
    <div className='w-full flex justify-end mt-3'>
        <MyPagination endPoint = {"/page=1"} data = {users} />
    </div>
    </>
  )
}
