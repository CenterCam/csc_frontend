import React from 'react'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation,EffectFade} from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
export default function Carousel() {
  return (
    <div>
    <Swiper
      slidesPerView={1}
      effect={'fade'}
      autoplay={{
          delay: 4500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation,EffectFade]}
    >
      <SwiperSlide><img src="/carousel/carousel1.jpg" alt="" /></SwiperSlide>
      <SwiperSlide><img src="/carousel/carousel2.jpg" alt="" /></SwiperSlide>
      <SwiperSlide><img src="/carousel/carousel3.jpg" alt="" /></SwiperSlide>
    </Swiper>
    </div>
  )
}
