import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
  

export default function CountryDailog({isOpen,setOpen}) {

  
  const formSchema = z.object({
    name: z.string().min(1,{
      message: "Name must be at least 1 characters",
    }),
    image_link: z.string().url(),
    status : z.string()
  })

  const form = useForm({
      resolver: zodResolver(formSchema),
      defaultValues: {
          name: "",
          image_link : "",
          status : ""
        },
    })

    const onSubmit = async (data) => {
      console.log(data);
     }
     

  return (
    <>
        <Dialog open={isOpen} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Create Country</DialogTitle>
                <Form {...form} className="space-y-8 flex flex-col mt-9">
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                          <FormItem>
                              <FormLabel>Name</FormLabel>
                              <FormControl>
                                  <Input placeholder="Country Name" {...field} />
                              </FormControl>
                              <FormMessage />
                          </FormItem>
                      )}
                      />
                      <FormField
                      control={form.control}
                      name="image_link"
                      render={({ field }) => (
                          <FormItem>
                              <FormLabel>Image Link</FormLabel>
                              <FormControl>
                                  <Input type="text" placeholder="Image Link" {...field} />
                              </FormControl>
                              <FormMessage />
                          </FormItem>
                      )}
                      />
                      <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                          <FormItem>
                              <FormLabel>Status</FormLabel>
                              <FormControl>
                                  <Input type="text" placeholder="Status" {...field} />
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
