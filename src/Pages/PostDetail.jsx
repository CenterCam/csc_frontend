import React from 'react'
import Navbar from '../Components/Frontend-Navbar/Navbar'
import Footer from '../Components/Frontend-Footer/Footer'

export default function PostDetail() {
  return (
    <div>
        <Navbar />
        <div className='flex px-6 lg:px-24'>
            <section className='w-full p-3'>
                <div className=" border-b font-bold text-xl mt-6">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt praesentium illum aliquam asperiores nesciunt earum dolorum, possimus, blanditiis pariatur ullam id mollitia nostrum enim eligendi laboriosam nam, aperiam obcaecati odio.</div>
                <div className="mt-3">
                    <img
                    src="https://i.pinimg.com/736x/92/50/82/925082011a2ce764dcb5e47c20776881.jpg"
                    alt="post-img"
                    className="w-full"
                    />
                </div>
                <div className=" ">
                    <div className=" pb-3 mt-3 ">
                        <div className="text-xs font-medium text-gray-400">
                            <p>Post By : <span>Reach</span></p>
                            <p>Create At : <span>2025-15-09</span></p>
                            <p>Deadline : <span>2025-15-09</span></p>
                        </div>
                        <p className="mb-6">Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus iusto odit expedita minima! Ipsa laborum sapiente expedita iste enim magni temporibus cumque odit repellendus minus, quisquam ut, dolorum sint minima.</p>
                        <div className="remove-all">
                               Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae impedit repellendus officia molestiae eius adipisci, similique provident ab optio. Consequatur similique tempore sunt dolores quibusdam necessitatibus autem animi quas corrupti.
                        </div>
                    </div>
                </div>
            </section>
            <section className='p-3'>
                <div className=" w-96 hidden lg:block">
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
            </section>
        </div>
        <Footer />
    </div>
  )
}
