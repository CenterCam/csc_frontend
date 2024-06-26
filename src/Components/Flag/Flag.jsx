import React from 'react'

export default function Flag({item}) {
  return (
    <div className="">
        <img
        src={item.ct_link}
        className=" w-36 h-24 lg:w-48 lg:h-36 rounded-lg shadow-lg  object-cover hover:scale-90 hover:duration-700"
        alt=""
        />
    </div>
  )
}
