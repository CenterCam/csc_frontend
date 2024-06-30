import { Store } from '@/Utils/Store';
import { proxy } from '@/Utils/Utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Edit, Plus, Trash } from 'lucide-react'
import React, { useContext, useState } from 'react'
import { toast } from 'sonner';
import { useNavigate, useParams } from 'react-router-dom';
import VideoUpdateDailog from '../Dailog/VideoUpdateDailog';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import VideoReourseAddDailog from '../Dailog/VideoResourceAddDailog';

export default function VideoForm({videos}) {

    const [open,setOpen] = useState(false);

    const [open1,setOpen1] = useState(false);

    const navigate = useNavigate();

    const {id} = useParams();

    
    const queryParams = new URLSearchParams(location.search);
    const videoId = queryParams.get("video") || null;

    const {state , dispatch} = useContext(Store);
    const {csc_user} = state;
    const queryClient = useQueryClient();
    const { isPending : deletePending , mutateAsync : deleteVideoMutation } = useMutation({
        mutationFn : async (id)=>{
          try {
            const response = await axios.delete(`${proxy}/api/videos/delete/${id}`,
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
        onSuccess : (res) => {
          queryClient.invalidateQueries(['videos']);
          toast.success("Video is deleted successfully");
        },
        onError : (err) => {
          toast.error(err.response.data.message);
        }
      })

    const video =videos?.filter((item)=>item.id==videoId)[0] || null;

    console.log(video);

  return (
    <div className='mt-3'>
        <div className='flex justify-between font-bold gap-3 p-1'>
            <div className='w-9'>ID</div>
            <div className='w-24 text-nowrap overflow-hidden text-ellipsis'>Title</div>
            <div className='w-24 text-nowrap overflow-hidden text-ellipsis'>Duration</div>
            <div className='w-24 flex justify-center'>Action</div>
        </div>
        {
            videos?.length == 0 ?
            <div className='w-full h-24 flex justify-center items-center'>
                <h1 className='font-bold'>No Item!!</h1>
            </div> :
            videos?.map((item,i)=>(
              <div key={i}>
                <div>
                  <div className='flex justify-between  gap-3 py-3 items-center border-b'>
                      <div className='w-9'>{i+1}</div>
                      <div className='w-24 text-nowrap overflow-hidden text-ellipsis capitalize flex gap-1 items-center'>
                        <p>{item.v_title}</p>
                      </div>
                      <div className='w-24 text-nowrap overflow-hidden text-ellipsis'>
                      {item.v_duration} mn
                      </div>
                      <div  className='w-24 cursor-pointer flex items-center gap-3 justify-center'>
                          <button onClick={()=>{
                            setOpen(!open);
                            navigate(`/dashboard/course/edit/${id}?video=${item.id}`)
                            }}>
                              <Edit />      
                          </button>
                          <VideoUpdateDailog isOpen={open} setOpen={setOpen}  />
                          <button disabled={deletePending} onClick={(e)=>deleteVideoMutation(item.id)}>
                              <Trash />
                          </button>
                          <button onClick={()=>{
                              setOpen1(!open1)
                              navigate(`/dashboard/course/edit/${id}?video=${item.id}`)
                            }
                            }>
                            <Plus />
                          </button>
                      </div>
                  </div>
                </div>
                <div className='pl-3 mt-3 '>
                  <div className='flex gap-3 pb-3 border-b'>
                    <p>{i+1}</p>
                    <p>Resource</p>
                    <button>Delete</button>
                  </div>
                  <VideoReourseAddDailog isOpen={open1} setOpen={setOpen1} />
                </div>
              </div>
            ))
        }
    </div>
  )
}
