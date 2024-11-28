import {
  Navigation,
  Pagination,
  Mousewheel,
  Keyboard,
  A11y,
} from "swiper/modules";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./swiperCustom.css";
import { FaUser, FaComment } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import image from "./assets/image3.avif";
import Footer from "./Footer";

export default function Blog() {
  const blogPosts = [
    {
      id: 1,
      title: "Build Your Dream Software & Engineering Career",
      author: "ADMIN",
      date: "Jan. 18, 2021",
      comments: 3,
      description:
        "A small river named Duden flows by their place and supplies it with the necessary regelialia.",
      image: image,
    },
    {
      id: 2,
      title: "Unlock Your Potential in Software Development",
      author: "ADMIN",
      date: "Feb. 10, 2021",
      comments: 5,
      description:
        "Learn how software engineering transforms ideas into impactful solutions.",
      image: image,
    },
    {
      id: 3,
      title: "Engineering Dreams into Reality",
      author: "ADMIN",
      date: "Mar. 5, 2021",
      comments: 8,
      description: "Discover the journey of building the software of tomorrow.",
      image: image,
    },
  ];

  return (
    <>
      {" "}
      <div className="flex flex-col justify-center items-center h-auto  gap-8 sm:gap-14 md:gap-20 bg-[#f8f8f8] pb-10 pt-20 sm:pt-0">
        <span className="font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
          Recent From Blog
        </span>
        <div className="max-w-screen-xl w-full">
          <Swiper
            pagination={{ clickable: true }}
            navigation={false}
            mousewheel={true}
            keyboard={true}
            modules={[Pagination, Mousewheel, Keyboard]}
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
          >
            {blogPosts.map((post) => (
              <SwiperSlide key={post.id}>
                <div className="flex flex-col justify-start items-center mx-auto w-[85%] sm:w-[400px] h-[400px] sm:h-[500px] bg-white gap-3 rounded-md shadow-lg">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="h-[220px] sm:h-[270px] rounded-t-md w-full object-cover"
                  />
                  <div className="flex flex-col gap-3 mt-3 px-6">
                    <div className="flex gap-3 sm:gap-4 font-medium text-[#035966]">
                      <span className="flex items-center gap-[6px] sm:gap-2 text-xs sm:text-sm">
                        <FaUser /> {post.author}
                      </span>
                      <span className="flex items-center gap-[6px] sm:gap-2 text-xs sm:text-sm">
                        <SlCalender /> {post.date}
                      </span>
                      <span className="flex items-center gap-[6px] sm:gap-2 text-xs sm:text-sm">
                        <FaComment /> {post.comments} COMMENTS
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 text-center sm:text-left">
                      {post.title}
                    </h3>
                    <p className="text-[14px] sm:text-[15px] font-medium text-gray-600 text-center sm:text-left">
                      {post.description}
                    </p>
                  </div>
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
