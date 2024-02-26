import React, { useState } from 'react'
import NavbarDashboard from '../../Components/Dashboard-Navbar/NavbarDashboard'
import Footer from '../../Components/Frontend-Footer/Footer'
import { toast } from 'sonner';

export default function UserEditForm() {
    const [name, setName] = useState("Hong Reach");
    const [email, setEmail] = useState("nureach@gmail.com");
    const [role, setRole] = useState("admin");
    const [status, setStatus] = useState("active");
    const [password, setPassword] = useState("1234");
    const [confirmPassword, setConfirmPassword] = useState("1234");
    const submit = (e)=>{
        e.preventDefault();
        if (password != confirmPassword) {
            toast.error("Password does not match")
        }else{

            toast.success("User have been updated")
        }
    }
  return (
    <div>
        <NavbarDashboard />
        <div className='p-3 w-full flex justify-center items-center'>
            <div className=" w-full md:w-1/2 ">
                <p className="my-3 font-bold text-black text-lg" >Create User</p>
                <form className="space-y-6">
                    <div>
                            <label for="name" className="block mb-2 text-sm font-medium text-gray-900 ">Name</label>
                            <input value={name} onChange={(e)=>setName(e.target.value)} type="text" id="name" name="name" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 " />
                    </div>
                    <div>
                            <label for="email" className="block mb-2 text-sm font-medium text-gray-900 ">Email</label>
                            <input value={email} onChange={(e)=>setEmail(e.target.value)} type="text" id="email" name="email" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 " />
                    </div>
                    <div>
                            <label for="role" className="block mb-2 text-sm font-medium text-gray-900 ">Role</label>
                            <select value={role} type="text" onChange={(e)=>setRole(e.target.value)} id="role" name="role" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 ">
                                <option value="admin">Admin</option>
                                <option value="user">User</option>
                            </select>
                    </div>
                    <div>
                            <label for="status" className="block mb-2 text-sm font-medium text-gray-900 ">Status</label>
                            <select  value={status} onChange={(e)=>setStatus(e.target.value)} type="text" id="role" name="status" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 ">
                                <option value="active">active</option>
                                <option value="deactivate">deactivate</option>
                            </select>
                    </div>
                    <div>
                            <label for="password" className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                            <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" id="password" name="password" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 " />
                    </div>
                    <div>
                            <label for="confirm_password" className="block mb-2 text-sm font-medium text-gray-900 ">Confirm Password</label>
                            <input value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} type="password" id="confirm_password" name="password_confirmation" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 " />
                    </div>
                    <button type="submit " onClick={submit} className="font-medium p-2 rounded-full px-4 text-sm bg-green-600 text-white my-3" >Update</button>
                </form>
            </div>
        </div>
        <Footer />
    </div>
  )
}
