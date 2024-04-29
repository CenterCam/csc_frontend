import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Frontend-Navbar/Navbar'
import Footer from '../Components/Frontend-Footer/Footer'
import Carousel from '../Components/Carousel/Carousel'
import PostCard from '../Components/Card/PostCard'
import Flag from '../Components/Flag/Flag'
import { UserRedirect } from '../Utils/UserRediect'

export default function Home() {
  UserRedirect();
  const [items,setItem]= useState(["item1","item2","item3","item4"])
  return (
    <div>
        <Navbar page={"/"} />
        <section>
          <Carousel />  
        </section>
        <section className='p-3 flex flex-col justify-center items-center'>
          <h1 class=" font-bold text-lg md:text-2xl">
            Find Scholarships to Finance Your Study
          </h1>
          <form action="" className=" mt-3 p-3 rounded-md grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-5 items-center ">
          <div className="">
            <select required name="destination" className="rounded-md border-none text-xs w-56 focus:ring-0">
              <option >DESTINATION</option>
              <option value="/">Cambodia</option>
            </select>
          </div>
          <div className="">
            <select required name="program" className="rounded-md border-none text-xs w-56 focus:ring-0">
              <option selected>TYPE OF DEGREE</option>
              <option value="/">Cambodia</option>
            </select>
          </div>
          <div className="flex items-center text-xs w-56 pl-1  ">
            <p>FROM</p>
            <input
              type="date"
              className=" border-none focus:ring-0 text-xs pl-1"
              name="start_date"
              id=""
              required
            />
          </div>
          <div className=" flex items-center text-xs w-56 pl-1  ">
            <p>UNTIL</p>
            <input
              type="date"
              className=" border-none focus:ring-0 text-xs pl-1"
              name="end_date"
              id=""
              required
            />
          </div>
          <button className=" bg-orange-500 p-2 rounded-md text-sm font-bold text-white mx-3 ">
            Find Scholarship
          </button>
        </form>
        </section>
        <section className='p-3 flex flex-col justify-center items-center'>
          <h1 className=" font-bold text-lg md:text-2xl">
            The Latest Scholarships
          </h1>
          <div className=" grid gap-3 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
            {
              items.map((item,i)=>(
                <PostCard key={i} />
              ))
            }
          </div>
        </section>
        <section className='mt-9 flex flex-col justify-center items-center p-3'>
          <h1 className=" font-bold text-lg md:text-2xl">
            Popular Counties For Scholarship
          </h1>
          <div className='flex flex-wrap justify-center items-center p-3'>
            {
              items.map((item,i)=>(
                <Flag key={i} />
              ))
            }
          </div>
        </section>
        <section className='mt-9 flex flex-col justify-center items-center mb-9'>
          <h1 class=" font-bold text-lg md:text-2xl text-center">
            Find and Compare University Scholarships Worldwide
          </h1>
          <div className='flex flex-col text-center w-5/6 space-y-3 mt-3 text-sm'>
              <div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod quae delectus earum obcaecati quia odio animi vitae dolorum amet adipisci at, pariatur quo, ut quos atque sed, dignissimos molestiae? Molestiae?
              </div>
              <div>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illo, fuga distinctio maxime ipsum maiores quod facere, sequi molestiae laudantium eaque possimus consequuntur est autem, dolores dolorum omnis nesciunt saepe. Neque.
              </div>
              <div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad eaque eos sunt asperiores minima veritatis facilis quisquam ea minus, porro dignissimos! Cumque voluptates tempore earum ullam eveniet nam quae accusantium.
              </div>
          </div>
        </section>
        <Footer />
    </div>
  )
}
