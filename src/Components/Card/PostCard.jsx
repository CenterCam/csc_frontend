import React from 'react'
import { Link } from 'react-router-dom'

export default function PostCard({item}) {
  const today = new Date();
  const date = today.toISOString().slice(0,10);
  return (
    <div className="overflow-hidden h-[450px] sm:h-[540px] max-w-sm w-full bg-white  capitalize"> 
    <Link to={`/postDetail/${item.id}`}>
      <img
        className=" h-56 sm:h-80 w-full object-cover"
        src={item.imgLink}
        alt=""
      />
    </Link>
    <div className="py-2">
      <div>
        <p className="mb-2 text-lg font-bold tracking-tight hover:underline text-black line-clamp-2">
          {item.title}
        </p>
      </div>
      <p className="mb-3 font-normal text-sm text-gray-700 dark:text-gray-400 line-clamp-2">
        {item.shortDescription} 
      </p>
      <div className=" mb-3">
        <p className=" font-normal text-sm text-gray-700 dark:text-gray-400 ">
           {item.country}
        </p>
        <p className="font-normal text-sm text-gray-700 dark:text-gray-400">
          {item.program}
        </p>
        <p className={ item.deadline.slice(0,10) < date ? "font-normal text-sm text-red-600 " : "font-normal text-sm text-gray-700 "}>
            Deadline : <span>{item.deadline.slice(0,10)}</span>
        </p>
      </div>
      <Link
        to={`/postDetail/${item.id}`}
        className="inline-flex rounded-md items-center px-3 py-2 text-sm font-medium text-center text-white bg-orange-500"
      >
        Read more
        <svg
          className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
      </Link>
    </div>
  </div>  
  )
}
