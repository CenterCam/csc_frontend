import React, { useState } from 'react'
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


export default function PostUpdateForm() {

    const [content , setContent] = useState('');

    const formSchema = z.object({
        title: z.string().min(6,{
            message: " Title must be at least 6 characters.",
          }),
          shortDescription: z.string().min(18,{
            message: " Short Description must be at least 18 characters.",
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
          image_url: z.string().default(""),
          content: z.string().default(""),
      })
      const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title :  "",
            shortDescription :"",
            country:"",
            program : "",
            status :  "",
            category :"",
            image_url :"",
            content :"",
          },
      })

      const onSubmit = async (data)=>{
        data.content = content;
        console.log(data);
      }
  return (
    <div>
        <NavbarDashboard />
        <div className='p-3 w-full flex justify-center items-center'>
            <div className=" w-full md:w-1/2 ">
                <p className="my-3 font-bold text-black text-3xl" >Update Post</p>
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
                                <SelectValue placeholder="Select a verified role to display" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="cambodia">Cambodia</SelectItem>
                                <SelectItem value="singapor">Singarpore</SelectItem>
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
                        name="program"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Program</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger>
                                <SelectValue placeholder="Select a verified program to display" />
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
                        name="category"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Category</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger>
                                <SelectValue placeholder="Select a verified category to display" />
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
                    <div className="grid w-full gap-1.5">
                        <Label htmlFor="picture">Picture</Label>
                        <Input id="picture" type="file" />
                    </div>

                    <div>
                        <Label htmlFor="picture">Content</Label>
                        <Tiptap setDescription={setContent} />
                    </div>
                   
                    <div className='flex flex-col'>
                        <Button type="submit">Update Post</Button>
                    </div>
                </form>
                </Form>
            </div>
        </div>
        <Footer />
    </div>
  )
}
