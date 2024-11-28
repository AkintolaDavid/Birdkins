import React from "react";
import { IoMdMail } from "react-icons/io";
import { FaPhone } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
export default function Header() {
  return (
    <div className="h-14 flex justify-between mx-10 items-center">
      <div className="hidden lg:flex items-center">
        <div className="pr-4 flex items-center gap-2 text-lg font-medium">
          <IoMdMail />
          davidakintola@gmail.com
        </div>
        <div className="h-8 w-[1px] bg-black mx-4"></div>
        <div className="pl-4 flex items-center gap-2 text-lg font-medium">
          <FaPhone />
          08066327229
        </div>
      </div>
      <div className="flex lg:hidden items-center">Contact us</div>

      <div className="flex items-center gap-8">
        <div className="hidden sm:flex justify-center items-center h-10">
          <div className="relative w-full max-w-lg">
            <input
              type="text"
              placeholder="Search for course here"
              className="h-10 w-full py-3 pl-4 pr-12 text-gray-700 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            />
            <button className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500 hover:text-blue-400">
              <FaSearch size={18} />
            </button>
          </div>
        </div>{" "}
        <div className="flex sm:hidden justify-center items-center h-10">
          {" "}
          <FaSearch size={18} />
        </div>
        <div className="flex justify-center items-center border-[1px] border-blue-400 rounded-md">
          <button className="flex items-center justify-center px-6 py-[7px] text-blue-400 text-bue-400 font-medium">
            Login
          </button>
          <button className="flex items-center justify-center px-6 py-[7px] bg-blue-400 text-white font-medium">
            Signup
          </button>
        </div>
      </div>
    </div>
  );
}
