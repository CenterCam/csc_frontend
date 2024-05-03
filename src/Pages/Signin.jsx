import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/Components/ui/form'
import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { z } from 'zod';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { useMutation } from '@tanstack/react-query';

export default function Signin() {
  const navigate = useNavigate();

  const formSchema = z.object({
    email: z.string().email({
      message: "Invalid email address.",
    }),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
  })

  const form = useForm({
      resolver: zodResolver(formSchema),
      defaultValues: {
          email: "",
          password : ""
        },
    })

const onSubmit = async (data) => {
 await signInMutation(data);
}

const { mutateAsync : signInMutation } = useMutation({
  mutationFn : async (state)=>{
    try {
      const response = await axios.post(`${proxy}/api/login`,
        {
          email : state.email,
          password : state.password
        }
      ) ;
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  onSuccess : (response) => {
    Cookies.set('csc_token', JSON.stringify(response.data) , { expires: 7 });
    navigate("/")
    toast.success("Sign In Successfully");
  },
  onError : (err) => {
    toast.error(err.response.data.message);
  }
})

  return (
    <div className='bg-gray-100 h-screen flex justify-center items-center'>
        <div className='w-96 p-6 shadow-lg rounded-lg bg-white xl:w-1/3'>
        <div className="flex items-center space-x-3 mb-6">
            <a href="/">
                <img src="/logo.jpg" className="h-16" alt="" />
            </a>
            <h1 className="font-bold text-lg">Cambodia Scholarship Center</h1>
        </div>
        <Form {...form} className="space-y-8 flex flex-col">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
            <div className='flex flex-col'>
                <Link to={"/signup"} className='mb-3 hover:underline'>Click here to create an account ?</Link>
                <Button type="submit">Log In</Button>
            </div>
        </form>
        </Form>
        </div>
    </div>
  )
}
