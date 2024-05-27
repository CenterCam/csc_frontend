import { Edit, Trash, Trash2 } from 'lucide-react'
import React, { useContext, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
  
import { Input } from '../ui/input';
import MyPagination from '../Pagination/MyPagination';
import { Store } from '@/Utils/Store'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { proxy } from '@/Utils/Utils'
import axios from 'axios'
import Loading from '../ui/Loading'
import { toast } from 'sonner'
import { Select, SelectContent, SelectItem, SelectTrigger } from '../ui/select';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog';
  

export default function UserTable() {
    const location = useLocation(); 
    const queryParams = new URLSearchParams(location.search);
    const search = queryParams.get("search") || "all";
    const sortBy = queryParams.get("sortBy") || "created_at";
    const sortDir = queryParams.get("sortDir") || "desc";
    const page =  queryParams.get("page") || 1;
    const {state , dispatch} = useContext(Store);
    const {csc_user} = state;
    const queryClient = useQueryClient();
    const {isLoading , isError, data} = useQuery({ 
        queryKey: ['users',{search,sortBy,sortDir}], 
        queryFn: async ()=>{
            try {
                const response = await axios.get(`${proxy}/api/user/pagination/${search}/${sortBy}/${sortDir}?page=${page}`,{
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
    const { isPending , mutateAsync : deleteUserMutation } = useMutation({
        mutationFn : async (id)=>{
          try {
            const response = await axios.delete(`${proxy}/api/deleteUser/${id}`,
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
          toast.success("User is deleted successfully");
        },
        onError : (err) => {
          toast.error(err.response.data.message);
        }
      })
  return (
    <>
    <div className='flex justify-between mt-6 flex-wrap gap-3'>
        <div>
            <Input className="w-full sm:w-96" onChange={(e)=>navigate(`/dashboard/user?search=${e.target.value}&&sortBy=${sortBy}&&sortDir=${sortDir}&&page=${page}`)} type="text"  placeholder="Search..." />
        </div>
        <Select onValueChange={(value)=>navigate(`/dashboard/user?search=${search}&&sortBy=${sortBy}&&sortDir=${value}&&page=${page}`)}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={sortDir == "desc" ? "Newest" : "Oldest"} />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="desc" >Newest</SelectItem>
                <SelectItem value="asc" >Oldest</SelectItem>
            </SelectContent>
        </Select>
    </div>
    <div className='p-6 border rounded-lg mt-6'>
        <div className='flex font-bold text-lg justify-between gap-3 border-b pb-3'>
            <div className='w-9 text-nowrap overflow-hidden text-ellipsis'>ID</div>
            <div className='w-36 text-nowrap overflow-hidden text-ellipsis'>Name</div>
            <div className='w-36 md:w-48 text-nowrap overflow-hidden text-ellipsis hidden lg:block'>Email</div>
            <div className='w-36 text-nowrap overflow-hidden text-ellipsis'>Role</div>
            {/* <div className='w-20 text-nowrap overflow-hidden text-ellipsis hidden lg:block'>Status</div> */}
            <div className='flex justify-center w-20'>Action</div>
        </div>
        <div className='mt-3 gap-9 capitalize flex flex-col'>
            {
                isLoading && <Loading />
            }   
            {
                data && data?.data.length == 0 ? 
                <div className='w-full h-24 flex justify-center items-center'>
                    <h1 className='font-bold'>No Item!!</h1>
                </div>
                :
                data?.data.map((item,i)=>(
                    <div key={i} className='flex text-sm justify-between gap-3 items-center'>
                        <div className='w-9 text-nowrap overflow-hidden text-ellipsis'>{i+1}</div>
                        <div className='w-36 '>{item.name}</div>
                        <div className='w-36 md:w-48 text-nowrap overflow-hidden text-ellipsis hidden lg:block'>{item.email}</div>
                        <div className='w-36 text-nowrap overflow-hidden text-ellipsis'>{item.role}</div>
                        {/* <div className='w-20 text-nowrap overflow-hidden text-ellipsis hidden lg:block'>{item.status}</div> */}
                        <div className='flex justify-center w-20 gap-1'>
                            <Link to={`/dashboard/user/edit/${item.id}`}><Edit /></Link>
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
                                    <AlertDialogAction onClick={()=>deleteUserMutation(item.id)} className="bg-red-600 hover:bg-red-500">Continue</AlertDialogAction>
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
            url = {`/dashboard/user/?search=${search}&&sortBy=${sortBy}&&sortDir=${sortDir}`}
            links = {data?.links}
            total = {data?.total}
            current = {data?.to}
        />
    </div>
    </>
  )
}
