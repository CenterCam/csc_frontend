import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../ui/button'

export default function CourseCard({item}) {
  return (
    <div className="course flex flex-col p-1 border justify-start items-start w-full h-[420px] overflow-hidden ">
        <div className="left w-full">
            <img
              src={item.image}
              alt=""
              className=" h-56 w-full object-cover"
            />
        </div>
        <div className='my-1 p-3'>
            <Link to={`/video/${item.id}`} className='font-bold text-lg line-clamp-2 cursor-pointer hover:underline capitalize'>
              {item.title}
            </Link>
            <p className="my-1 line-clamp-2 capitalize">
              {item.desc}
            </p>
            <div className=" flex space-x-3">
              <p className="text-gray-500 text-sm">Created By : </p>
              <span className="text-gray-500 text-sm capitalize">{item.user.name}</span>
            </div>
            <div className="flex space-x-3">
              <p className="text-gray-500 text-sm ">Duration : {item.duration}</p>
              <p className="text-orange-500 text-sm font-bold">2025-15-02</p>
            </div>
            {
              item.type == "paid" ?
              <Button className="bg-orange-400 my-1 hover:bg-orange-600">${(item.price)}</Button> :
              <Button className="bg-green-400 hover:bg-green-600">Free</Button>
            }
        </div>
    </div>
  )
}
