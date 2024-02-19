import React from 'react'

export default function CourseCard() {
  return (
    <div class="course flex flex-col p-1 border m-3 justify-start items-start w-80 ">
        <div className="left w-full">
            <img
              src="https://play-lh.googleusercontent.com/DAjoLy_iFvFDWypZiQa8WALBpARu-0nui8VjiWzo5rm85A15pF9iHwNFIXC7pFqgbaE"
              alt=""
              className=" h-56 w-full object-cover"
            />
        </div>
        <div className='my-1 p-3'>
            <a href="" className='font-bold text-lg line-clamp-2 cursor-pointer hover:underline '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus voluptates voluptas eum dolorum autem dignissimos cupiditate eligendi earum ut veniam, unde consequatur, quod obcaecati. Magni ducimus consectetur dicta laboriosam ipsam?
            </a>
            <p className="my-1 line-clamp-2">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime ratione inventore facilis, perferendis rerum consequatur explicabo tempore temporibus? Error nulla nihil ea fugiat nisi vero eaque fuga, est in repellat.
            </p>
            <div className=" flex space-x-3">
              <p className="text-gray-500 text-sm">Created By : </p>
              <span className="text-gray-500 text-sm">Reach</span>
            </div>
            <div className="flex space-x-3">
              <p className="text-gray-500 text-sm ">Duration : 12 h Total</p>
              <p className="text-orange-500 text-sm font-bold">2025-15-02</p>
            </div>
        </div>
    </div>
  )
}
