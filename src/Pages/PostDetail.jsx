import React, { useContext } from 'react'
import Navbar from '../Components/Frontend-Navbar/Navbar'
import Footer from '../Components/Frontend-Footer/Footer'
import { Store } from '@/Utils/Store';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { proxy } from '@/Utils/Utils';
import { Link, useParams } from 'react-router-dom';
import Loading from '@/Components/ui/Loading';

export default function PostDetail() {
    const {id} = useParams();
    const {state , dispatch} = useContext(Store);
    const {csc_user} = state;
    const {isLoading , isError, data:post} = useQuery({ 
        queryKey: ['post',{id}], 
        queryFn: async ()=>{
            try {
                const response = await axios.get(`${proxy}/api/getPost/${id}`,{
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
    const {isLoading : postsNotInLoading, isError : postsNotInError, data:postsNotIn} = useQuery({ 
        queryKey: ['postsNotIn'], 
        queryFn: async ()=>{
            try {
                const response = await axios.get(`${proxy}/api/getPost/notIn/${id}`,{
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
    console.log(postsNotIn);
  return (
    <>
        {
            isLoading || postsNotInLoading ? 
            <Loading />
            :
            <div>
                <Navbar />
                <div className='flex px-6 lg:px-24'>
                    <section className='w-full p-3'>
                        <div className=" border-b font-bold text-xl mt-6 capitalize">{post?.title}</div>
                        <div className="mt-3">
                            <img
                            src={post?.imgLink}
                            alt="post-img"
                            className="w-full"
                            />
                        </div>
                        <div className=" ">
                            <div className=" pb-3 mt-3 ">
                                <div className="text-sm font-medium text-gray-400">
                                    <p>Post By : <span>Reach</span></p>
                                    <p>Create At : <span>{post?.created_at.slice(0,10)}</span></p>
                                    <p>Deadline : <span>{post?.deadline.slice(0,10)}</span></p>
                                </div>
                                <p className="my-6 capitalize">{post?.shortDescription}</p>
                                <div className="remove-all capitalize">
                                    <div dangerouslySetInnerHTML={{ __html: post?.content }} />
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className='p-3'>
                        <div className=" w-96 hidden lg:block">
                            <div className=" border-b font-bold text-xl mt-6">Related</div>
                            <div>
                                {
                                    postsNotIn.map((item,i)=>(
                                    <div key={i} className="border-b py-3">
                                        <Link to={`/postDetail/${item.id}`} className="font-bold text-sm capitalize hover:text-orange-500 cursor-pointer line-clamp-1">
                                            {item.title}
                                        </Link>
                                        <Link to={`/postDetail/${item.id}`} className="font-bold text-sm capitalize hover:text-orange-500 cursor-pointer line-clamp-1">
                                            {item.shortDescription}
                                        </Link>
                                        <div className="text-sm font-medium text-gray-400">
                                            <p>Post By : <span>Reach</span></p>
                                            <p>Create At : <span>{post?.created_at.slice(0,10)}</span></p>
                                            <p>Deadline : <span>{post?.deadline.slice(0,10)}</span></p>
                                        </div>
                                    </div>

                                    ))
                                }
                                <div className=" flex justify-end text-orange-600 font-bold text-xs mt-3 "><a href="search/seemore/bachelor">SEE MORE</a></div>
                            </div>
                        </div>
                    </section>
                </div>
                <Footer />
            </div>

        }
    </>
  )
}
