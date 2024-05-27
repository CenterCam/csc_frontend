import React, { useContext } from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { proxy } from '@/Utils/Utils'
import { Store } from '@/Utils/Store'
import { toast } from 'sonner'
import { useParams } from 'react-router-dom'
  

export default function VideoUpdateDailog({isOpen,setOpen}) {

  const {state , dispatch} = useContext(Store);
  const {csc_user} = state;
  const {id} = useParams();
  
  const queryParams = new URLSearchParams(location.search);
  
  const videoId = queryParams.get("video");


  const queryClient =useQueryClient();

  const {isLoading , isError, data:video} = useQuery({ 
    queryKey: ['video',{videoId}], 
    queryFn: async ()=>{
        try {
            const response = await axios.get(`${proxy}/api/videos/${videoId}`,
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
        }
    });
  
  const formSchema = z.object({
    title: z.string().min(3,{
      message: "title must be at least 3 characters",
    }),
    video_link: z.string().url(),
    duration:  z.string()
    .transform(v => parseFloat(v))
    .refine( v => v > 0 , {message:"Duration Must Be Greater than 0"}),
    description: z.string().min(6,{
    message: "Description must be at least 6 characters",
    }),
  })

  const form = useForm({
      resolver: zodResolver(formSchema),
      values: {
          title: video?.v_title || "",
          duration : video?.v_duration.toString() || "",
          video_link : video?.v_link || "",
          description: video?.v_description || "",
        },
    })


  const onSubmit = async (data) => {
      await updateVideoMutation(data);
    }




  const { isPending : updatePending , mutateAsync : updateVideoMutation } = useMutation({
    mutationFn : async (state)=>{
      try {
        const response = await axios.put(`${proxy}/api/videos/update/${videoId}`,
          {
              v_title : state.title,
              v_duration : state.duration,
              v_link : state.video_link,
              v_description : state.description,
              course_id : id,
              user_id : csc_user.user.id,
          }
          ,
          {
            headers : {
              authorization : `Bearer ${csc_user.token}`
          }
          }
        )  
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    onSuccess : () => {
      queryClient.invalidateQueries(['videos']);
      toast.success("Video is Updated Successfully");
      setOpen(false);
      form.reset();
    },
    onError : (err) => {
      toast.error(err.response.data.message);
    }
  })
  return (
    <>
        <Dialog open={isOpen} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Update Video</DialogTitle>
                <Form {...form} className="space-y-8 flex flex-col mt-9">
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                          <FormItem>
                              <FormLabel>Title</FormLabel>
                              <FormControl>
                                  <Input placeholder="Video Title" {...field} />
                              </FormControl>
                              <FormMessage />
                          </FormItem>
                      )}
                      />
                      <FormField
                      control={form.control}
                      name="video_link"
                      render={({ field }) => (
                          <FormItem>
                              <FormLabel>Video Link</FormLabel>
                              <FormControl>
                                  <Input type="text" placeholder="Video Link" {...field} />
                              </FormControl>
                              <FormMessage />
                          </FormItem>
                      )}
                      />
                    <FormField
                      control={form.control}
                      name="duration"
                      render={({ field }) => (
                          <FormItem>
                              <FormLabel>Duration</FormLabel>
                              <FormControl>
                                  <Input type="text" placeholder="Video Duration" {...field} />
                              </FormControl>
                              <FormMessage />
                          </FormItem>
                      )}
                      />
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                          <FormItem>
                              <FormLabel>Video Description</FormLabel>
                              <FormControl>
                                  <Input type="text" placeholder="Video Description" {...field} />
                              </FormControl>
                              <FormMessage />
                          </FormItem>
                      )}
                      />
                      <div className='flex flex-col'>
                          <Button disabled={updatePending} type="submit">Update</Button>
                      </div>
                  </form>
                  </Form>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    </>
  )
}
