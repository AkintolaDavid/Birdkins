import React from "react";
import { FaChartColumn } from "react-icons/fa6";
import Testimonial from "./Testimonial";

export default function BrowseCourse() {
  return (
    <>
      <div className="flex flex-col justify-center items-center h-auto lg:h-[600px] gap-8 sm:gap-14 md:gap-20 bg-[#F8F8F8] pb-20 pt-16  lg:pt-24">
        <span className="font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
          Our Online Courses
        </span>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6 w-full max-w-screen-xl justify-center place-items-center">
          {/* Card 1 */}
          <div className="flex flex-col justify-center items-center p-7 sm:p-10 bg-white shadow-md w-[180px] sm:w-[210px] gap-3 rounded-md group hover:bg-[#035966] transition-all">
            <FaChartColumn className="text-5xl text-[#035966] group-hover:text-white transition-all" />
            <span className="text-xl h-14 text-center font-semibold group-hover:text-white transition-all">
              Python Programming
            </span>
            <span className="bg-[#e9e9e9] py-1 px-3 rounded-md text-sm font-medium text-[#035966] group-hover:bg-white group-hover:text-[#035966] transition-all">
              12 courses
            </span>
          </div>

          {/* Card 2 */}
          <div className="flex flex-col justify-center items-center p-7 sm:p-10 bg-white shadow-md w-[180px] sm:w-[210px] gap-3 rounded-md group hover:bg-[#035966] transition-all">
            <FaChartColumn className="text-5xl text-[#035966] group-hover:text-white transition-all" />
            <span className="text-xl h-14 text-center font-semibold group-hover:text-white transition-all">
              JavaScript Basics
            </span>
            <span className="bg-[#e9e9e9] py-1 px-3 rounded-md text-sm font-medium text-[#035966] group-hover:bg-white group-hover:text-[#035966] transition-all">
              10 courses
            </span>
          </div>

          {/* Card 3 */}
          <div className="flex flex-col justify-center items-center p-7 sm:p-10 bg-white shadow-md w-[180px] sm:w-[210px] gap-3 rounded-md group hover:bg-[#035966] transition-all">
            <FaChartColumn className="text-5xl text-[#035966] group-hover:text-white transition-all" />
            <span className="text-xl h-14 text-center font-semibold group-hover:text-white transition-all">
              Web Development
            </span>
            <span className="bg-[#e9e9e9] py-1 px-3 rounded-md text-sm font-medium text-[#035966] group-hover:bg-white group-hover:text-[#035966] transition-all">
              15 courses
            </span>
          </div>

          {/* Card 4 */}
          <div className="flex flex-col justify-center items-center p-7 sm:p-10 bg-white shadow-md w-[180px] sm:w-[210px] gap-3 rounded-md group hover:bg-[#035966] transition-all">
            <FaChartColumn className="text-5xl text-[#035966] group-hover:text-white transition-all" />
            <span className="text-xl h-14 text-center font-semibold group-hover:text-white transition-all">
              Data Science
            </span>
            <span className="bg-[#e9e9e9] py-1 px-3 rounded-md text-sm font-medium text-[#035966] group-hover:bg-white group-hover:text-[#035966] transition-all">
              8 courses
            </span>
          </div>

          {/* Card 5 */}
          <div className="flex flex-col justify-center items-center p-7 sm:p-10 bg-white shadow-md w-[180px] sm:w-[210px] gap-3 rounded-md group hover:bg-[#035966] transition-all">
            <FaChartColumn className="text-5xl text-[#035966] group-hover:text-white transition-all" />
            <span className="text-xl h-14 text-center font-semibold group-hover:text-white transition-all">
              Machine Learning
            </span>
            <span className="bg-[#e9e9e9] py-1 px-3 rounded-md text-sm font-medium text-[#035966] group-hover:bg-white group-hover:text-[#035966] transition-all">
              6 courses
            </span>
          </div>

          {/* Card 6 */}
          <div className="flex flex-col justify-center items-center p-7 sm:p-10 bg-white shadow-md w-[180px] sm:w-[210px] gap-3 rounded-md group hover:bg-[#035966] transition-all">
            <FaChartColumn className="text-5xl text-[#035966] group-hover:text-white transition-all" />
            <span className="text-xl h-14 text-center font-semibold group-hover:text-white transition-all">
              Cybersecurity
            </span>
            <span className="bg-[#e9e9e9] py-1 px-3 rounded-md text-sm font-medium text-[#035966] group-hover:bg-white group-hover:text-[#035966] transition-all">
              5 courses
            </span>
          </div>
        </div>
      </div>
      <Testimonial></Testimonial>
    </>
  );
}
