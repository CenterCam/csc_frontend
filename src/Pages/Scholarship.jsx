import React from 'react'
import SmallCard from '../Components/Card/SmallCard'
import Navbar from '../Components/Frontend-Navbar/Navbar'
import Footer from '../Components/Frontend-Footer/Footer'

export default function Scholarship() {
  return (
    <div>
        <Navbar page={"/scholarship"} />
        <div className='flex p-3'>
            <div className='w-full '>
            <section>
                <div className=" border-b font-bold text-xl mt-6 mx-3">Bachelor</div>
                <div class=" flex flex-wrap justify-center ">
                    <SmallCard />
                    <SmallCard />
                </div>
            </section>
            <div className=" flex justify-end text-orange-600 font-bold text-xs "><a href="search/seemore/bachelor">SEE MORE</a></div>
            <section>
                <div className=" border-b font-bold text-xl mt-6 mx-3">Master</div>
                <div class=" flex flex-wrap justify-center ">
                    <SmallCard />
                    <SmallCard />
                </div>
            </section>
            <div className=" flex justify-end text-orange-600 font-bold text-xs "><a href="search/seemore/bachelor">SEE MORE</a></div>
            <section>
                <div className=" border-b font-bold text-xl mt-6 mx-3">Phd</div>
                <div class=" flex flex-wrap justify-center ">
                    <SmallCard />
                    <SmallCard />
                </div>
            </section>
            <div className=" flex justify-end text-orange-600 font-bold text-xs "><a href="search/seemore/bachelor">SEE MORE</a></div>
            <section>
                <div className=" border-b font-bold text-xl mt-6 mx-3">Other</div>
                <div class=" flex flex-wrap justify-center ">
                    <SmallCard />
                    <SmallCard />
                </div>
            </section>
            <div className=" flex justify-end text-orange-600 font-bold text-xs "><a href="search/seemore/bachelor">SEE MORE</a></div>
            </div>
            <div className=" w-96 hidden md:block">
                <div className=" border-b font-bold text-xl mt-6">Related</div>
                <div>
                    <div className="border-b py-3">
                        <a href="{{route('page.postDetail',$post)}}" className="font-bold text-sm hover:text-orange-500 cursor-pointer line-clamp-1">
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil consectetur repellat neque ducimus. Assumenda corrupti nostrum, magni error natus eaque expedita. Unde sunt aliquid sint odio, veniam illo magni laudantium.
                        </a>
                        <div className="text-xs text-gray-600 mt-1">
                            <div className='line-clamp-1'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis ratione asperiores dolor? Impedit, eaque error. Tenetur, asperiores accusantium nulla a vitae sit assumenda iusto voluptas repellendus, totam veritatis? Quod, itaque.</div>
                            <div className='line-clamp-1'>Cambodia  </div>
                            <div>Deadline : <span>2025-04-11</span></div>
                        </div>
                    </div>
                    <div className=" flex justify-end text-orange-600 font-bold text-xs mt-3 "><a href="search/seemore/bachelor">SEE MORE</a></div>
                </div>
            </div>
        </div>
        <Footer />
    </div>
  )
}
