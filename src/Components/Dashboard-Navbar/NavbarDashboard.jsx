import { Store } from '@/Utils/Store';
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button';
import { LogOut } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { proxy } from '@/Utils/Utils';

export default function NavbarDashboard({page}) {
  const [menu, setMenu] = useState(false);
  const {state , dispatch} = useContext(Store);
  const navigate = useNavigate();
  const {csc_user} = state;
  const logout = async (e)=>{
    e.preventDefault();
    await singoutMutation();
        }
        const { isPending , mutateAsync : singoutMutation } = useMutation({
            mutationFn : async (state)=>{
            try {
                const response = await axios.post(`${proxy}/api/logout`,
                {},
                {
                    headers : {
                    authorization : `Bearer ${csc_user.token}`
                    }
                }    
                ) ;
                return response.data;
            } catch (error) {
                throw error;
            }
            },
            onSuccess : (response) => {
            dispatch({type:"USER_SIGNOUT"})
            navigate("/");
            toast.success("Sign out successfully");
            },
            onError : (err) => {
            console.log(err);
            toast.error(err.response.data.message);
            }
        })
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
                <div className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg md:space-x-3 lg:space-x-9 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 bg-white">
                <div className={page == "/dashboard" ? 'border-b-4 border-orange-500 rounded-lg' : ""}>
                    <Link to="/dashboard" className= 'block py-2 px-3 text-black rounded'>Dashboard</Link>
                </div>
                <div className={page == "/dashboard/user" ? 'border-b-4 border-orange-500 rounded-lg' : ""}>
                    <Link to="/dashboard/user" className= 'block py-2 px-3 text-black rounded'>User</Link>
                </div>
                <div className={page == "/dashboard/post" ? 'border-b-4 border-orange-500 rounded-lg' : ""}>
                    <Link to="/dashboard/post" className= 'block py-2 px-3 text-black rounded'>Post</Link>
                </div>
                <div className={page == "/dashboard/course" ? 'border-b-4 border-orange-500 rounded-lg' : ""}>
                    <Link to="/dashboard/course" className= 'block py-2 px-3 text-black rounded'>Course</Link>
                </div>
                </div>
            </div>
        </div>
        <div className='flex space-x-3 relative'>
            {
                csc_user.user.role == 'admin' && <Link className='hidden lg:block' to="/dashboard"><Button>Dashboard</Button></Link>
            }

            {
                csc_user != null ? 
                <button onClick={logout}   className="text-white bg-orange-500 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 text-center">
                    <LogOut />
                </button>
                :
                <Link to="/signin" type="button"  className="text-white bg-orange-500 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 text-center">Login</Link>
            }
                
            <div className='xl:hidden cursor-pointer hover:scale-110 transition'  onClick={()=>setMenu(!menu)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 6h18M3 12h18M3 18h18"/></svg>
            </div>
            {
                menu && 
                <div className='xl:hidden absolute right-0 top-16   '>
                    <ul className="flex flex-col p-4 w-60 font-medium border border-gray-100 rounded-lg bg-white list-none">
                        <li>
                            <Link to="/dashboard" className= 'block py-2 px-3 text-black rounded'>Dashboard</Link>
                        </li>
                        <li>
                            <Link to="/dashboard/user" className= 'block py-2 px-3 text-black rounded'>User</Link>
                        </li>
                        <li>
                            <Link to="/dashboard/post" className= 'block py-2 px-3 text-black rounded'>Post</Link>
                        </li>
                        <li>
                            <Link to="/dashboard/course" className= 'block py-2 px-3 text-black rounded'>Course</Link>
                        </li>
                    </ul>
                </div>
            }
        </div>
    </div>
</nav>
  )
}
