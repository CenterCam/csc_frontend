import Footer from '@/Components/Frontend-Footer/Footer'
import Navbar from '@/Components/Frontend-Navbar/Navbar'
import Loading from '@/Components/ui/Loading'
import { Button } from '@/Components/ui/button'
import { Textarea } from '@/Components/ui/textarea'
import { Store } from '@/Utils/Store'
import { proxy } from '@/Utils/Utils'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Camera, Video } from 'lucide-react'
import React, { Suspense, useEffect, useState } from 'react'
import { useContext } from 'react'
import ReactPlayer from 'react-player/youtube'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'

export default function VideoPage() {
    const {id} = useParams();
    const course_id = id;
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const {state , dispatch} = useContext(Store);
    const {csc_user} = state;

    const [showReply , setShowReply] = useState(false);

    const {isLoading , isError, data:videos} = useQuery({ 
        queryKey: ['videos',{course_id}], 
        queryFn: async ()=>{
            try {
                const response = await axios.get(`${proxy}/api/video/course/${course_id}`);
                return response.data;
            } catch (error) {
                throw error;
            }
        },
        cacheTime : 0
    });
    const {isLoading:loading2 , isError:error2, data:course} = useQuery({ 
        queryKey: ['course',{course_id}], 
        queryFn: async ()=>{
            try {
                const response = await axios.get(`${proxy}/api/course/${course_id}`);
                return response.data;
            } catch (error) {
                throw error;
            }
        },
        cacheTime : 0

    });
    const videoId = queryParams.get("video") ? queryParams.get("video") : ( videos ? videos[0].id : "") ;

    const user_id = csc_user.user.id;
    const {isLoading:loading3 , isError:error3, data:coursesBelongToUser} = useQuery({ 
        queryKey: ['coursesBelongToUser',{course_id}], 
        queryFn: async ()=>{
            try {
                const response = await axios.get(`${proxy}/api/course/user/${user_id}`);
                return response.data;
            } catch (error) {
                throw error;
            }
        },
        cacheTime:0
    });
    const isPaid = coursesBelongToUser?.find((x)=>x.course_id == course_id);

    const navigate = useNavigate();
    useEffect(()=>{
        if ( coursesBelongToUser?.length == 0 && course?.type=="paid") {
            navigate("/notpurchased");
        }
    },[isPaid,course,coursesBelongToUser]);


    if ( isLoading || loading2 || loading3 ) {
        return <Loading />
    }

  return (
    <>
        <Navbar />
            <div className='flex flex-wrap justify-center gap-3 mt-3 px-3 '>
                <div className='player-wrapper w-[360px]  md:w-[600px] flex flex-col gap-3'>
                    <div>
                        <p className='text-lg font-bold'>{course?.title}</p>
                        <p>{course?.desc}</p>
                    </div>
                    <ReactPlayer
                        className='react-player'
                        url={videos?.filter((item)=>item.id==videoId)[0].v_link}
                        controls={true}
                        width='100%'
                        />
                    <div>
                        <h1 className='font-bold text-lg'>Comments</h1>
                        <div className='relative mt-3'>
                            <Textarea placeholder="Type your message here." />
                            <Button className="absolute right-3 bottom-3 w-12 h-12 rounded-full">Go</Button>
                        </div>
                        <div className='mt-6'>
                            <div>
                                <div className='flex gap-3 items-center'>
                                    <h1 className='font-bold text-sm'>Hong Nnureach</h1>
                                    <p className='text-xs'>12/02/2025</p>
                                </div>
                                <div>
                                    <p className='text-xs'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure odit, soluta perspiciatis aut dolore, omnis architecto eveniet praesentium voluptate harum alias impedit porro! Nihil impedit ratione corrupti quia consectetur asperiores!</p>
                                </div>
                                <div className='mt-3 flex gap-6'>
                                    <button onClick={()=>{setShowReply(!showReply)}} className="text-xs underline">Reply</button>
                                    <button className="text-xs underline">Delete</button>
                                </div>
                                {
                                    showReply &&
                                    <div>
                                        <div className='relative mt-3'>
                                            <Textarea placeholder="Type your message here." />
                                            <Button className="absolute right-3 bottom-3 w-12 h-12 rounded-full">Go</Button>
                                        </div>
                                    </div>
                                }
                                <div className='ml-9 mt-3'>
                                    <div>
                                        <div className='flex gap-3 items-center'>
                                            <h1 className='font-bold text-sm'>Admin</h1>
                                            <p className='text-xs'>12/02/2025</p>
                                        </div>
                                        <div>
                                            <p className='text-xs'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Mollitia eaque dolorum soluta facilis ipsum accusantium sequi est iure, aliquid animi delectus veritatis itaque. Obcaecati, nemo distinctio! Architecto necessitatibus possimus dignissimos!</p>
                                        </div>     
                                        <div className='mt-3 flex gap-6'>
                                            <button className="text-xs underline">Delete</button>
                                        </div>  
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className=' w-[360px]  md:w-[600px] lg:w-[450px] '>
                    <h1 className='font-bold text-lg'>Content</h1>
                    <div className='flex flex-col gap-3'>
                        {
                            videos?.map((item,i)=>(
                                <div key={i} className={videoId == item.id ? 'space-y-1 border-b bg-gray-200 p-2 rounded-lg' : 'space-y-1 border-b p-2 rounded-lg' }>
                                    <Link to={`/video/${id}?video=${item.id}`} className='capitalize font-bold'>{item.v_title}</Link>
                                    <p className='capitalize line-clamp-2 text-sm'>{item.v_description}</p>
                                    <div className='py-3 flex flex-wrap gap-3'>
                                        <Link className='text-xs bg-black text-white p-2 rounded-sm'  to={'/'}>Resourse</Link>
                                        <Link className='text-xs bg-black text-white p-2 rounded-sm'  to={'/'}>Resourse</Link>
                                    </div>
                                    <div className='flex gap-3 items-center'>
                                        <Video />
                                        <p className='text-sm'>{item.v_duration} min</p>
                                    </div>
                                </div>
                                
                            ))
                        }
                    </div>
                </div>

            </div>
        <Footer />
    </>
  )
}
