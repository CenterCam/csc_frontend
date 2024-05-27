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
import { useNavigate, useParams } from 'react-router-dom';
import { Store } from '@/Utils/Store';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { proxy } from '@/Utils/Utils';
import Loading from '@/Components/ui/Loading';
import { data } from 'autoprefixer';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/Components/ui/dialog';
import { Trash } from 'lucide-react';

export default function UserCreateForm() {
    const {id} = useParams();

    const [isOpen , setOpen] = useState(false);

    const navigate = useNavigate();

    const formSchema = z.object({
        name: z.string().min(1,{
            message: " Name must be at least 1 characters.",
          }),
        email: z.string().email({
          message: "Invalid email address.",
        }),
        role: z.string(),
        password: z.string().nullable(),
        confirm_password: z.string().nullable(),
      }).refine(
        (values) => {
          return values.password === values.confirm_password;
        },
        {
          message: "Passwords must match!",
          path: ["confirm_password"],
        }
      );

      const {state , dispatch} = useContext(Store);
      const {csc_user} = state;
      const queryClient = useQueryClient();
  
      const { isLoading , data:user} = useQuery({ 
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

  
    
      const form = useForm({
        resolver: zodResolver(formSchema),
        values: isLoading ? {} : {
          name: user.name,
          email: user.email,
          role: user.role,
          password : null,
          confirm_password : null,
        },
      });
    
    const onSubmit = async (data) => {
    await updateUserMutation(data);
    }

    const { isPending , mutateAsync : updateUserMutation } = useMutation({
    mutationFn : async (state)=>{
        try {
        const response = await axios.put(`${proxy}/api/updateUser/${id}`,
            {
                name:state.name,
                email:state.email,
                role:state.role,
                password:state.password
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
        queryClient.invalidateQueries(['user']);
        toast.success("User is Updated Successfully");
        navigate("/dashboard/user");
        form.reset();
    },
    onError : (err) => {
        toast.error(err.response.data.message);
    }
    })


    const { isLoading: loading3 , data:allCourses} = useQuery({ 
        queryKey: ['allCourse'], 
        queryFn: async ()=>{
            try {
                const response = await axios.get(`${proxy}/api/courses`,{
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
    
    const user_id = user?.id;
    const [courseId , setCourseId] = useState(null);

    const {isLoading:loading2 , isError:error2, data:courses} = useQuery({ 
        queryKey: ['courses',{id:user?.id}], 
        queryFn: async ()=>{
            try {
                const response = await axios.get(`${proxy}/api/course/user/${user_id}`);
                return response.data;
            } catch (error) {
                throw error;
            }
        }
    });

    const hanldeAddUserCourse = async () => {
        await addCourseToStudent();
    }

    const { isPending : pending2 , mutateAsync : addCourseToStudent } = useMutation({
        mutationFn : async (state)=>{
            try {
            const response = await axios.post(`${proxy}/api/courses/add/user/${user_id}/${courseId}`,
            {}
            ,
            {
                headers : {
                    Authorization : `Bearer ${csc_user.token}`
                }
            });
            return response.data;
            } catch (error) {
            throw error;
            }
        },
        onSuccess : () => {
            queryClient.invalidateQueries(['user']);
            setOpen(!isOpen);
            toast.success("Course is added Successfully");
        },
        onError : (err) => {
            toast.error(err.response.data.message);
        }
        })

    const userLeaveCourse = async (course_id)=>{
        await deleteCourseFromUser(course_id);
    }

    const { isPending : pending3 , mutateAsync : deleteCourseFromUser } = useMutation({
        mutationFn : async (id)=>{
            console.log(id);
            try {
            const response = await axios.delete(`${proxy}/api/courses/delete/user/${id}`,
            {
                headers : {
                    Authorization : `Bearer ${csc_user.token}`
                }
            });
            return response.data;
            } catch (error) {
            throw error;
            }
        },
        onSuccess : () => {
            queryClient.invalidateQueries(['user']);
            toast.success("Leave course Successfully");
        },
        onError : (err) => {
            toast.error(err.response.data.message);
        }
        })


    return (
        <div>
    <NavbarDashboard />
    <div className='p-3 w-full flex flex-col justify-center items-center'>
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
                                <SelectValue placeholder={user?.role} />
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
                        <Button disabled={isPending} type="submit">Update User</Button>
                    </div>
                </form>
                </Form>
            }
        </div>
        <div className=" w-full md:w-1/2 mt-9">
            <div className='flex gap-3 items-center'>
                <p className="my-3 font-bold text-black text-3xl" >Course</p>
                <Button onClick={()=>setOpen(!isOpen)}>Add</Button>
                <Dialog open={isOpen} onOpenChange={setOpen}>
                    <DialogContent>
                        <DialogHeader>
                        <DialogTitle>Add Course To Student</DialogTitle>
                        </DialogHeader>
                        <Select onValueChange={(value)=>setCourseId(value)}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Please Select Course" />
                            </SelectTrigger>
                            <SelectContent>
                                {
                                    allCourses?.map((item,i)=>(
                                        <SelectItem key={i} value={item.id} >{item.title}</SelectItem>
                                    ))
                                }
                            </SelectContent>
                        </Select>
                        <Button onClick={hanldeAddUserCourse}>Submit</Button>
                    </DialogContent>
                </Dialog>
            </div>
            <div className='flex gap-3 flex-wrap w-full items-center justify-center mt-3'>
                {
                    courses?.length == 0 && <p>No Classes !!</p>
                }
                {
                    courses?.map((item,i)=>(
                        <div key={i} className='w-60 border-2 rounded-lg p-3 shadow-lg' >
                            <img className='w-full h-36 object-cover' src={item.image} alt="" />
                            <p>{item.title}</p>
                            <Button onClick={()=>userLeaveCourse(item.id)} className="bg-red-500 text-xs hover:bg-red-400">Remove</Button>
                        </div>
                    ))
                }
            </div>
        </div>
    </div>
    <Footer />
</div>
)
}
