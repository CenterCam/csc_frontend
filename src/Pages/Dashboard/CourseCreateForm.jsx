import React, { useContext, useState } from 'react'
import NavbarDashboard from '../../Components/Dashboard-Navbar/NavbarDashboard'
import Footer from '../../Components/Frontend-Footer/Footer'
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/Components/ui/form';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { proxy } from '@/Utils/Utils';
import { Store } from '@/Utils/Store';
import { toast } from 'sonner';


export default function CourseCreateForm() {

    const formSchema = z.object({
        title: z.string().min(6,{
                message: "Title must be at least 6 characters.",
        }),
        shortDescription: z.string().min(18,{
                message: "Description must be at least 18 characters.",
        }),
        type: z.string().min(3,{
                message: " Type must be Required.",
        }),
        status: z.string().min(3,{
                message: " Status must be at Required.",
        }),
        duration: z.string().min(1,{
                message: "Duration must be Required",
        }),
        cost:  z.string()
        .transform(v => parseFloat(v))
        .refine( v => v > 0 , {message:"Cost Must Be Greater than 0"}),
        price:  z.string()
        .transform(v => parseFloat(v))
        .refine( v => v > 0 , {message:"Price Must Be Greater than 0"}),
        discount:  z.string()
        .transform(v => parseFloat(v))
        .refine( v => v >= 0 && v <= 100 , {message:"Discount Must Be From 0 to 100"}),
        
        image_url: z.string().url(),
      })
      const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title :  "",
            shortDescription :"",
            type:"",
            status : "",
            cost : "",
            duration :"",
            price :"",
            discount :"",
            image_url :"",
          },
      })

    const queryClient = useQueryClient();
    const navigate = useNavigate();
    
    const {state , dispatch} = useContext(Store);
    const {csc_user} = state;

    const onSubmit = async (data) => {
        console.log(data);
        await createCourseMutation(data);
        }

    const { isPending , mutateAsync : createCourseMutation } = useMutation({
    mutationFn : async (state)=>{
        try {
        const response = await axios.post(`${proxy}/api/courses/create`,
            {
                title :  state.title,
                desc : state.shortDescription,
                image : state.image_url,
                price : state.price,
                cost : state.cost,
                discount : state.discount,
                duration : state.duration,
                user_id : csc_user.user.id,
                type : state.type
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
        queryClient.invalidateQueries(['courses']);
        toast.success("Course is Created Successfully");
        navigate('/dashboard/course')
        form.reset();
    },
    onError : (err) => {
        toast.error(err.response.data.message);
    }
    })
  return (
    <div>
        <NavbarDashboard />
        <div className='p-3 w-full flex justify-center items-center'>
            <div className=" w-full md:w-1/2 ">
                <p className="my-3 font-bold text-black text-3xl" >Create Course</p>
                <Form {...form} className="space-y-8 flex flex-col">
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input placeholder="Title" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="shortDescription"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Short Description</FormLabel>
                            <FormControl>
                                <Input placeholder="Short Description" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger>
                                <SelectValue placeholder="Select a verified type to display" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="Free">Free</SelectItem>
                                <SelectItem value="Paid">Paid</SelectItem>
                            </SelectContent>
                            </Select>
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
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="inactive">Inactive</SelectItem>
                            </SelectContent>
                            </Select>
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
                                <Input placeholder="Duration" {...field} />
                                </FormControl>
                                <FormMessage />
                        </FormItem>
                        )}
                        />
                <FormField
                    control={form.control}
                    name="cost"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Cost</FormLabel>
                            <FormControl>
                                <Input placeholder="Cost" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    />
                <FormField
                    control={form.control}
                    name="discount"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Discount</FormLabel>
                            <FormControl>
                                <Input placeholder="Discount"  {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    />
                <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Price</FormLabel>
                            <FormControl>
                                <Input placeholder="Price" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    />
                <FormField
                    control={form.control}
                    name="image_url"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Image Url</FormLabel>
                            <FormControl>
                                <Input placeholder="Image Url" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    />
                                
                    <div className='flex flex-col'>
                        <Button type="submit">Creacte Course</Button>
                    </div>
                </form>
                </Form>
            </div>
        </div>
        <Footer />
    </div>
  )
}
