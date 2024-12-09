import React, { useState } from "react";
import logo from "../assets/files/logo2.png";
import { useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useToast } from "@chakra-ui/react";
import axios from "axios";

export default function Signin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async () => {
    const { email, password } = formData;
    try {
      const response = await axios.post(
        "https://birdkin-server.onrender.com/api/auth/login",
        {
          email,
          password,
        }
      );
      if (response.status === 200) {
        // Save token and redirect
        localStorage.setItem("token", response.data.token);
        const fullName = response.data.user.fullName;
        const firstName = fullName.split(" ")[0]; // Split by space and get the first part

        // Save the first name to local storage
        localStorage.setItem("firstName", firstName);
        localStorage.setItem("userID", response.data.user.id);

        toast({
          title: "Login successful",
          description: "You are now logged in.",
          status: "success",
          position: "top-right",
          duration: 5000,
          isClosable: true,
        });
        navigate("/home"); // Redirect to dashboard
      }
    } catch (error) {
      // Handle error cases
      const errorMessage =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";
      toast({
        title: "Login Failed",
        description: errorMessage,
        status: "error",
        position: "top-right",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB] relative">
      <FaArrowLeftLong
        className="w-6 h-6 sm:w-8 sm:h-8 text-black absolute top-10 left-10 cursor-pointer"
        onClick={() => navigate(-1)}
      />
      <div className="bg-[#003E47] shadow-md rounded-md p-8  w-[90%] sm:w-full  max-w-md">
        <div className="flex flex-col items-center">
          <img
            src={logo}
            alt="Logo"
            className="h-20 sm:h-24 w-48 sm:w-60 mb-6"
          />
          <h2 className="text-2xl font-semibold text-white mb-4">
            Login As Student
          </h2>
        </div>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-white"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full mt-1 mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-white"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="button"
            onClick={handleLogin}
            className="w-full bg-white text-[#003E47] font-medium py-2 rounded-md hover:bg-[#00A1AB] hover:text-white transition"
          >
            Login
          </button>
        </form>
        <div className="flex items-center justify-between">
          {" "}
          <div className="mt-4 text-[12.5px] text-center text-white">
            New to Birdkins?{" "}
            <span
              className="text-[#06b1bd] font-semibold cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </span>
          </div>
          <div className="mt-4 text-[12.5px] text-center">
            <span
              className="text-[#06b1bd] font-semibold cursor-pointer"
              onClick={() => navigate("/forgot-password")}
            >
              Forgot password?
            </span>
          </div>
        </div>
        <div className="mt-4 text-sm text-center text-white">
          Click to Login{" "}
          <span
            className="text-[#06b1bd] font-semibold cursor-pointer"
            onClick={() => navigate("/signintutor")}
          >
            As a Tutor
          </span>
        </div>
      </div>
    </div>
  );
}
