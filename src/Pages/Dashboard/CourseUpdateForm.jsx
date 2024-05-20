import React, { useContext, useEffect, useState } from 'react'
import NavbarDashboard from '../../Components/Dashboard-Navbar/NavbarDashboard'
import Footer from '../../Components/Frontend-Footer/Footer'
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/Components/ui/form';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { proxy } from '@/Utils/Utils';
import { Store } from '@/Utils/Store';
import { toast } from 'sonner';
import Loading from '@/Components/ui/Loading';
import VideoDailog from '@/Components/Dailog/VideoDailog';
import { Edit, Trash } from 'lucide-react';
import VideoForm from '@/Components/Form/VideoForm';


export default function CourseCreateForm() {

    const {id} = useParams();
    const [open,setOpen] = useState(false);


    const {state , dispatch} = useContext(Store);
    const {csc_user} = state;
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const {isLoading , isError, data:course} = useQuery({ 
        queryKey: ['course',{id}], 
        queryFn: async ()=>{
            try {
                const response = await axios.get(`${proxy}/api/courses/${id}}`,{
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
    
    const {isLoading : videosLoading , isError : videoError, data:videos} = useQuery({ 
        queryKey: ['videos'], 
        queryFn: async ()=>{
            try {
                const response = await axios.get(`${proxy}/api/videos/course/${id}}`,{
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
        });

    const form = useForm({
        resolver: zodResolver(formSchema),
        values: {
            title :  course?.title,
            shortDescription : course?.desc,
            type: course?.type,
            cost : course?.cost,
            discount : course?.discount,
            price : course?.price,
            duration : course?.duration,
            image_url : course?.image,
            },
    })
    const { watch, setValue } = form;

    const cost = watch('cost');
    const discount = watch('discount');

    useEffect(() => {
        if (cost && discount) {
            const discountedPrice = cost - (cost * discount) / 100;
            setValue('price',  discountedPrice.toFixed(2).toString());
        }
    }, [cost, discount, setValue]);


    const onSubmit = async (data) => {
        console.log(data);
        await updateCourseMutation(data);
    }

    const { isPending , mutateAsync : updateCourseMutation } = useMutation({
        mutationFn : async (state)=>{
            try {
            const response = await axios.put(`${proxy}/api/courses/update/${id}`,
                {
                    title :  state.title,
                    desc : state.shortDescription,
                    type: state.type,
                    cost : state.cost,
                    duration : state.duration,
                    price : state.price,
                    discount : state.discount,
                    image: state.image_url,
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
        onSuccess : (res) => {
            queryClient.invalidateQueries(['course']);
            toast.success(res.message);
        },
        onError : (err) => {
            toast.error(err.response.data.message);
        }
    })

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

  return (
    <div>
        <NavbarDashboard />
        <div className='p-3 w-full flex justify-center items-center'>
            <div className=" w-full md:w-1/2 ">
                <p className="my-3 font-bold text-black text-3xl" >Update Course</p>
                {
                    isLoading ? 
                    <Loading />
                    :
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
                                <SelectValue placeholder={course?.type} />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="free">Free</SelectItem>
                                <SelectItem value="paid">Paid</SelectItem>
                                <SelectItem value="disabled">Disabled</SelectItem>
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
                                <Input disabled placeholder="Price" {...field} />
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
                }
                <div className=" w-full mt-9 ">
                    <div className='flex gap-6 items-center'>
                        <p className="my-3 font-bold text-black text-3xl" >Videos </p>
                        <Button  onClick={ ()=>setOpen(true) }>ADD</Button>
                        <VideoDailog isOpen={open} setOpen={setOpen} />
                    </div>
                    <VideoForm videos={videos} />
                </div>
            </div>
        </div>
        <Footer />
    </div>
  )
}
