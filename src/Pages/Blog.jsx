import React from 'react'
import Navbar from '../Components/Frontend-Navbar/Navbar'
import Footer from '../Components/Frontend-Footer/Footer'
import Card from '../Components/Card/Card'
import SmallCard from '../Components/Card/SmallCard'

export default function Blog() {
  return (
    <div>
      <Navbar />
      <section className="hot flex flex-col justify-center items-center  lg:flex-row lg:justify-center p-3 ">
        <Card />
        <Card />
        <Card />
      </section>
      <section className="recent border-b  p-3">
        <div className="font-bold text-lg my-6 border-b">Recent Post</div>
        <div className=" flex flex-wrap justify-center w-full">
            <SmallCard />
            <SmallCard />
            <SmallCard />
            <SmallCard />
            <SmallCard />
            <SmallCard />
            <SmallCard />
            <SmallCard />
        </div>
      </section>
      <div className=" p-3 flex justify-end text-orange-600 font-bold "><a href="search/seemore/posts">SEE MORE</a></div>
      <Footer />
    </div>
  )
}
