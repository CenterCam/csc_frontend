import React from 'react'
import Navbar from '../Components/Frontend-Navbar/Navbar'
import Footer from '../Components/Frontend-Footer/Footer'

export default function Contact() {
  return (
    <div>
      <Navbar page={"/contact"} />
        <section>
          <div className=" flex  mb-6 justify-center">
          <div
            className="flex flex-col w-96 md:w-1/2
          "
          >
            <div className="font-bold text-2xl my-6">OUR LOCATION</div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3909.1378913451344!2d104.91743867515679!3d11.54196468865721!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310951b2c332c0ad%3A0xe2ede11538dc1036!2zQ2FtYm9kaWEgU2Nob2xhcnNoaXAgQ2VudGVyIOGemOGeh-GfkuGeiOGemOGejuGfkuGejOGem-GeouGetuGeoOGetuGemuGevOGelOGegOGemuGejuGfjeGegOGemOGfkuGeluGeu-Geh-Getg!5e0!3m2!1sen!2skh!4v1700540321514!5m2!1sen!2skh"
              className="w-96 md:w-full rounded-lg"
              height="450"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center md:flex-row md:justify-center md:items-center mt-6">
          <img
            src="/qrcsc.png"
            alt=""
            className="h-96 w-96 mx-9 rounded-lg"
          />
        </div>
        </section>
      <Footer />
    </div>
  )
}
