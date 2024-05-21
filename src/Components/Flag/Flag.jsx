import React from 'react'

export default function Flage({item}) {
  return (
    <div className="m-6">
        <img
        src={item.ct_link}
        className="w-48 h-36 rounded-lg shadow-lg  object-cover hover:scale-90 hover:duration-700"
        alt=""
        />
    </div>
  )
}
