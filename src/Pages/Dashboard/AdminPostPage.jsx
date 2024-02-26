import React from 'react'
import NavbarDashboard from '../../Components/Dashboard-Navbar/NavbarDashboard'
import Footer from '../../Components/Frontend-Footer/Footer'
import { Link } from 'react-router-dom'
import { toast } from 'sonner';

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
        <div className='w-full flex flex-col justify-center items-center'>
            <div className='flex justify-between gap-6 my-3 p-3 lg:w-1/2'>
                <p className='font-bold text-lg'>User List</p>
                <Link to={"/dashboard/post/create"} className='text-white font-medium text-sm bg-green-500 py-1 px-4 rounded-full'>Create User</Link>
            </div>
            <div className='lg:w-1/2 p-3 w-full'>
                <div className="w-full overflow-scroll scrollable">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-900 uppercase bg-gray-100">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    NO.
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Title
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Country
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Program
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Category
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Deadline
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody className='text-black font-medium'>
                            <tr className="odd:bg-white even:bg-gray-50 border-b ">
                                <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                                    1
                                </th>
                                <td className="px-6 py-4 truncate w-40 line-clamp-1">
                                Scholarship to Cambodia
                                </td>
                                <td className="px-6 py-4">
                                Cambodia
                                </td>
                                <td className="px-6 py-4">
                                New
                                </td>
                                <td className="px-6 py-4">
                                Bachelor/Master/Phd
                                </td>
                                <td className="px-6 py-4">
                                Scholarship
                                </td>
                                <td className="px-6 py-4">
                                15/02/2003
                                </td>
                                <td className="px-6 py-4 flex items-center space-x-3">
                                <Link to={`/dashboard/post/update/${id}`} >
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M9 15v-4.25l9.175-9.175q.3-.3.675-.45t.75-.15q.4 0 .763.15t.662.45L22.425 3q.275.3.425.663T23 4.4q0 .375-.138.738t-.437.662L13.25 15H9Zm10.6-9.2l1.425-1.4l-1.4-1.4L18.2 4.4l1.4 1.4ZM5 21q-.825 0-1.413-.588T3 19V5q0-.825.588-1.413T5 3h8.925L7 9.925V17h7.05L21 10.05V19q0 .825-.588 1.413T19 21H5Z"/></svg>            
                                </Link>
                                <button onClick={handleDelete} href="{{route('user.delete.action',$user)}}">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M7.615 20q-.666 0-1.14-.475Q6 19.051 6 18.385V6h-.5q-.213 0-.356-.144T5 5.499q0-.212.144-.356Q5.288 5 5.5 5H9q0-.31.23-.54q.23-.23.54-.23h4.46q.31 0 .54.23q.23.23.23.54h3.5q.213 0 .356.144q.144.144.144.357q0 .212-.144.356Q18.713 6 18.5 6H18v12.385q0 .666-.475 1.14q-.474.475-1.14.475h-8.77Zm2.693-3q.213 0 .356-.144q.144-.144.144-.356v-8q0-.213-.144-.356T10.307 8q-.213 0-.356.144t-.143.356v8q0 .213.144.356t.356.144Zm3.385 0q.213 0 .356-.144t.143-.356v-8q0-.213-.144-.356T13.692 8q-.213 0-.356.144q-.144.144-.144.356v8q0 .213.144.356t.357.144Z"/></svg>
                                </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <Footer />
    </div>
  )
}
