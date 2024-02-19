import React, { useEffect, useRef } from 'react'

export default function () {
    const myref = useRef();
    useEffect(()=>{
        if (myref.current) {
            if(myref.current.innerHTML==='Hot'){
                    myref.current.classList.add('bg-red-600'); 
                }else if(element.innerHTML==='On Going'){
                    myref.current.classList.add('bg-green-600'); 
                }else if(element.innerHTML==='New'){
                    myref.current.classList.add('bg-blue-600'); 
                }else if(element.innerHTML==='Popular'){
                    myref.current.classList.add('bg-purple-600'); 
                }else{
                    myref.current.classList.add('bg-black-600'); 
                }
        }
    },[])
  return (
    <div className='relative m-6 w-96 hover:scale-105 transition'  >
      <div>
        <img
            src="{{url('/frontendAssets/posts/'.$post->imgLink)}}"
            alt="post-img"
            className="h-96 object-cover"
            />    
      </div>
      <div className='absolute hover:scale-y-110 transition bottom-0 p-3 bg-black bg-opacity-60 w-full'>
        <div  className="flex space-x-3 items-center    ">
            <div id="status"  ref={myref}  className="  w-fit p-2 rounded-sm text-white text-xs font-bold " >
                Hot
            </div>
            <div className="text-xs text-white font-bold">Deadline : 2023-15-20</div>
       </div>
       <div >
          <a
            href="{{route('page.postDetail',$post)}}"
            className="font-bold text-lg hover:underline text-white overflow-hidden"
          >
            <div>
            <p className=" line-clamp-1">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae eos expedita, rem quaerat velit tenetur explicabo iure, recusandae error animi facilis quas qui ducimus molestiae laboriosam odit. Labore, quas maiores.
            </p>
            <p className="text-xs line-clamp-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis inventore dolorum dolorem ex consequatur officia magnam ipsum saepe eius, reprehenderit voluptas deleniti, excepturi maxime, pariatur exercitationem velit rerum doloremque vero.</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}
