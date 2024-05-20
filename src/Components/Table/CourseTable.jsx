import { Edit, Trash, Trash2 } from 'lucide-react'
import React, { useContext, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  
import { Input } from '../ui/input';
import MyPagination from '../Pagination/MyPagination';
import { Store } from '@/Utils/Store'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { proxy } from '@/Utils/Utils'
import Loading from '../ui/Loading'
  

export default function CourseTable({users}) {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const search = queryParams.get("search") || "all";
    const sortBy = queryParams.get("sortBy") || "created_at";
    const sortDir = queryParams.get("sortDir") || "desc";
    const page =  queryParams.get("page") || 1;
    const {state , dispatch} = useContext(Store);
    const {csc_user} = state;
    const queryClient = useQueryClient();
    const {isLoading , isError, data : courses} = useQuery({ 
        queryKey: ['courses',{search,sortBy,sortDir}], 
        queryFn: async ()=>{
            try {
                const response = await axios.get(`${proxy}/api/courses/${search}/${sortBy}/${sortDir}?page=${page}`,{
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

    const navigate = useNavigate();
    const { isPending , mutateAsync : deletePostMutation } = useMutation({
        mutationFn : async (id)=>{
          try {
            const response = await axios.delete(`${proxy}/api/courses/delete/${id}`,
              {
                headers : {
                  authorization : `Bearer ${csc_user.token}`
              }
            }
            );  
            return response.data;
        } catch (error) {
            throw error;
        }
        },
        onSuccess : () => {
          queryClient.invalidateQueries(['users']);
          toast.success("Course is deleted successfully");
        },
        onError : (err) => {
          toast.error(err.response.data.message);
        }
      })

      console.log(courses);
    
  return (
    <>
    <div className='flex justify-between mt-6 flex-wrap gap-3'>
        <div>
            <Input className="w-full sm:w-96" onChange={(e)=>navigate(`/dashboard/course?search=${e.target.value}&&sortBy=${sortBy}&&sortDir=${sortDir}&&page=${page}`)} type="text"  placeholder="Search..." />
        </div>
        <Select onValueChange={(value)=>navigate(`/dashboard/course?search=${search}&&sortBy=${sortBy}&&sortDir=${value}&&page=${page}`)}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={sortDir == "desc" ? "Newest" : "Oldest"}  />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="desc" >Newest</SelectItem>
                <SelectItem value="asc" >Oldest</SelectItem>
            </SelectContent>
        </Select>
    </div>
    <div className='p-6 border rounded-lg mt-6'>
        <div className='flex font-bold text-lg cursor-pointer justify-between gap-3 border-b pb-3'>
            <div className='w-9 text-nowrap overflow-hidden text-ellipsis'>ID</div>
            <div className='w-36 text-nowrap overflow-hidden text-ellipsis'>Title</div>
            <div className='w-36 md:w-48 text-nowrap overflow-hidden text-ellipsis hidden lg:block'>Type</div>
            <div className='w-36 text-nowrap overflow-hidden text-ellipsis'>Price</div>
            <div className='w-20 text-nowrap overflow-hidden text-ellipsis hidden lg:block'>Discout</div>
            <div className='flex justify-center w-20'>Action</div>
        </div>
        <div className='mt-3 gap-9 capitalize flex flex-col'>
            {
                isLoading ? 
                <Loading />
                :
                courses?.data.map((item,i)=>(
                    <div key={i} className='flex text-sm justify-between gap-3 items-center'>
                        <div className='w-9 text-nowrap overflow-hidden text-ellipsis'>{i+1}</div>
                        <div className='w-36 '>{item.title}</div>
                        <div className='w-36 md:w-48 text-nowrap overflow-hidden text-ellipsis hidden lg:block'>{item.type}</div>
                        <div className='w-36 text-nowrap overflow-hidden text-ellipsis'>${item.price}</div>
                        <div className='w-20 text-nowrap overflow-hidden text-ellipsis hidden lg:block'>{item.discount}%</div>
                        <div className='flex justify-center w-20 gap-1'>
                            <Link to={`/dashboard/course/edit/${item.id}`}><Edit /></Link>
                            <AlertDialog>
                                <AlertDialogTrigger><Trash /></AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will permanently delete your account
                                        and remove your data from our servers.
                                    </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={()=>alert(item.id)} className="bg-red-600 hover:bg-red-500">Continue</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                                </AlertDialog>
                        </div>
                    </div>
                ))
            }
        </div>
    </div>
    <div className='w-full flex justify-end mt-3'>
        <MyPagination
            url = {`/dashboard/course/${search}/${sortBy}/${sortDir}`}
            links = {courses?.links}
            total = {courses?.total}
            current = {courses?.to}
         />
    </div>
    </>
  )
}
