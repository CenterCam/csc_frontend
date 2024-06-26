import React from 'react'
import Navbar from '../Components/Frontend-Navbar/Navbar'
import Footer from '../Components/Frontend-Footer/Footer'
import { LocateFixed, LocateIcon, Mail, Map, Phone } from 'lucide-react'

export default function Contact() {
  return (
    <div>
      <Navbar page={"/contact"} />
        <section className=''>
          <div className=" flex  mb-6 justify-center">
            <div
              className="flex flex-col w-96 md:w-1/2
            "
            >
              <div className="font-bold flex justify-center text-3xl my-6">Our Location</div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15636.42759512866!2d104.92658974612318!3d11.544188868480253!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310956d2a2d70f1d%3A0xea84a6a9241db2f6!2sMorgan%20Tower!5e0!3m2!1sen!2skh!4v1716812431430!5m2!1sen!2skh"
                className="w-96 md:w-full rounded-lg"
                height="450"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
              
            </div>
          </div>
          <div className='w-full'>
              <div className='w-full flex justify-center font-bold text-3xl'>
                Get Connected
              </div>
              <div className='columns-1 lg:columns-2 p-3 md:px-24 mt-9 gap-9 space-y-6 justify-items-center'>
                <div className='shadow h-60 p-9 flex justify-center items-center flex-col overflow-hidden'>
                    <Mail />
                    <p className='text-xl font-bold mt-6'>Send Email</p>
                    <p>scholarshipcenter.com@gmail.com</p>
                </div>
                {/* <div className='shadow p-9 flex justify-center items-center flex-col overflow-hidden'>
                    <Phone />
                    <p className='text-xl font-bold mt-6'>Call Us</p>
                    <p>+85578441752</p>
                    <p>+85578441752</p>
                </div> */}
                <div className='shadow h-60 p-9 flex justify-center items-center flex-col overflow-hidden'>
                    <Map />
                    <p className='text-xl font-bold mt-6'>Address</p>
                    <p className='w-60 text-center'>Morgan Tower, Koh Pich, Phnom Penh, Cambodia</p>
                </div>
              </div>
          </div>
        </section>
      <Footer />
    </div>
  )
}
