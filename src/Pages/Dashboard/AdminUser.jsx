import React from 'react'
import NavbarDashboard from '../../Components/Dashboard-Navbar/NavbarDashboard'
import Footer from '../../Components/Frontend-Footer/Footer'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { Button } from '@/Components/ui/button'
import UserTable from '@/Components/Table/UserTable'

export default function AdminUser() {
  const handleDelete = (e)=>{
    e.preventDefault();
    const shouldContinue = window.confirm("Are you sure you want to delete?");
    if (shouldContinue) {
        toast.success("User have been deleted")
    } 
  }
  return (
    <div>
        <NavbarDashboard page={"/dashboard/user"} />
        <div className='w-full flex flex-col mt-6 px-9'>
            <div className='flex justify-between gap-3'>
                <p className='font-bold text-3xl'>User List</p>
                <Link to={"/dashboard/user/create"} >
                    <Button className="bg-orange-400 hover:bg-orange-600 shadow">Create User</Button>
                </Link>
            </div>
            <UserTable />
        </div>
        <Footer />
    </div>
  )
}
