import React, { useEffect, useRef } from 'react'

export default function SmallCard() {
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
    console.log(<myref className="current innerHTML"></myref>);
  return (
    <div className=" m-6 w-80 hover:scale-105 transition">
        <div>
            <img
            src="{{url('/frontendAssets/posts/'.$post->imgLink)}}"
            alt="post-img"
            className="h-80 object-cover  "
            />
        </div>
        <div class="p-3"  >
            <div className="flex space-x-3 items-center ">
                <div ref={myref} id="status" className=" w-fit p-2 rounded-sm font-bold text-white text-xs ">On Going</div>
                <div className="text-xs text-black font-bold">Deadline : 2024.05.18</div>
            </div>
            <a href="{{route('page.postDetail',$post)}}" class="font-bold text-lg hover:underline text-black">
                <div>
                    <p class=" line-clamp-1">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facilis ullam ut natus, enim magnam maiores ducimus! Eligendi inventore adipisci numquam repudiandae sequi reiciendis quod dolore harum officia, rem quaerat placeat?
                    </p>
                    <p class="text-xs line-clamp-2">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo eaque explicabo fuga, illum suscipit iste voluptate soluta perferendis nam harum sequi voluptates quis odit modi corporis repellendus excepturi deleniti! Cumque.</p>
                </div>
            </a>
        </div>
    </div>
  )
}
