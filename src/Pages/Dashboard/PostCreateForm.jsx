import React, { useState } from 'react'
import NavbarDashboard from '../../Components/Dashboard-Navbar/NavbarDashboard';
import { toast } from 'sonner';
import Footer from '../../Components/Frontend-Footer/Footer';

export default function PostCreateForm() {
    const [title, setTitle] = useState("");
    const [country, setCountry] = useState("");
    const [status, setStatus] = useState("");
    const [program, setProgram] = useState("");
    const [category, setCategory] = useState("");
    const [deadline, setDeadline] = useState("");
    const [shortDesc, setShortDesc] = useState("");
    const [content, setContent] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const submit = (e)=>{
        e.preventDefault();
        toast.success("Post have been created");
    }
    const handleFileChange = (event) => {
        const file = event.target.files[0];
    
        if (file) {
          setSelectedFile(file);
    
          // Read the file and set the image preview
          const reader = new FileReader();
          reader.onloadend = () => {
            setImagePreview(reader.result);
          };
          reader.readAsDataURL(file);
        }
      };
  return (
    <div>
        <NavbarDashboard />
        <div className='p-3 w-full flex justify-center items-center'>
            <div className=" w-full md:w-1/2 ">
                <p className="my-3 font-bold text-black text-lg" >Create Post</p>
                <form className="space-y-6">
                    <div>
                            <label for="title" className="block mb-2 text-sm font-medium text-gray-900 ">Title</label>
                            <input value={title} onChange={(e)=>setTitle(e.target.value)} type="text" id="title" name="title" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 " />
                    </div>
                    <div>
                            <label for="country" className="block mb-2 text-sm font-medium text-gray-900 ">Country</label>
                            <input value={country} onChange={(e)=>setCountry(e.target.value)} type="text" id="email" name="email" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 " />
                    </div>
                    <div>
                            <label for="program" className="block mb-2 text-sm font-medium text-gray-900 ">Program</label>
                            <select value={program} type="text" onChange={(e)=>setProgram(e.target.value)} id="program" name="program" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 ">
                                <option value="">Bachelor</option>
                                <option value="">Master</option>
                            </select>
                    </div>
                    <div>
                            <label for="status" className="block mb-2 text-sm font-medium text-gray-900 ">Status</label>
                            <select  value={status} onChange={(e)=>setStatus(e.target.value)} type="text" id="status" name="status" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 ">
                                <option value="">New</option>
                                <option value="">Hot</option>
                            </select>
                    </div>
                    <div>
                            <label for="category" className="block mb-2 text-sm font-medium text-gray-900 ">Category</label>
                            <select  value={category} onChange={(e)=>setCategory(e.target.value)} type="text" id="category" name="category" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 ">
                                <option value="">News</option>
                                <option value="">Scholarship</option>
                            </select>
                    </div>
                    <div>
                            <label for="shortDescription" className="block mb-2 text-sm font-medium text-gray-900 ">Short Description</label>
                            <input value={shortDesc} onChange={(e)=>setShortDesc(e.target.value)} type="text" id="shortDescription" name="shortDescription" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 " />
                    </div>
                    <div>
                            <label for="content" className="block mb-2 text-sm font-medium text-gray-900 ">Short Description</label>
                            <textarea className='border-2 rounded-lg w-full' value={content} onChange={(e)=>setContent(e.target.value)}  name="content" id="" cols="30" rows="10"></textarea>
                    </div>
                    <div>
                        <p className='text-sm font-medium'>Change Image</p>
                        <input onChange={handleFileChange} className="block w-full p-2 file:border-none file:rounded-lg mt-3 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50  " id="file_input" type="file" />
                        {selectedFile && (
                            <div className='mt-3'>
                            <img
                                src={imagePreview}
                                alt="Preview"
                                style={{ maxWidth: '100%', maxHeight: '200px' }}
                            />
                            </div>
                        )}
                    </div>
                    <button type="submit " onClick={submit} className="font-medium p-2 rounded-full px-4 text-sm bg-green-600 text-white my-3" >Submit</button>
                </form>
            </div>
        </div>
        <Footer />
    </div>
  )
}