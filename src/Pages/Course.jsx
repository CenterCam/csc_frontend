import React, { useContext } from 'react'
import Navbar from '../Components/Frontend-Navbar/Navbar'
import Footer from '../Components/Frontend-Footer/Footer'
import CourseCard from '../Components/Card/CourseCard'
import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Store } from '@/Utils/Store';
import axios from 'axios';
import { proxy } from '@/Utils/Utils';
import { Input } from '@/Components/ui/input';
import MyPagination from '@/Components/Pagination/MyPagination';

export default function Course() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const search = queryParams.get("search") || "all";
  const sortBy = queryParams.get("sortBy") || "created_at";
  const sortDir = queryParams.get("sortDir") || "desc";
  const page =  queryParams.get("page") || 1;
  const {state , dispatch} = useContext(Store);
  const {csc_user} = state;
  const navigate = useNavigate();
  const {isLoading , isError, data:courses} = useQuery({ 
      queryKey: ['courses',{search,sortBy,sortDir}], 
      queryFn: async ()=>{
          try {
              const response = await axios.get(`${proxy}/api/course/${search}/${sortBy}/${sortDir}?page=${page}`);
              return response.data;
          } catch (error) {
              throw error;
          }
      }
    });
    const user_id = csc_user?.user?.id;
    const {isLoading:loding3 , isError:error3, data:coursesBelongToUser} = useQuery({ 
        queryKey: ['coursesBelongToUser',{user_id}], 
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
        <Navbar page={"/course"} />

        <section className="px-9 md:px-24 mb-9">
          <div className='flex items-center gap-3 my-6 border-b pb-6'>
            <div className="font-bold text-lg ">Course</div>
            <div>
              <Input className="w-full sm:w-96" onChange={(e)=>navigate(`/course?search=${e.target.value}&&sortBy=${sortBy}&&sortDir=${sortDir}&&page=${page}`)} type="text"  placeholder="Search..." />
            </div>
          </div>
          <div className='columns-1 md:columns-2 xl:columns-3 space-y-9  px-6 md:px-14 lg:px-36 w-full'>
            {
              courses?.data.map((item,i)=>(
                <CourseCard key={i} item={item} coursesBelongToUser={coursesBelongToUser} />  
              ))
            }
          </div>
        </section>
        <div className='w-full flex justify-end mt-3 px-9'>
          <MyPagination
              url = {`/course?search=${search}&&sortBy=${sortBy}&&sortDir=${sortDir}`}
              links = {courses?.links}
              total = {courses?.total}
              current = {courses?.to}
          />
        </div>
        <Footer />
    </div>
  )
}
