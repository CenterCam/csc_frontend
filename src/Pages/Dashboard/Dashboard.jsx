import React, { useState } from 'react'
import Footer from '../../Components/Frontend-Footer/Footer'
import NavbarDashboard from '../../Components/Dashboard-Navbar/NavbarDashboard'

export default function Dashboard() {
  const [countries,setCountries] = useState([]);
  const [languages,setLanguages] = useState([]);
  const [programs,setPrograms]= useState([]);
  const [statuses,setStatuses]= useState([]);
  const [flags,setFlages]= useState([]);
  const [services,setServices]= useState([]);
  const [country,setCountry]= useState("");
  const [language,setLanguage] = useState("");
  const [program,setProgram] = useState("");
  const [status,setStatus] = useState("");
  const [flag,setFlage]= useState("");
  const [service,setService ] = useState("");
  return (
    <div>
        <NavbarDashboard page={"/dashboard"} />
        <div className=' p-12 flex flex-wrap items-center   '>
                <section className=' border-2 rounded-lg shadow-lg p-6 pl-12 m-3 h-fit'>
                    <div className=' flex flex-wrap justify-start'>
                        <section className='border w-36 md:w-48 rounded-lg p-3 m-2 flex flex-col justify-center items-center'>
                            <p className='font-bold text-sm '>Users</p>
                            <p className='font-bold text-3xl'>15</p>
                        </section>
                        <section className='border w-24 md:w-48 rounded-lg p-3 m-2 flex flex-col justify-center items-center'>
                            <p className='font-bold text-sm '>Posts</p>
                            <p className='font-bold text-3xl'>15</p>
                        </section>
                        <section className='border w-24 md:w-48 rounded-lg p-3 m-2 flex flex-col justify-center items-center'>
                            <p className='font-bold text-sm '>Course</p>
                            <p className='font-bold text-3xl'>15</p>
                        </section>
                        <section className='border w-24 md:w-36 rounded-lg p-3 m-2 flex flex-col justify-center items-center'>
                            <p className='font-bold text-sm '>Countries</p>
                            <p className='font-bold text-3xl'>15</p>
                        </section>
                        <section className='border rounded-lg w-24 md:w-36 p-3 m-2 flex flex-col justify-center items-center'>
                            <p className='font-bold text-sm '>Languages</p>
                            <p className='font-bold text-3xl'>9</p>
                        </section>
                        <section className='border rounded-lg w-24 md:w-36 p-3 m-2 flex flex-col justify-center items-center'>
                            <p className='font-bold text-sm '>Promgrams</p>
                            <p className='font-bold text-3xl'>6</p>
                        </section>
                        <section className='border rounded-lg w-24 md:w-36 p-3 m-2 flex flex-col justify-center items-center'>
                            <p className='font-bold text-sm '>Statuses</p>
                            <p className='font-bold text-3xl'>6</p>
                        </section>
                        <section className='border rounded-lg w-24 md:w-36 p-3 m-2 flex flex-col justify-center items-center'>
                            <p className='font-bold text-sm '>Flags</p>
                            <p className='font-bold text-3xl'>4</p>
                        </section>
                        <section className='border rounded-lg w-24 md:w-36 p-3 m-2 flex flex-col justify-center items-center'>
                            <p className='font-bold text-sm '>Services</p>
                            <p className='font-bold text-3xl'>4</p>
                        </section>
                    </div>
                </section>
                <section className='w-full md:w-80 lg:w-1/3 border-2 rounded-lg shadow-lg p-6 m-3 h-fit'>
                    <p className='font-bold text-sm '>Countries</p>
                    <div className='flex justify-between space-x-3 items-center mt-3'>
                    <input type="text" value={country} onChange={(e)=>setCountry(e.target.value)} placeholder='Input Country' className='p-2 text-xs w-full  placeholder:text-xs border rounded-lg' />
                    <button className='bg-green-500 text-xs text-white font-medium px-3 py-2 rounded-lg'>Add</button>
                    </div>
                    <div className='space-y-3 mt-3'>
                        {
                        countries?.map((item,i)=>(
                            <div key={i} className='border-b-2 flex justify-between items-center p-1'>
                            <p className='text-sm font-medium'>{item.country}</p>
                            <Link href={"/"} >
                            <svg className='hover:scale-105' xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 72 72"><path fill="#FFF" d="M51.76 17H20.153v37.65c0 4.06 3.29 5.62 7.35 5.62H44.41c4.06 0 7.35-1.56 7.35-5.62zM31 16v-4h10v4"/><path fill="#9b9b9a" d="M51 37v20.621L48.3 60H33z"/><path fill="#FFF" d="M17 16h38v4H17z"/><path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2" d="M31 16v-4h10v4m10 9v31a4 4 0 0 1-4 4H25a4 4 0 0 1-4-4V25m-4-9h38v4H17zm24 12.25V55M31 28.25V55"/></svg>
                            </Link>
                            </div>
                        ))
                        }
                    </div>
                </section>
                <section className='w-full md:w-80 border-2 rounded-lg shadow-lg p-6 m-3 h-fit'>
                    <p className='font-bold text-sm '>Languages</p>
                    <div className='flex justify-between space-x-3 items-center mt-3'>
                    <input type="text" value={country} onChange={(e)=>setCountry(e.target.value)} placeholder='Input Country' className='p-2 text-xs w-full  placeholder:text-xs border rounded-lg' />
                    <button className='bg-green-500 text-xs text-white font-medium px-3 py-2 rounded-lg'>Add</button>
                    </div>
                    <div className='space-y-3 mt-3'>
                        {
                        countries?.map((item,i)=>(
                            <div key={i} className='border-b-2 flex justify-between items-center p-1'>
                            <p className='text-sm font-medium'>{item.country}</p>
                            <Link href={"/"} >
                            <svg className='hover:scale-105' xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 72 72"><path fill="#FFF" d="M51.76 17H20.153v37.65c0 4.06 3.29 5.62 7.35 5.62H44.41c4.06 0 7.35-1.56 7.35-5.62zM31 16v-4h10v4"/><path fill="#9b9b9a" d="M51 37v20.621L48.3 60H33z"/><path fill="#FFF" d="M17 16h38v4H17z"/><path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2" d="M31 16v-4h10v4m10 9v31a4 4 0 0 1-4 4H25a4 4 0 0 1-4-4V25m-4-9h38v4H17zm24 12.25V55M31 28.25V55"/></svg>
                            </Link>
                            </div>
                        ))
                        }
                    </div>
                </section>
                <section className=' w-full md:w-80 border-2 rounded-lg shadow-lg p-6 m-3 h-fit'>
                    <p className='font-bold text-sm '>Statuses</p>
                    <div className='flex justify-between space-x-3 items-center mt-3'>
                    <input type="text" value={country} onChange={(e)=>setCountry(e.target.value)} placeholder='Input Country' className='p-2 text-xs w-full  placeholder:text-xs border rounded-lg' />
                    <button className='bg-green-500 text-xs text-white font-medium px-3 py-2 rounded-lg'>Add</button>
                    </div>
                    <div className='space-y-3 mt-3'>
                        {
                        countries?.map((item,i)=>(
                            <div key={i} className='border-b-2 flex justify-between items-center p-1'>
                            <p className='text-sm font-medium'>{item.country}</p>
                            <Link href={"/"} >
                            <svg className='hover:scale-105' xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 72 72"><path fill="#FFF" d="M51.76 17H20.153v37.65c0 4.06 3.29 5.62 7.35 5.62H44.41c4.06 0 7.35-1.56 7.35-5.62zM31 16v-4h10v4"/><path fill="#9b9b9a" d="M51 37v20.621L48.3 60H33z"/><path fill="#FFF" d="M17 16h38v4H17z"/><path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2" d="M31 16v-4h10v4m10 9v31a4 4 0 0 1-4 4H25a4 4 0 0 1-4-4V25m-4-9h38v4H17zm24 12.25V55M31 28.25V55"/></svg>
                            </Link>
                            </div>
                        ))
                        }
                    </div>
                </section>
                <section className='w-full md:w-80 lg:w-1/3 border-2 rounded-lg shadow-lg p-6 m-3 h-fit'>
                    <p className='font-bold text-sm '>Programs</p>
                    <div className='flex justify-between space-x-3 items-center mt-3'>
                    <input type="text" value={country} onChange={(e)=>setCountry(e.target.value)} placeholder='Input Country' className='p-2 text-xs w-full  placeholder:text-xs border rounded-lg' />
                    <button className='bg-green-500 text-xs text-white font-medium px-3 py-2 rounded-lg'>Add</button>
                    </div>
                    <div className='space-y-3 mt-3'>
                        {
                        countries?.map((item,i)=>(
                            <div key={i} className='border-b-2 flex justify-between items-center p-1'>
                            <p className='text-sm font-medium'>{item.country}</p>
                            <Link href={"/"} >
                            <svg className='hover:scale-105' xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 72 72"><path fill="#FFF" d="M51.76 17H20.153v37.65c0 4.06 3.29 5.62 7.35 5.62H44.41c4.06 0 7.35-1.56 7.35-5.62zM31 16v-4h10v4"/><path fill="#9b9b9a" d="M51 37v20.621L48.3 60H33z"/><path fill="#FFF" d="M17 16h38v4H17z"/><path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2" d="M31 16v-4h10v4m10 9v31a4 4 0 0 1-4 4H25a4 4 0 0 1-4-4V25m-4-9h38v4H17zm24 12.25V55M31 28.25V55"/></svg>
                            </Link>
                            </div>
                        ))
                        }
                    </div>
                </section>
                <section className='w-full md:w-80 border-2 rounded-lg shadow-lg p-6 m-3 h-fit'>
                    <p className='font-bold text-sm '>Flags</p>
                    <div className='flex justify-between space-x-3 items-center mt-3'>
                    <input type="text" value={country} onChange={(e)=>setCountry(e.target.value)} placeholder='Input Country' className='p-2 text-xs w-full  placeholder:text-xs border rounded-lg' />
                    <button className='bg-green-500 text-xs text-white font-medium px-3 py-2 rounded-lg'>Add</button>
                    </div>
                    <div className='space-y-3 mt-3'>
                        {
                        countries?.map((item,i)=>(
                            <div key={i} className='border-b-2 flex justify-between items-center p-1'>
                            <p className='text-sm font-medium'>{item.country}</p>
                            <Link href={"/"} >
                            <svg className='hover:scale-105' xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 72 72"><path fill="#FFF" d="M51.76 17H20.153v37.65c0 4.06 3.29 5.62 7.35 5.62H44.41c4.06 0 7.35-1.56 7.35-5.62zM31 16v-4h10v4"/><path fill="#9b9b9a" d="M51 37v20.621L48.3 60H33z"/><path fill="#FFF" d="M17 16h38v4H17z"/><path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2" d="M31 16v-4h10v4m10 9v31a4 4 0 0 1-4 4H25a4 4 0 0 1-4-4V25m-4-9h38v4H17zm24 12.25V55M31 28.25V55"/></svg>
                            </Link>
                            </div>
                        ))
                        }
                    </div>
                </section>
                <section className=' w-full md:w-80 border-2 rounded-lg shadow-lg p-6 m-3 h-fit'>
                    <p className='font-bold text-sm '>Serice</p>
                    <div className='flex justify-between space-x-3 items-center mt-3'>
                    <input type="text" value={country} onChange={(e)=>setCountry(e.target.value)} placeholder='Input Country' className='p-2 text-xs w-full  placeholder:text-xs border rounded-lg' />
                    <button className='bg-green-500 text-xs text-white font-medium px-3 py-2 rounded-lg'>Add</button>
                    </div>
                    <div className='space-y-3 mt-3 '>
                        {
                        countries?.map((item,i)=>(
                            <div key={i} className='border-b-2 flex justify-between items-center p-1'>
                            <p className='text-sm font-medium'>{item.country}</p>
                            <Link href={"/"} >
                            <svg className='hover:scale-105' xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 72 72"><path fill="#FFF" d="M51.76 17H20.153v37.65c0 4.06 3.29 5.62 7.35 5.62H44.41c4.06 0 7.35-1.56 7.35-5.62zM31 16v-4h10v4"/><path fill="#9b9b9a" d="M51 37v20.621L48.3 60H33z"/><path fill="#FFF" d="M17 16h38v4H17z"/><path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2" d="M31 16v-4h10v4m10 9v31a4 4 0 0 1-4 4H25a4 4 0 0 1-4-4V25m-4-9h38v4H17zm24 12.25V55M31 28.25V55"/></svg>
                            </Link>
                            </div>
                        ))
                        }
                    </div>
                </section>
        </div>
        <Footer />
    </div>
  )
}
