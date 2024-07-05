import React, { useContext } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Store } from '@/Utils/Store'
import { useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { proxy } from '@/Utils/Utils'
import { toast } from 'sonner'
  

export default function VideoReourseAddDailog({isOpen,setOpen}) {

  const {state , dispatch} = useContext(Store);
  const {csc_user} = state;
  const {id} = useParams();
  const courseId = id;
  
  const queryParams = new URLSearchParams(location.search);
  
  const videoId = queryParams.get("video");

  
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  
  const formSchema = z.object({
    link: z.string().url(),
  })

  const form = useForm({
      resolver: zodResolver(formSchema),
      defaultValues: {
          link: "",
        },
    })

    const { isPending , mutateAsync : createVideoResource } = useMutation({
      mutationFn : async (state)=>{
          try {
          const response = await axios.post(`${proxy}/api/resource/create`,
              {
                  link :  state.link,
                  video_id : videoId,
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
          toast.success("Resource is Created Successfully");
          form.reset();
      },
      onError : (err) => {
          toast.error(err.response.data.message);
      }
      })
    const onSubmit = async (data) => {
      await createVideoResource(data);
      console.log(videoId,courseId,data.link); 
     }

     

  return (
    <>
        <Dialog open={isOpen} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Create Resource Link</DialogTitle>
                <Form {...form} className="space-y-8 flex flex-col mt-9">
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <FormField
                      control={form.control}
                      name="link"
                      render={({ field }) => (
                          <FormItem>
                              <FormLabel>Link</FormLabel>
                              <FormControl>
                                  <Input placeholder="Input Link" {...field} />
                              </FormControl>
                              <FormMessage />
                          </FormItem>
                      )}
                      />
                      <div className='flex flex-col'>
                          <Button type="submit">Submit</Button>
                      </div>
                  </form>
                  </Form>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    </>
  )
}
