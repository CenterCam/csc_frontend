import React from 'react'
import Navbar from '../Components/Frontend-Navbar/Navbar'
import Footer from '../Components/Frontend-Footer/Footer'
import CourseCard from '../Components/Card/CourseCard'

export default function Course() {
  return (
    <div>
        <Navbar page={"/course"} />
        <section className='flex justify-center items-center my-3'>
          <div className=" relative flex items-center">
              <input name="keyword" type="text" className="border-none rounded-lg p-3 border-gray-700 w-96 focus:border-none focus:scale-105 transition-all focus:ring-0 shadow-lg" placeholder="Search course..." />
              <svg className="absolute right-2 top-2 " xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M9.538 15.23q-2.398 0-4.064-1.666T3.808 9.5q0-2.398 1.666-4.064t4.064-1.667q2.399 0 4.065 1.667q1.666 1.666 1.666 4.064q0 1.042-.369 2.017q-.37.975-.97 1.668l5.908 5.907q.14.14.15.345q.01.203-.15.363q-.16.16-.353.16q-.195 0-.354-.16l-5.908-5.908q-.75.639-1.725.989q-.975.35-1.96.35Zm0-1q1.99 0 3.361-1.37q1.37-1.37 1.37-3.36q0-1.99-1.37-3.36q-1.37-1.37-3.36-1.37q-1.99 0-3.361 1.37q-1.37 1.37-1.37 3.36q0 1.99 1.37 3.36q1.37 1.37 3.36 1.37Z"/></svg>
          </div>
        </section>
        <section className="px-9 md:px-24 mb-9">
          <div class="font-bold text-lg border-b">Free Course</div>
          <div className='flex justify-center flex-wrap'>
            <CourseCard />
            <CourseCard />
            <CourseCard />
          </div>
          <div className=" flex justify-end text-orange-600 font-bold text-xs mt-3 "><a href="search/seemore/bachelor">SEE MORE</a></div>         
        </section>
        <section className="px-9 md:px-24 mb-9">
          <div class="font-bold text-lg border-b">Paid Course</div>
          <div className='flex justify-center flex-wrap'>
            <CourseCard />
            <CourseCard />
            <CourseCard />
          </div>
          <div className=" flex justify-end text-orange-600 font-bold text-xs mt-3 "><a href="search/seemore/bachelor">SEE MORE</a></div>   
        </section>
        <Footer />
    </div>
  )
}
