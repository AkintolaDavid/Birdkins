import React, { useState } from "react";
import image1 from "./assets/image3.avif";
import image2 from "./assets/image4.avif";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./swiperCustom.css";
import { Mousewheel, Keyboard, A11y, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa"; // For menu icons
import logo from "./assets/files/logo.png";
import LandingBox from "./LandingBox";

export default function Landing() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Add a relative container */}
      <div className="relative">
        {/* Header */}
        <div className="absolute top-0 left-0 w-full h-20 sm:h-24 bg-[#003E47] text-white z-10 flex items-center justify-between px-4 sm:px-10 lg:px-20">
          {/* Logo */}
          <img src={logo} alt="logo" className="h-[70px] sm:h-20" />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8 lg:gap-14 text-base lg:text-lg font-medium items-center">
            <Link to="/" className="hover:text-blue-400">
              Home
            </Link>
            <Link to="/about" className="hover:text-blue-400">
              About
            </Link>
            <Link to="/courses" className="hover:text-blue-400">
              Courses
            </Link>
            <Link to="/blog" className="hover:text-blue-400">
              Blog
            </Link>
            <Link to="/contact" className="hover:text-blue-400">
              Contact
            </Link>
            <div className="flex justify-center items-center border-[2px] border-white rounded-md">
              <button className="flex items-center justify-center px-4 lg:px-6 py-[7px] text-white font-medium">
                <Link to="/signin"> Login</Link>
              </button>
              <button className="flex items-center justify-center px-4 lg:px-6 py-[7px] bg-white text-[#003E47] font-medium">
                <Link to="/signup">Signup</Link>
              </button>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white text-2xl"
            onClick={() => setIsMenuOpen(true)}
          >
            <FaBars />
          </button>
        </div>

        {/* Mobile Side Menu */}
        {isMenuOpen && (
          <div className="fixed inset-0 z-20 bg-gray-800 bg-opacity-75">
            <div className="fixed top-0 right-0 w-4/5 h-full bg-[#003E47] text-white shadow-lg flex flex-col">
              {/* Close Button */}
              <button
                className="self-end m-4 text-2xl text-gray-600"
                onClick={() => setIsMenuOpen(false)}
              >
                <FaTimes className="text-white" />
              </button>

              {/* Menu Links */}
              <nav className="flex flex-col gap-6 mt-10 text-lg font-medium justify-center items-center text-center">
                <Link
                  to="/"
                  className="hover:text-blue-400"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <img src={logo} alt="logo" className="h-20" />
                </Link>{" "}
                <Link
                  to="/"
                  className="hover:text-blue-400"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="/about"
                  className="hover:text-blue-400"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </Link>
                <Link
                  to="/courses"
                  className="hover:text-blue-400"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Courses
                </Link>
                <Link
                  to="/blog"
                  className="hover:text-blue-400"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Blog
                </Link>
                <Link
                  to="/contact"
                  className="hover:text-blue-400"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>
                <div className="flex flex-col gap-3 px-4 w-[80%]">
                  <button className="px-4 py-2 border border-white text-white font-medium rounded-md">
                    <Link to="/signin"> Login</Link>
                  </button>
                  <button className="px-4 py-2 bg-white text-[#003E47] font-medium rounded-md">
                    <Link to="/signup"> Signup</Link>
                  </button>
                </div>
              </nav>
            </div>
          </div>
        )}

        {/* Swiper Section */}
        <div className="relative z-0">
          <Swiper
            cssMode={true}
            pagination={{ clickable: true }}
            mousewheel={true}
            keyboard={true}
            autoplay={{
              delay: 4000, // 4 seconds delay between slides
              disableOnInteraction: false, // Keeps autoplay even if user interacts with the swiper
            }}
            modules={[Mousewheel, Keyboard, A11y, Autoplay]}
            className="mySwiper"
            spaceBetween={10}
          >
            {/* Slide 1 */}
            <SwiperSlide>
              <div className="relative">
                <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                <img
                  alt="Slide 1"
                  src={image1}
                  className="w-full h-[60vh] sm:h-[65vh] md:h-[70vh] object-cover"
                />
              </div>
            </SwiperSlide>

            {/* Slide 2 */}
            <SwiperSlide>
              <div className="relative">
                <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                <img
                  alt="Slide 2"
                  src={image2}
                  className="w-full h-[60vh] sm:h-[65vh] md:h-[70vh] object-cover"
                />
              </div>
            </SwiperSlide>
          </Swiper>

          {/* Text Overlay */}
          <div className="absolute top-[40%] z-10 flex flex-col gap-10 sm:gap-16 md:gap-20">
            <span className="text-left px-4 sm:px-8 lg:px-16 text-3xl sm:text-4xl md:text-6xl text-white font-semibold drop-shadow-md">
              “Elevating education, one wing at a time”
            </span>
            <button className="mx-4 sm:mx-8 lg:mx-16 w-56 sm:w-64 md:w-80 py-3 md:py-4   rounded-md bg-[#00A1AB] text-white font-medium text-lg border-2 border-[#005764] transition-all duration-300 hover:bg-[#005764] hover:border-[#00A1AB]">
              Get involved Now!
            </button>
          </div>
        </div>
      </div>
      <LandingBox></LandingBox>
    </>
  );
}
