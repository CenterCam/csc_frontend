import React, { useState } from 'react'
import Footer from '../../Components/Frontend-Footer/Footer'
import NavbarDashboard from '../../Components/Dashboard-Navbar/NavbarDashboard'
import CardDashbaord from '@/Components/Card/CardDashbaord';
import { AreaChart, Book, Code, Flag, HandCoins, Languages, Newspaper, User } from 'lucide-react';
import CountryForm from '@/Components/Form/CountryForm';
import LanguageForm from '@/Components/Form/LanguageForm';
import ProgramForm from '@/Components/Form/ProgramForm';
import ServiceForm from '@/Components/Form/ServiceForm';
import StatusForm from '@/Components/Form/StatusForm';

export default function Dashboard() {
  return (
    <div>
        <NavbarDashboard page={"/dashboard"} />
        <div className=' flex flex-col  p-9 gap-9'>    
            <div>
                <p className='font-bold text-3xl'>Dashboard</p>
            </div>
            <div className=' columns-1 sm:columns-2 lg:columns-3 xl:columns-4 space-y-3  gap-3'>
                <CardDashbaord title={"Posts"} value={"+150"} icon={<Newspaper />} />
                <CardDashbaord title={"Users"} value={"+10"} icon={<User/>} />
                <CardDashbaord title={"Courses"} value={"+10"} icon={<Book />} />
                <CardDashbaord title={"Countries"} value={"+10"} icon={<Flag />} />
                <CardDashbaord title={"Languages"} value={"+3"} icon={<Languages />} />
                <CardDashbaord title={"Programs"} value={"+10"} icon={<Code />} />
                <CardDashbaord title={"Statuses"} value={"+10"} icon={<AreaChart />} />
                <CardDashbaord title={"Service"} value={"+4"} icon={<HandCoins />} />
            </div>
            <div>
                <p className='font-bold text-3xl'>Update Content</p>
            </div>
            <div className='space-y-3 columns-1 md:columns-2 xl:columns-3  '>
                <CountryForm />
                <LanguageForm />
                <ProgramForm />
                <ServiceForm />
                <StatusForm />
            </div>
        </div>
        <Footer />
    </div>
  )
}
