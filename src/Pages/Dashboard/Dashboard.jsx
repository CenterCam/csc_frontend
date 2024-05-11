import React, { useContext, useState } from 'react'
import Footer from '../../Components/Frontend-Footer/Footer'
import NavbarDashboard from '../../Components/Dashboard-Navbar/NavbarDashboard'
import CardDashbaord from '@/Components/Card/CardDashbaord';
import { AreaChart, Book, Code, Flag, HandCoins, Languages, Newspaper, User, UserCheck, Video } from 'lucide-react';
import CountryForm from '@/Components/Form/CountryForm';
import LanguageForm from '@/Components/Form/LanguageForm';
import ProgramForm from '@/Components/Form/ProgramForm';
import ServiceForm from '@/Components/Form/ServiceForm';
import StatusForm from '@/Components/Form/StatusForm';
import { useQuery } from '@tanstack/react-query';
import { proxy } from '@/Utils/Utils';
import { Store } from '@/Utils/Store';
import axios from 'axios';
import Loading from '@/Components/ui/Loading';

export default function Dashboard() {
    const {state , dispatch} = useContext(Store);
    const {csc_user} = state;
    const {isLoading , isError, data} = useQuery({ 
        queryKey: ['data'], 
        queryFn: async ()=>{
            try {
                const response = await axios.get(`${proxy}/api/dashboard`,{
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
      console.log(data);
  return (
    <div>
        <NavbarDashboard page={"/dashboard"} />
        {
            isLoading ? <Loading />
            :
            <div className=' flex flex-col  p-9 gap-9'>    
                <div>
                    <p className='font-bold text-3xl'>Dashboard</p>
                </div>
                <div className=' columns-1 break-after-column sm:columns-2 lg:columns-3 xl:columns-3 space-y-6 gap-6 '>
                    <CardDashbaord title={"Posts"} value={`+${data?.posts.length}`} icon={<Newspaper />} />
                    <CardDashbaord title={"Users"} value={`+${data?.users.length}`} icon={<User/>} />
                    <CardDashbaord title={"Courses"} value={`+${data?.courses.length}`} icon={<Book />} />
                    <CardDashbaord title={"Videos"} value={`+${data?.videos.length}`} icon={<Video/>} />
                    <CardDashbaord title={"Countries"} value={`+${data?.countries.length}`} icon={<Flag />} />
                    <CardDashbaord title={"Languages"} value={`+${data?.languages.length}`} icon={<Languages />} />
                    <CardDashbaord title={"Programs"} value={`+${data?.programs.length}`} icon={<Code />} />
                    <CardDashbaord title={"Service"} value={`+${data?.services.length}`} icon={<HandCoins />} />
                    <CardDashbaord title={"Admin"} value={csc_user.user.name} icon={<UserCheck />} />
                </div>
                <div>
                    <p className='font-bold text-3xl'>Update Content</p>
                </div>
                <div className='space-y-3 columns-1 md:columns-1 xl:columns-2  '>
                    <CountryForm data={data.countries} />
                    <LanguageForm data={data.languages} />
                    <ProgramForm data={data.programs} />
                    <ServiceForm data={data.services} />
                </div>
            </div>
        }
        <Footer />
    </div>
  )
}
