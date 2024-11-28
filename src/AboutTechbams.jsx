import React from "react";
import image from "./assets/image.jpg";
import BrowseCourse from "./BrowseCourse";
export default function AboutTechbams() {
  return (
    <>
      {" "}
      <div className="flex items-center justify-center bg-[#f8f8f8] px-4 sm:px-10 pb-0 lg:pb-10">
        <div className="h-auto lg:h-[550px] w-[1000px] gap-5 md:gap-0 flex lg:flex-row flex-col justify-center items-center mx-2 sm:mx-10 md:mx-0">
          <div className="flex flex-col text-center lg:text-left w-[100%] md:w-[500px]  gap-6 pr-0 md:pr-10 lg:pr-16">
            <span className="text-[#00A1AB] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold">
              About Birdkins
            </span>
            <span className="text-sm sm:text-base">
              At Birdkins Scholars our goal is to uplift students educational
              experience through engaging tutoring, UK/US university application
              support and guidance on apprenticeships. Our aim is to ignite a
              passion for education in every student. Join us in creating a
              brighter future together!
            </span>
            <div className="grid grid-cols-2 gap-5">
              <div className="flex flex-col">
                <span className="text-4xl sm:text-5xl lg:text-6xl text-[#00A1AB]">
                  12<span className="text-3xl font-medium">K+</span>
                </span>
                <span className="text-[12px] sm:text-[14px] font-normal">
                  STUDENTS LEARNING
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-4xl sm:text-5xl lg:text-6xl text-[#00A1AB]">
                  20<span className="text-3xl font-medium">+</span>
                </span>
                <span className="text-[12px] sm:text-[14px] font-normal">
                  ACTIVE COURSES
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-4xl sm:text-5xl lg:text-6xl text-[#00A1AB]">
                  10<span className="text-3xl font-medium">+</span>
                </span>
                <span className="text-[12px] sm:text-[14px] font-normal">
                  INSTRUCTORS
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-4xl sm:text-5xl lg:text-6xl text-[#00A1AB]">
                  10<span className="text-3xl font-medium">+</span>
                </span>
                <span className="text-[12px] sm:text-[14px] font-normal">
                  COUNTRY REACHED
                </span>
              </div>
            </div>
          </div>
          <div>
            <img
              src={image}
              at="img "
              className="h-[220px] md:h-[380px] w-[500px]"
            />
          </div>
        </div>
      </div>
      <BrowseCourse></BrowseCourse>
    </>
  );
}
