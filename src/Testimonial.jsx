import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./swiperCustom.css";
import { Pagination, Keyboard, A11y } from "swiper/modules";
import Shopbyproduct from "./Shopbyproduct";
import { FaQuoteLeft } from "react-icons/fa";
import guy from "./assets/guy.jpg";
import Blog from "./Blog";
import Footer from "./Footer";

export default function Testimonial() {
  return (
    <>
      <div className="flex flex-col justify-center items-center h-[350px] sm:h-[650px] gap-8 sm:gap-14 md:gap-20 bg-[#F8F8F8]">
        <span className="font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
          Our Testimonial Stories
        </span>
        <div className="max-w-screen-xl w-full">
          <Swiper
            cssMode={true}
            pagination={{ clickable: true }}
            navigation={false}
            keyboard={true}
            modules={[Pagination, Keyboard]}
            className="mySwiper"
            breakpoints={{
              150: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              850: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              1300: {
                slidesPerView: 3,
                spaceBetween: 15,
              },
            }}
            // Prevent Swiper from capturing vertical scroll
            onScroll={(swiper, event) => {
              if (event.deltaY) event.stopPropagation();
            }}
          >
            {Shopbyproduct.map((product) => (
              <SwiperSlide key={product.id}>
                <div className="flex flex-col items-center justify-center mx-auto w-[85%] sm:w-[400px] h-[250px] bg-white rounded-md shadow-lg p-5">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="h-20 w-20 bg-green-500 rounded-full flex items-center justify-center">
                        <img
                          src={guy}
                          alt="Testimonial"
                          className="h-20 w-20 rounded-full object-cover"
                        />
                      </div>
                      <div className="absolute bottom-0 right-0 bg-white h-7 w-7 rounded-full flex items-center justify-center shadow-md">
                        <FaQuoteLeft className="text-[#00A1AB]" />
                      </div>
                    </div>
                    <div className="text-left">
                      <p className="text-lg font-medium">JOHN DEO</p>
                      <span className="font-medium text-gray-500">
                        Marketing Manager
                      </span>
                    </div>
                  </div>
                  <span className="mt-4 text-center text-sm text-gray-600">
                    Far far away, behind the word mountains, far from the
                    countries Vokalia and Consonantia, there live the blind
                    texts.
                  </span>
                </div>
                <div className="h-12 sm:h-20"></div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}
