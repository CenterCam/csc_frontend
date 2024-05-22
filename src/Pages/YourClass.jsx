import Footer from '@/Components/Frontend-Footer/Footer'
import Navbar from '@/Components/Frontend-Navbar/Navbar'
import Loading from '@/Components/ui/Loading';
import { Store } from '@/Utils/Store';
import { proxy } from '@/Utils/Utils';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext } from 'react'
import { Link } from 'react-router-dom';

export default function YourClass() {
  const {state , dispatch} = useContext(Store);
  const {csc_user} = state;
  const user_id = csc_user.user.id;
  const {isLoading , isError, data:courses} = useQuery({ 
    queryKey: ['courses',{user_id}], 
    queryFn: async ()=>{
        try {
            const response = await axios.get(`${proxy}/api/course/user/${user_id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
});
  return (
    <div>
        <Navbar/>
            <div className='p-12'>
                <h1 className='text-3xl font-bold'>You Classes</h1>
                {
                  isLoading && <Loading />
                }
                {
                  courses?.length == 0 ?
                  <div className='w-full h-screen flex justify-center items-center'>
                    <h1 className='text-3xl font-bold'>No Classes !!</h1>
                  </div> :
                  <div className='mt-3 columns-1 md:columns-2 lg:columns-4'>
                    {courses?.map((item,i)=>(
                      <div key={i} className='w-full border-2 rounded-lg p-3 shadow-lg overflow-hidden' >
                          <Link to={`/video/${item.course_id}`}>
                            <img className='w-full h-60 object-cover' src={item.image} alt="" />
                            <p className='mt-3 font-bold capitalize'>{item.title}</p>
                          </Link>
                        </div>
                    ))}
                  </div>
                }
            </div>
        <Footer/>
    </div>
  )
}
