import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import "./swiperCustom.css";
import Shopbyproduct from "./Shopbyproduct";
import { IoIosStar, IoIosStarHalf } from "react-icons/io";
import { Avatar } from "@chakra-ui/react";
import image from "./assets/laptop.webp";
import AboutTechbams from "./AboutTechbams";

export default function FeaturedCourse() {
  return (
    <>
      <div className="flex flex-col justify-center px-4 lg:px-20 items-center bg-[#F8F8F8] py-12 md:py-16">
        <div className="flex justify-between mb-5 max-w-screen-lg w-full">
          <span className="text-2xl sm:text-3xl font-semibold">
            Featured Courses
          </span>
          <button className="text-xs sm:text-sm border-[2px] font-medium text-[#005764] bg-gray-100 border-[#00A1AB] py-1 sm:py-2 px-5 sm:px-8">
            VIEW ALL
          </button>
        </div>
        <div className="max-w-screen-lg w-full">
          <Swiper
            pagination={{ clickable: true }}
            navigation={false}
            mousewheel={true}
            keyboard={true}
            modules={[Pagination, Mousewheel, Keyboard]}
            className="mySwiper"
            breakpoints={{
              0: { slidesPerView: 1, spaceBetween: 15 },
              768: { slidesPerView: 2, spaceBetween: 20 },
            }}
          >
            {Shopbyproduct.map((product) => (
              <SwiperSlide key={product.id}>
                {/* Center the content */}
                <div className="flex justify-center items-center w-full h-full">
                  <div className="flex flex-col justify-center items-center w-full max-w-[95%] sm:max-w-[450px] h-auto bg-white mt-6 rounded-md shadow-lg overflow-hidden">
                    <div className="flex w-full px-4 py-6">
                      {/* Icon Container */}
                      <div className="w-[80px] flex justify-center">
                        <div className="h-20 w-20 bg-[#005764] rounded-full flex items-center justify-center">
                          {/* {<product.Icon />} */}
                        </div>
                      </div>
                      {/* Course Details */}
                      <div className="flex flex-col w-full pl-4 text-sm">
                        <p className="text-black text-xl lg:text-2xl font-semibold h-[56px] sm:h-[80px] overflow-hidden line-clamp-2">
                          {product.courseName}
                        </p>
                        <div className="flex items-center space-x-1 pb-2">
                          {[...Array(Math.floor(product.rating))].map(
                            (_, index) => (
                              <IoIosStar
                                key={`full-${index}`}
                                className="text-yellow-500 text-xl"
                              />
                            )
                          )}
                          {product.rating % 1 !== 0 && (
                            <IoIosStarHalf className="text-yellow-500 text-xl" />
                          )}
                          <span className="text-gray-400 text-sm">
                            ({product.votes} votes)
                          </span>
                        </div>
                        <div className="text-base font-medium flex items-center gap-2">
                          <Avatar src={image} size="sm" />
                          By {product.lecturerName}
                        </div>
                        <div className="text-gray-500">
                          <p>{product.lastUploadDate}</p>
                          <p>12 lectures (9 hours)</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col w-full px-4 pb-6">
                      <div className="w-full py-2 bg-[#F8F8F8] text-center rounded-md">
                        Free
                      </div>
                      <button className="w-full py-3 mt-2 bg-[#00A1AB] text-white font-medium text-lg rounded-md">
                        ENROLL NOW!
                      </button>
                    </div>
                  </div>
                </div>{" "}
                <div className="h-12 sm:h-20"></div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <AboutTechbams></AboutTechbams>
    </>
  );
}
