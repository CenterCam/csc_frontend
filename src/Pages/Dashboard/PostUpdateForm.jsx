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
import { Label } from '@/Components/ui/label';
import Tiptap from '@/Components/text-editor/Tittap';
import { Popover, PopoverContent, PopoverTrigger } from '@/Components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/Components/ui/calendar';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { convertDateToLaravelFormat, convertLaravelFormatToDate, proxy } from '@/Utils/Utils';
import { useNavigate, useParams } from 'react-router-dom';
import { Store } from '@/Utils/Store';
import Loading from '@/Components/ui/Loading';
import { toast } from 'sonner';


export default function PostUpdateForm() {


    const {id} = useParams();

    const {data:countries} = useQuery({ 
        queryKey: ['countries'], 
        queryFn: async ()=>{
            try {
                const response = await axios.get(`${proxy}/api/countries`,{
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

    const { data:programs} = useQuery({ 
    queryKey: ['programs'], 
    queryFn: async ()=>{
        try {
            const response = await axios.get(`${proxy}/api/program`,{
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

    const {state , dispatch} = useContext(Store);
    const {csc_user} = state;
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const {isLoading , isError, data:post} = useQuery({ 
        queryKey: ['post',{id}], 
        queryFn: async ()=>{
            try {
                const response = await axios.get(`${proxy}/api/getPost/${id}}`,{
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
            message: " Title must be at least 6 characters.",
          }),
          shortDescription: z.string().min(60,{
            message: " Short Description must be at least 60 characters.",
          }),
        country: z.string().min(3,{
            message: " Country must be at least 3 characters.",
          }),
          program: z.string().min(3,{
            message: " Program must be at least 3 characters.",
          }),
          status: z.string().min(3,{
            message: " Country must be at least 3 characters.",
          }),
          category: z.string().min(3,{
            message: " Category must be at least 3 characters.",
          }),
          image_url: z.string().url(),
          content: z.string().default(""),
          deadline: z.date()
      })
    const form = useForm({
    resolver: zodResolver(formSchema),
    values: {
        title :  post?.title,
        shortDescription : post?.shortDescription,
        country: post?.country,
        program : post?.program,
        status :  post?.status,
        category : post?.category,
        image_url : post?.imgLink,
        content : post?.content,
        deadline : post?.deadline ? new Date(post?.deadline) : post?.deadline,
        },
    })

    const [content , setContent] = useState(post?.content);

    const onSubmit = async (data) => {
        data.content = content;
        data.deadline = convertDateToLaravelFormat(data.deadline);
        console.log(data);
        await updatePostMutation(data);
       }
  
    const { isPending , mutateAsync : updatePostMutation } = useMutation({
    mutationFn : async (state)=>{
        try {
        const response = await axios.put(`${proxy}/api/updatePost/${id}`,
            {
                title :  state.title,
                shortDescription : state.shortDescription,
                country: state.country,
                program : state.program,
                status :  state.status,
                category : state.category,
                imgLink : state.image_url,
                content : state.content,
                deadline : state.deadline,
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
        queryClient.invalidateQueries(['posts']);
        toast.success("Post is Updated Successfully");
        navigate('/dashboard/post')
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
                <p className="my-3 font-bold text-black text-3xl" >Update Post</p>
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
                            name="country"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Country</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                    <SelectValue placeholder={post?.country} />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {
                                        countries?.data.map((item,i)=>(
                                            <SelectItem key={i} value={item.ct_name}>{item.ct_name}</SelectItem>
                                        ))
                                    }
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
                                    <SelectValue placeholder={post?.status} />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="hot">Hot</SelectItem>
                                    <SelectItem value="new">New</SelectItem>
                                    <SelectItem value="normal">Normal</SelectItem>        
                                </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="program"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Program</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                    <SelectValue placeholder={post?.program} />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {
                                        programs?.programs.map((item,i)=>(
                                            <SelectItem key={i} value={item.name}>{item.name}</SelectItem>
                                        ))
                                    }
                                </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Category</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                    <SelectValue placeholder={post?.category} />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="post">Post</SelectItem>
                                    <SelectItem value="scholarship">Scholarship</SelectItem>
                                </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <FormField
                        control={form.control}
                        name="deadline"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                            <FormLabel>Deadline</FormLabel>
                            <Popover >
                                <PopoverTrigger asChild>
                                <FormControl>
                                    <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-full pl-3 text-left font-normal",
                                        !field.value && "text-muted-foreground"
                                    )}
                                    >
                                    {field.value ? (
                                        format(field.value, "PPP")
                                    ) : (
                                        <span>Pick a date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    disabled={(date) =>
                                    date < new Date() || date < new Date("1900-01-01")
                                    }
                                    initialFocus
                                />
                                </PopoverContent>
                            </Popover>
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

                        <div>
                            <Label htmlFor="content">Content</Label>
                            <Tiptap setDescription={setContent} data={post?.content} />
                        </div>
                    
                        <div className='flex flex-col'>
                            <Button type="submit">Update Post</Button>
                        </div>
                    </form>
                    </Form>

                }
            </div>
        </div>
        <Footer />
    </div>
  )
}
