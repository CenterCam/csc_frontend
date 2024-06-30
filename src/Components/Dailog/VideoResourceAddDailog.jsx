import React, { useContext } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Store } from '@/Utils/Store'
import { useParams } from 'react-router-dom'
  

export default function VideoReourseAddDailog({isOpen,setOpen}) {

  const {state , dispatch} = useContext(Store);
  const {csc_user} = state;
  const {id} = useParams();
  
  const queryParams = new URLSearchParams(location.search);
  
  const videoId = queryParams.get("video");
  
  const formSchema = z.object({
    link: z.string().url(),
  })

  const form = useForm({
      resolver: zodResolver(formSchema),
      defaultValues: {
          link: "",
        },
    })

    const onSubmit = async (data) => {
      console.log(data);
     }

    console.log(videoId,id); 
     

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
