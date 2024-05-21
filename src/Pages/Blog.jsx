import React, { useContext } from 'react'
import Navbar from '../Components/Frontend-Navbar/Navbar'
import Footer from '../Components/Frontend-Footer/Footer'
import Card from '../Components/Card/Card'
import SmallCard from '../Components/Card/SmallCard'
import { useLocation, useNavigate } from 'react-router-dom'
import { Store } from '@/Utils/Store'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { proxy } from '@/Utils/Utils'
import Loading from '@/Components/ui/Loading'
import MyPagination from '@/Components/Pagination/MyPagination'
import { Input } from '@/Components/ui/input'

export default function Blog() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const search = queryParams.get("search") || "all";
  const sortBy = queryParams.get("sortBy") || "created_at";
  const sortDir = queryParams.get("sortDir") || "desc";
  const page =  queryParams.get("page") || 1;
  const {state , dispatch} = useContext(Store);
  const {csc_user} = state;
  const navigate = useNavigate();
  const {isLoading , isError, data:posts} = useQuery({ 
      queryKey: ['posts',{search,sortBy,sortDir}], 
      queryFn: async ()=>{
          try {
              const response = await axios.get(`${proxy}/api/getPost/${search}/${sortBy}/${sortDir}?page=${page}`,{
                  headers : {
                      Authorization : `Bearer ${csc_user.token}`
                  }
              });
              return response.data;
          } catch (error) {
              throw error;
          }
      }
    });

  return (
    <div>
      <Navbar page={"/blog"} />
      <section className="recent border-b  p-3">
        <div className='flex items-center gap-3 my-6 border-b pb-6'>
          <div className="font-bold text-lg ">Recent Post</div>
          <div>
            <Input className="w-full sm:w-96" onChange={(e)=>navigate(`/blog?search=${e.target.value}&&sortBy=${sortBy}&&sortDir=${sortDir}&&page=${page}`)} type="text"  placeholder="Search..." />
          </div>
        </div>
        <div className=" columns-1 md:columns-2 lg:columns-3 space-y-9 px-6 md:px-24 lg:px-60 w-full">
          {
            isLoading ? 
            <Loading />
            :
            posts?.data.map((item,i)=>(
              <SmallCard key={i} item={item} />
            ))
          }
        </div>
      </section>
      <div className='w-full flex justify-end mt-3 px-3'>
          <MyPagination
              url = {`/blog?search=${search}&&sortBy=${sortBy}&&sortDir=${sortDir}`}
              links = {posts?.links}
              total = {posts?.total}
              current = {posts?.to}
          />
      </div>
      <Footer />
    </div>
  )
}
