import React, { useContext } from 'react'
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
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { proxy } from '@/Utils/Utils'
import { Store } from '@/Utils/Store'
import { toast } from 'sonner'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
  

export default function CountryDailog({isOpen,setOpen}) {

  const {state , dispatch} = useContext(Store);
  const {csc_user} = state;

  const queryClient =useQueryClient();
  
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
      await createCountryMutation(data);
     }

    const { mutateAsync : createCountryMutation } = useMutation({
      mutationFn : async (state)=>{
        try {
          const response = await axios.post(`${proxy}/api/countries`,
            {
              ct_name : state.name,
              ct_link : state.image_link,
              status : state.status 
            }
            ,
            {
              headers : {
                authorization : `Bearer ${csc_user.token}`
            }
            }
          )  
        } catch (error) {
          throw error;
        }
      },
      onSuccess : () => {
        queryClient.invalidateQueries(['data']);
        toast.success("Country Is Created Successfully");
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
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger>
                                <SelectValue placeholder="Select a verified status to display" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="normal">Normal</SelectItem>
                                <SelectItem value="popular">Popular</SelectItem>
                            </SelectContent>
                            </Select>
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
