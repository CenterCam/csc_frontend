import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom';

export default function SmallCard({item}) {
    const today = new Date();
    const date = today.toISOString().slice(0,10);
    const myref = useRef();
    useEffect(()=>{
        if (myref.current) {
            if(myref.current.innerHTML ==='Hot'){
                myref.current.classList.add('bg-red-600'); 
            }else if(myref.current.innerHTML ==='On Going'){
                myref.current.classList.add('bg-green-600'); 
            }else if(myref.current.innerHTML ==='New'){
                myref.current.classList.add('bg-blue-600'); 
            }else if(myref.current.innerHTML ==='Popular'){
                myref.current.classList.add('bg-purple-600'); 
            }else{
                myref.current.classList.add('bg-black-600'); 
            }
        }
    },[])
  return (
    <div className=" h-[380px] sm:h-[520px] transition overflow-hidden">
        <div>
            <img
            src={item.imgLink}
            alt="post-img"
            className="h-64 sm:h-96 lg:h-[400px] w-full object-cover  "
            />
        </div>
        <div class="p-3"  >
            <div className="flex space-x-3 items-center ">
                <div className={ item.deadline.slice(0,10) < date ? "font-normal text-sm text-red-600 " : "font-normal text-sm text-gray-700 "}>Deadline : {item.deadline.slice(0,10)}</div>
            </div>
            <Link to={`/postDetail/${item.id}`} class="font-bold text-lg hover:underline text-black">
                <div>
                    <p class=" line-clamp-1">
                        {item.title}
                    </p>
                    <p class="text-sm line-clamp-2">{item.shortDescription}</p>
                </div>
            </Link>
        </div>
    </div>
  )
}
