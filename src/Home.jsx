import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { Link, useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import logo from "./assets/files/logo2.png";
import { MdOutlineMessage } from "react-icons/md";
import { IoNotifications } from "react-icons/io5";
import { TbLogout } from "react-icons/tb";
import { useToast } from "@chakra-ui/react";
import axios from "axios";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  const toast = useToast();
  const username = localStorage.getItem("firstName");
  const formattedUsername =
    username?.charAt(0).toUpperCase() + username?.slice(1);

  // Fetch courses from backend
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          "https://birdkin-server.onrender.com/api/courses"
        ); // Update to your backend URL
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
        toast({
          title: "Error",
          description: "Failed to load courses.",
          status: "error",
          position: "top-right",
          duration: 5000,
          isClosable: true,
        });
      }
    };
    fetchCourses();
  }, [toast]);

  // Filter courses based on category
  const filteredCourses =
    selectedCategory === "All"
      ? courses
      : courses.filter((course) => course.category === selectedCategory);

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast({
      title: "Logout Successful",
      description: "You have been logged out.",
      status: "success",
      position: "top-right",
      duration: 5000,
      isClosable: true,
    });
    navigate("/signin");
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="hidden md:flex">
        <Sidebar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </div>

      {/* Main Content */}
      <main className="ml-[0%] md:ml-[20%] w-full bg-gray-100 flex flex-col overflow-y-auto">
        {/* Header */}
        <header className="bg-[#003E47] md:bg-white shadow-md py-5 px-3 sm:px-6 flex justify-between items-center">
          <div className="flex items-center gap-0 sm:gap-2 md:gap-5">
            <img
              src={logo}
              alt="logo"
              className="h-[40px] md:h-[70px] flex md:hidden"
            />
            <span className="text-base sm:text-lg font-semibold text-white md:text-gray-700">
              Welcome, {formattedUsername}
            </span>
          </div>
          <div className="flex items-center space-x-4 sm:space-x-5 md:space-x-8">
            <MdOutlineMessage
              onClick={() => navigate("/UserMessagePage")} // Navigate to UserMessagePage
              className="text-xl sm:text-2xl text-white md:text-gray-500 cursor-pointer" // Add cursor-pointer for click feedback
            />{" "}
            <IoNotifications className="text-xl sm:text-2xl text-white md:text-gray-500" />
            <button
              onClick={handleLogout}
              className="sm:bg-red-500 text-white sm:px-3 md:px-4 py-[6px] md:py-2 rounded-md transition flex items-center gap-2"
            >
              <span className="hidden sm:flex"> Logout</span>
              <TbLogout className="text-xl sm:text-2xl" />
            </button>
          </div>
        </header>
        {/* Courses Section */}
        <div className="flex-1 px-6 py-6 space-y-6">
          {/* Mobile Category Filter */}
          <div className="md:hidden mb-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-white p-3 rounded-md border border-gray-300"
            >
              {["All", "Web Development", "Data Science"].map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Courses */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white p-6 shadow-lg rounded-lg hover:shadow-xl transition-transform transform hover:scale-105"
              >
                <img
                  src={course.img}
                  alt={course.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {course.title}
                </h3>
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`${
                          i < Math.floor(course.rating)
                            ? "text-yellow-500"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2">{course.rating}</span>
                </div>
                <p className="text-gray-700 mb-4">{course.description}</p>
                <Link
                  to={`/course/${course.id}`}
                  className="block bg-[#00A1AB] text-white text-center py-2 rounded-md hover:bg-[#003E47] transition"
                >
                  Enroll Now
                </Link>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
