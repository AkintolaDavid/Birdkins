import React from "react";
import logo from "./assets/files/logo2.png";

const Sidebar = ({ selectedCategory, setSelectedCategory }) => {
  return (
    <aside className="fixed top-0 left-0 w-[20%] bg-[#003E47] shadow-lg h-full overflow-y-auto">
      <div className="flex flex-col items-center py-6">
        <img
          src={logo}
          alt="logo"
          className="h-[40px] md:h-[70px] hidden md:flex"
        />
        <h2 className="text-xl font-semibold text-white">All Our Courses</h2>
        <div className="space-y-4 mt-4 w-full px-6">
          {["All", "Web Development", "Data Science"].map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`w-full text-left px-4 py-2 rounded-lg transition text-white ${
                selectedCategory === category
                  ? "bg-[#00A1AB] text-white"
                  : "hover:bg-[#00A1AB] hover:text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
