import React from 'react'
import NavbarDashboard from '../../Components/Dashboard-Navbar/NavbarDashboard'
import Footer from '../../Components/Frontend-Footer/Footer'
import { Link } from 'react-router-dom'
import { toast } from 'sonner';
import { Button } from '@/Components/ui/button';
import PostTable from '@/Components/Table/PostTable';
import { users } from '@/Components/Table/RandomUser';

export default function AdminPostPage() {
    const id = "asfsd";
    const handleDelete = (e)=>{
        e.preventDefault();
        const shouldContinue = window.confirm("Are you sure you want to delete?");
        if (shouldContinue) {
            toast.success("User have been deleted")
        } 
      }

  return (
    <div>
        <NavbarDashboard page={"/dashboard/post"} />
        <div className='w-full flex flex-col justify-center items-center mt-6 px-9'>
            <div className='flex justify-between gap-3  w-full'>
                <p className='font-bold text-3xl'>Post List</p>
                <Link to={"/dashboard/post/create"}>
                    <Button className="bg-orange-400 hover:bg-orange-600 shadow">Create Post</Button>
                </Link>
            </div>
            <div className='w-full'>
                <PostTable users={users} />
            </div>
        </div>
        <Footer />
    </div>
  )
}
