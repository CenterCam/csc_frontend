import React, { useState } from 'react'
import NavbarDashboard from '../../Components/Dashboard-Navbar/NavbarDashboard'
import Footer from '../../Components/Frontend-Footer/Footer'

export default function CourseCreateForm() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');
    const [duration, setDuration] = useState('');
    const [cost, setCost] = useState(0); // Assuming cost is a number
    const [discount, setDiscount] = useState(0); // Assuming discount is a number
    const [price, setPrice] = useState(0); // Assuming price is a number
    const [author, setAuthor] = useState('');
    const [imageLink, setImageLink] = useState('');

    const submit = (e)=>{
        e.preventDefault();
        toast.success("Post have been created");
    }

  return (
    <div>
        <NavbarDashboard />
        <div className='p-3 w-full flex justify-center items-center'>
            <div className=" w-full md:w-1/2 ">
                <p className="my-3 font-bold text-black text-lg" >Create Course</p>
                <form className="space-y-6">
                    <div>
                            <label for="title" className="block mb-2 text-sm font-medium text-gray-900 ">Title</label>
                            <input value={title} onChange={(e)=>setTitle(e.target.value)} type="text" id="title" name="title" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 " />
                    </div>
                    <div>
                            <label for="description" className="block mb-2 text-sm font-medium text-gray-900 ">Description</label>
                            <input value={description} onChange={(e)=>setDescription(e.target.value)} type="text" id="description" name="description" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 " />
                    </div>
                    <div>
                            <label for="type" className="block mb-2 text-sm font-medium text-gray-900 ">Type</label>
                            <select value={type} type="text" onChange={(e)=>setType(e.target.value)} id="type" name="type" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 ">
                                <option value="">Free</option>
                                <option value="">Paid</option>
                            </select>
                    </div>
                    <div>
                            <label for="duration" className="block mb-2 text-sm font-medium text-gray-900 ">Duration</label>
                            <input value={duration} onChange={(e)=>setDuration(e.target.value)} type="text" id="duration" name="duration" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 " />
                    </div>
                    <div>
                            <label for="cost" className="block mb-2 text-sm font-medium text-gray-900 ">Cost</label>
                            <input value={cost} onChange={(e)=>setCost(e.target.value)} type="text" id="cost" name="cost" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 " />
                    </div>
                    <div>
                            <label for="discount" className="block mb-2 text-sm font-medium text-gray-900 ">Discount</label>
                            <input value={discount} onChange={(e)=>setDiscount(e.target.value)} type="text" id="discount" name="discount" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 " />
                    </div>
                    <div>
                            <label for="price" className="block mb-2 text-sm font-medium text-gray-900 ">Price</label>
                            <input value={price} onChange={(e)=>setPrice(e.target.value)} type="text" id="price" name="price" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 " />
                    </div>
                    <div>
                            <label for="author" className="block mb-2 text-sm font-medium text-gray-900 ">Author</label>
                            <input value={author} onChange={(e)=>setAuthor(e.target.value)} type="text" id="author" name="author" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 " />
                    </div>
                    <div>
                            <label for="imageLink" className="block mb-2 text-sm font-medium text-gray-900 ">ImageLink</label>
                            <input value={imageLink} onChange={(e)=>setImageLink(e.target.value)} type="text" id="imageLink" name="imageLink" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 " />
                    </div>
                    <button type="submit " onClick={submit} className="font-medium p-2 rounded-full px-4 text-sm bg-green-600 text-white my-3" >Submit</button>
                </form>
            </div>
        </div>
        <Footer />
    </div>
  )
}

