import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  const [menu, setMenu] = useState(false);
  return (
    <nav className="sticky bg-white w-full z-50 top-0 start-0 border-b shadow-lg ">
        <div className="flex flex-wrap items-center justify-between mx-auto p-3">
            <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                <img src="/logo.jpg" className="mr-3 h-12 md:h-16 " alt="Logo" />
                <div className="hidden xl:flex flex-col -space-y-2  text-black ">
                    <div className=" font-bold text-xl">Cambodia</div>
                    <div className="-space-y-2 font-bold text-sm">
                        <div className="italic">scholarship</div>
                        <div className="italic">center</div>
                    </div>
                </div>
            </Link>
            <div className="hidden  xl:flex xl:items-center">
                <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-default">
                    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg md:space-x-3 lg:space-x-9 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 bg-white">
                    <li>
                        <Link to="/" className= 'block py-2 px-3 text-black rounded'>Home</Link>
                    </li>
                    <li>
                        <Link to="/blog" className= 'block py-2 px-3 text-black rounded'>Blog</Link>
                    </li>
                    <li>
                        <Link to="/scholarship" className= 'block py-2 px-3 text-black rounded'>Scholarship</Link>
                    </li>
                    <li>
                        <Link to="/course" className= 'block py-2 px-3 text-black rounded'>Course</Link>
                    </li>
                    <li>
                        <Link to="/contact" className= 'block py-2 px-3 text-black rounded'>Contact</Link>
                    </li>
                    </ul>
                </div>
            </div>
            <div className='flex space-x-3 relative'>
                <Link to="/signin" type="button"  className="text-white bg-orange-500 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 text-center">Login</Link>
                <div className='xl:hidden cursor-pointer hover:scale-110 transition'  onClick={()=>setMenu(!menu)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 6h18M3 12h18M3 18h18"/></svg>
                </div>
                {
                    menu && 
                    <div className='xl:hidden absolute right-0 top-16   '>
                        <ul className="flex flex-col p-4 w-60 font-medium border border-gray-100 rounded-lg bg-white">
                            <li>
                                <Link to="/" className= 'block py-2 px-3 text-black rounded'>Home</Link>
                            </li>
                            <li>
                                <Link to="/blog" className= 'block py-2 px-3 text-black rounded'>Blog</Link>
                            </li>
                            <li>
                                <Link to="/scholarship" className= 'block py-2 px-3 text-black rounded'>Scholarship</Link>
                            </li>
                            <li>
                                <Link to="/course" className= 'block py-2 px-3 text-black rounded'>Course</Link>
                            </li>
                            <li>
                                <Link to="/contact" className= 'block py-2 px-3 text-black rounded'>Contact</Link>
                            </li>
                        </ul>
                    </div>
                }
            </div>
        </div>
    </nav>
  )
}
