import SmallCard from '@/Components/Card/SmallCard';
import Footer from '@/Components/Frontend-Footer/Footer'
import Navbar from '@/Components/Frontend-Navbar/Navbar'
import Loading from '@/Components/ui/Loading';
import { proxy } from '@/Utils/Utils';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'
import { useLocation } from 'react-router-dom';

export default function SearchResult() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const destination = queryParams.get("destination") || "";
  const program = queryParams.get("program") || "";
  const start = queryParams.get("start") || "";
  const until =  queryParams.get("until") || "";

  console.log(destination,program,start,until);

  const {isLoading , isError, data:posts} = useQuery({ 
    queryKey: ['searchResult',{destination,program,start,until}], 
    queryFn: async ()=>{
        try {
            const response = await axios.get(`${proxy}/api/search/post/${destination}/${program}/${start}/${until}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
  });

  console.log(posts);
  return (
    <div>
        <Navbar />
        <div className='p-3 flex flex-col px-3 md:px-24 lg:px-36 mt-6'>
            <p className='font-bold text-3xl '> Your Result</p>
                {
                    posts?.length ==0 
                    &&
                    <div className='w-full h-96 flex justify-center items-center'>
                        <p className='text-6xl font-bold'>No Search Result !!</p>
                    </div>
                }
            <div className=" columns-1 md:columns-2 lg:columns-3 space-y-9 mt-9 w-full">
                {
                    isLoading ? 
                    <Loading />
                    :
                    posts?.map((item,i)=>(
                    <SmallCard key={i} item={item} />
                    ))
                }
                </div>
        </div>
        <Footer />
    </div>
  )
}
