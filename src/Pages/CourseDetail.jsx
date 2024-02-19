import React from 'react'
import Navbar from '../Components/Frontend-Navbar/Navbar'
import Footer from '../Components/Frontend-Footer/Footer'

export default function CourseDetail() {
  return (
    <div>
        <Navbar />
        <div className='flex flex-col xl:flex-row mx-3 xl:mx-24 mt-3 justify-center  space-x-0 xl:space-x-9'>
            <div className="w-full xl:w-2/4 mb-3">
                <div className="mb-3">
                    <p className="font-bold text-lg">Free Course</p>
                    <p className=" ">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate obcaecati animi fugit aspernatur recusandae. Temporibus quasi cupiditate rem doloremque facilis, quaerat tenetur distinctio ipsum vel mollitia minus dicta, odit deleniti.
                    </p>
                </div>
                <img src="https://i.pinimg.com/736x/92/50/82/925082011a2ce764dcb5e47c20776881.jpg" className="w-full object-cover" alt="" />
            </div>
            <div className="w-96">
                <p className="font-bold text-lg mb-3">Course content</p>
                <div className="space-y-3">
                    <div className="border-b pb-1">
                        <div className="space-y-1">
                            <a target="_blank" href="/" class="cursor-pointer font-bold hover:underline">1.Introduction</a>
                            <div className="flex items-center space-x-1 text-xs">
                            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24"><path fill="currentColor" d="M7 16h6q.425 0 .713-.288T14 15v-2.2l2.775 2.225q.375.3.8.1T18 14.45v-4.9q0-.475-.425-.675t-.8.1L14 11.2V9q0-.425-.288-.712T13 8H7q-.425 0-.712.288T6 9v6q0 .425.288.713T7 16Zm-3 4q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h16q.825 0 1.413.588T22 6v12q0 .825-.587 1.413T20 20H4Z"/></svg>
                            <p>45mn</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </div>
  )
}
