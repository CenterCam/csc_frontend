import React from 'react'
import NavbarDashboard from '../../Components/Dashboard-Navbar/NavbarDashboard'
import Footer from '../../Components/Frontend-Footer/Footer'
import { Link } from 'react-router-dom'
import CourseTable from '@/Components/Table/CourseTable';
import { Button } from '@/Components/ui/button';

export default function AdminXoursePage() {
  return (
    <div>
        <NavbarDashboard page={"/dashboard/course"} />
        <div className='w-full flex flex-col justify-center items-center mt-6 px-9'>
            <div className='flex justify-between gap-3  w-full'>
                <p className='font-bold text-3xl'>Course List</p>
                <Link to={"/dashboard/course/create"}>
                    <Button className="bg-orange-400 hover:bg-orange-600 shadow">Create Course</Button>
                </Link>
            </div>
            <div className='w-full'>
                <CourseTable  />
            </div>
        </div>
        <Footer />
    </div>
  )
}
