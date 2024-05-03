import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/Components/ui/form'
import { Input } from '@/Components/ui/input';
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from '@/Components/ui/button';
import { Link } from 'react-router-dom';



  

export default function Signup() {
  
    const formSchema = z.object({
        name: z.string().min(1,{
            message: " Name must be at least 1 characters.",
          }),
        email: z.string().email({
          message: "Invalid email address.",
        }),
        password: z.string().min(6, {
          message: "Password must be at least 6 characters.",
        }),
        confirm_password: z.string().min(6, {
            message: "Password must be at least 6 characters.",
          }),
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
            name : "",
            email: "",
            password : ""
          },
      })
    
    const onSubmit = (data) => {
    console.log(data)
    }
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
                <Link to={"/signin"} className='mb-3 hover:underline'>Already have an account ?</Link>
                <Button type="submit">Register</Button>
            </div>
        </form>
        </Form>
    </div>
</div>
  )
}
