import PostCard from '@/Components/Card/PostCard';
import Carousel from '@/Components/Carousel/Carousel';
import Flag from '@/Components/Flag/Flag';
import Footer from '@/Components/Frontend-Footer/Footer';
import Navbar from '@/Components/Frontend-Navbar/Navbar';
import Loading from '@/Components/ui/Loading';
import { Store } from '@/Utils/Store';
import { proxy } from '@/Utils/Utils';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';


export default function Home() {
  const {state , dispatch} = useContext(Store);
  const {csc_user} = state;
  const [destination, setDestination] = useState(null);
  const [program, setProgram] = useState(null);
  const [start, setStart] = useState(null);
  const [until, setUntil] = useState(null);
  const navigate = useNavigate();

  const {isLoading , isError, data:homepageData} = useQuery({ 
      queryKey: ['homepageData'], 
      queryFn: async ()=>{
          try {
              const response = await axios.get(`${proxy}/api/homepage/data`);
              return response.data;
          } catch (error) {
              throw error;
          }
      }
    });

    const handleSearch = (e)=>{
      e.preventDefault();
      navigate(`/search?destination=${destination}&&program=${program}&&start=${start}&&until=${until}`)
    }
  return (
    <>
      {
        isLoading ? 
        <Loading />
        :
      <div>
          <Navbar page={"/"} />
          <section>
            <Carousel />  
          </section>
          <section className='p-3 flex flex-col justify-center items-center'>
            <h1 class=" font-bold text-lg md:text-2xl">
              Find Scholarships to Finance Your Study
            </h1>
            <form action="" onSubmit={handleSearch}  className=" mt-3 p-3 rounded-md columns-1 md:columns-1 xl:columns-5 space-y-3">
            <div className="">
              <select onChange={(e)=>setDestination(e.target.value)} value={destination} required name="destination" className="rounded-md bg-inherit border-2 p-2  capitalize text-sm  w-56 focus:ring-0 ">
                <option >DESTINATION</option>
                {
                  homepageData?.countries.map((item,i)=>(
                    <option key={i} value={item.ct_name}>{item.ct_name}</option>
                  ))
                }
              </select>
            </div>
            <div className="">
              <select onChange={(e)=>setProgram(e.target.value)} value={program} required name="program" className="rounded-md bg-inherit border-2 p-2  text-sm capitalize  w-56 focus:ring-0">
                <option selected>TYPE OF DEGREE</option>
                {
                  homepageData?.programs.map((item,i)=>(
                    <option key={i} value={item.name}>{item.name}</option>
                  ))
                }
              </select>
            </div>
            <div className="flex items-center text-xs w-56 pl-1 gap-3  ">
              <p>FROM</p>
              <input
                type="date"
                className="  bg-inherit border-2 rounded-md p-2 focus:ring-0 text-xs pl-1 w-full"
                name="start_date"
                onChange={(e)=>setStart(e.target.value)} value={start}
                id=""
                required
              />
            </div>
          <div className=" flex items-center text-xs w-56 pl-1  gap-3">
              <p>UNTIL</p>
              <input
                type="date"
                onChange={(e)=>setUntil(e.target.value)} value={until}
                className="  focus:ring-0md rounded-md text-xs pl-1 bg-inherit border-2 p-2 w-full"
                name="end_date"
                id=""
                required
              />
            </div>
            <input type="submit" value=" Find Scholarship"  className=" bg-orange-500 w-full p-2 rounded-md text-sm font-bold text-white  " />

          </form>
          </section>
          <section className='p-3 flex flex-col justify-center items-center'>
            <h1 className=" font-bold text-lg md:text-2xl">
              The Latest Scholarships
            </h1>
            <div className="columns-1 md:columns-2 lg:columns-4 space-y-3 gap-6 mt-6 xl:px-12">
              {
                  homepageData?.posts.map((item,i)=>(
                    <PostCard item={item} key={i} />       
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
                  homepageData?.flags.map((item,i)=>(
                    <Flag item={item} key={i} />
                  ))
              }
            </div>
          </section>
          <section className='mt-9 flex flex-col justify-center items-center mb-9'>
            <h1 class=" font-bold text-lg md:text-2xl text-center">
              Find and Compare University Scholarships Worldwide
            </h1>
            <div className='flex flex-col text-center w-5/6 space-y-3 mt-3 text-lg'>
                <div>
                Finding and comparing university scholarships worldwide involves researching various options that cater to different academic achievements, financial needs, and specific demographics or fields of study. 
                </div>
                <div>
                Key factors to consider include the amount of funding provided, eligibility criteria, application requirements, and the duration of the scholarship.
                </div>
                <div>
                Additionally, some scholarships offer valuable extras like mentorship programs, internships, and networking opportunities, which can enhance the educational experience and future career prospects.
                 </div>
            </div>
          </section>
          <section className='mt-9 flex flex-col justify-center items-center mb-9'>
            <h1 class=" font-bold text-lg md:text-2xl text-center">
              Our Serivces
            </h1>
            <div className='columns-1 md:columns-2 xl:columns-3 px-24 mt-3 space-y-6 w-full '>
              {
                homepageData?.services.map((item,i)=>(
                  <div key={i}  className='text-sm font-medium text-white bg-orange-500 py-3 w-full px-8 text-center rounded-lg overflow-hidden'>
                    {item.name}
                  </div>
                ))
              }
            </div>
          </section>
          <Footer />
      </div>
      }
    </>
  )
}
