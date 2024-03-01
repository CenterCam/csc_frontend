import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function Signin() {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const navigate = useNavigate();
  const login = async (e)=>{
    e.preventDefault();
    const url = "http://127.0.0.1:8000/api/login";
    const data = {email:email,password:password};
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    };
    if (email!= "" && password != "") {
        try {
            const response = await axios.post(url, data, { headers });
            console.log('Response:', response.data);
            Cookies.set('csc_token', response.data.token, { expires: 7 });
            toast.success("Login Successfully")
            navigate("/")
          } catch (error) {
            console.error('Error:', error);
            toast.error("Email or password is incorrect!")
          }
        } else {
          alert("All Fields Are Required");
        }
  }


  return (
    <div className='bg-gray-100 h-screen flex justify-center items-center'>
        <div className='w-96 p-6 shadow-lg rounded-lg bg-white xl:w-1/3'>
            <div className="flex items-center space-x-3 mb-6">
                <a href="/">
                    <img src="/logo.jpg" className="h-16" alt="" />
                </a>
                <p className="">Cambodia Scholarship Center</p>
            </div>
            <div>
                <label className='text-sm my-2 font-medium'>Email</label>
                <input onChange={(e)=>setEmail(e.target.value)} type="text" className='border-2 h-12 rounded-lg w-full p-3' />
            </div>
            <div className='mt-3'>
                <label className='text-sm my-2 font-medium'>Password</label>
                <input onChange={(e)=>setPassword(e.target.value)} type="password" className='border-2 h-12 rounded-lg w-full p-3' />
            </div>

            <div className='mt-6 flex justify-between items-center'>
                <a href="/signup" className='underline text-gray-500'>Create an account ?</a>
                <button onClick={login} className='py-2 px-4 rounded-lg bg-slate-900 text-white'>Login</button>
            </div>
        </div>
    </div>
  )
}
