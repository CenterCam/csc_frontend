import React from 'react'

export default function PostCard() {
  return (
    <div className="max-w-sm w-72 bg-white border border-gray-200 rounded-lg shadow  mx-6 my-6"> 
    <a href="/">
      <img
        className="rounded-t-lg h-72 w-full object-cover"
        src="/"
        alt=""
      />
    </a>
    <div className="p-5">
      <a href="/">
        <p className="mb-2 text-lg font-bold tracking-tight hover:underline text-black line-clamp-2">
          Title
        </p>
      </a>
      <p className="mb-3 font-normal text-sm text-gray-700 dark:text-gray-400 line-clamp-2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. 
      </p>
      <div className=" mb-3">
        <p className=" font-normal text-sm text-gray-700 dark:text-gray-400 ">
            Cambodia
        </p>
        <p className="font-normal text-sm text-gray-700 dark:text-gray-400">
          PHP
        </p>
        <p className="font-normal text-sm text-gray-700 dark:text-gray-400">
            Deadline : <span>2012-05-12</span>
        </p>
      </div>
      <a
        href="/"
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
      </a>
    </div>
  </div>  
  )
}
