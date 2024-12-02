import React from "react";
import { TfiUser } from "react-icons/tfi";
import { MdOutlineAccessTime } from "react-icons/md";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { BiBookReader } from "react-icons/bi";
import { RiComputerLine } from "react-icons/ri";
import FeaturedCourse from "./FeaturedCourse";

export default function LandingBox() {
  return (
    <>
      {" "}
      <div className="w-full border-b border-gray-300">
        {/* Container with grid layout */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 h-auto">
          {/* Section 1 */}

          <div className="flex flex-col items-start text-left gap-2 sm:gap-4 p-3 sm:p-7">
            <MdOutlineAccessTime className="text-[#00A1AB] text-4xl sm:text-5xl" />
            <span className="text-lg sm:text-xl font-semibold">
              Flexible Timing
            </span>
            <span className="text-sm sm:text-base">
              Lorem Ipsum available, but the majority have suffered alteration
              in some form, by injected humour.
            </span>
          </div>
          <div className="flex flex-col items-start text-left gap-2 sm:gap-4 p-3 sm:p-7  ">
            <TfiUser className="text-[#00A1AB] text-4xl sm:text-5xl" />
            <span className="text-lg sm:text-xl font-semibold">
              Learn From The Experts
            </span>
            <span className="text-sm sm:text-base">
              Lorem Ipsum available, but the majority have suffered alteration
              in some form, by injected humour.
            </span>
          </div>

          <div className="flex flex-col items-start text-left gap-2 sm:gap-4 p-3 sm:p-7">
            <BiBookReader className="text-[#00A1AB] text-4xl sm:text-5xl" />
            <span className="text-lg sm:text-xl font-semibold">
              Comprehensive Materials
            </span>
            <span className="text-sm sm:text-base">
              Lorem Ipsum available, but the majority have suffered alteration
              in some form, by injected humour.
            </span>
          </div>

          {/* Section 3 */}
          <div className="flex flex-col items-start text-left gap-2 sm:gap-4 p-3 sm:p-7  ">
            <LiaChalkboardTeacherSolid className="text-[#00A1AB] text-4xl sm:text-5xl" />
            <span className="text-lg sm:text-xl font-semibold">
              Illustrative Teaching
            </span>
            <span className="text-sm sm:text-base">
              Lorem Ipsum available, but the majority have suffered alteration
              in some form, by injected humour.
            </span>
          </div>
        </div>
      </div>
      <FeaturedCourse></FeaturedCourse>
    </>
  );
}
