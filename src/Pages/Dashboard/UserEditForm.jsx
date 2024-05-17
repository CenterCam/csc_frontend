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
import { useParams } from 'react-router-dom';
import { users } from '@/Components/Table/RandomUser';
import { Store } from '@/Utils/Store';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { proxy } from '@/Utils/Utils';
import Loading from '@/Components/ui/Loading';
import { data } from 'autoprefixer';

export default function UserCreateForm() {
    const {id} = useParams();

    const {state , dispatch} = useContext(Store);
    const {csc_user} = state;
    const queryClient = useQueryClient();

    const { data:user} = useQuery({ 
        queryKey: ['user',{id}], 
        queryFn: async ()=>{
            try {
                const response = await axios.get(`${proxy}/api/user/${id}`,{
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
        name: z.string().min(1,{
            message: " Name must be at least 1 characters.",
          }),
        email: z.string().email({
          message: "Invalid email address.",
        }),
        role: z.string().default("user"),
        password: z.string(),
        confirm_password: z.string(),
      }).refine(
        (values) => {
          return values.password === values.confirm_password;
        },
        {
          message: "Passwords must match!",
          path: ["confirm_password"],
        }
      );
      const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name : user?.name  ,
            email:  user?.email  ,
            role :  user?.role ,
            password : "",
            confirm_password : "",
          },
      })


      const onSubmit = async (data)=>{
        console.log(data);
      }
  return (
    <div>
        <NavbarDashboard />
        <div className='p-3 w-full flex justify-center items-center'>
            <div className=" w-full md:w-1/2 ">
                <p className="my-3 font-bold text-black text-3xl" >Update User</p>
                {
                    !user ? 
                    <Loading />
                    :
                    <Form {...form} className="space-y-8 flex flex-col">
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="Email" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                            control={form.control}
                            name="role"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Role</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                    <SelectValue placeholder="Select a verified role to display" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="user">User</SelectItem>
                                    <SelectItem value="admin">Admin</SelectItem>
                                </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="Password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="confirm_password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="Confirm Password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                        <div className='flex flex-col'>
                            <Button type="submit">Update User</Button>
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
