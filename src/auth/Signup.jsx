import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import logo from "../assets/files/logo2.png";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
export default function Signup() {
  const navigate = useNavigate();
  const phoneDropdownRef = useRef(null);
  const countryDropdownRef = useRef(null);
  const toast = useToast();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    school: "",
    firstSubject: "",
    specificHelp: "",
    secondSubject: "",
    intendedUniversity: "",
    password: "",
    confirmPassword: "",
  });

  const handleOutsideClick = (event) => {
    if (
      phoneDropdownRef.current &&
      !phoneDropdownRef.current.contains(event.target)
    ) {
      setPhoneDropdownOpen(false);
    }
    if (
      countryDropdownRef.current &&
      !countryDropdownRef.current.contains(event.target)
    ) {
      setCountryDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  const handleSignup = async () => {
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match!",
        status: "error",
        position: "top-right",
        duration: 4000,
        isClosable: true,
      });
      return;
    }

    try {
      const {
        fullName,
        email,
        school,
        firstSubject,
        specificHelp,
        secondSubject,
        intendedUniversity,
        password,
        confirmPassword,
      } = formData;
      // Backend API call to send OTP

      const response = await axios.post(
        "https://birdkin-server.onrender.com/api/auth/signup",
        {
          fullName,
          email,
          school,
          firstSubject,
          specificHelp,
          secondSubject,
          intendedUniversity,
          password,
          confirmPassword,
        }
      );
      if (response.status) {
        // Pass user details to OTP page.
        toast({
          title: "OTP Sent",
          description: "OTP has been sent to your email.",
          status: "success",
          position: "top-right",
          duration: 4000,
          isClosable: true,
        });
        navigate("/verifyOtp", { state: { email } });
      } else {
        toast({
          title: "Error sending OTP",
          //   description: "Error sending OTP. Please try again.",
          status: "error",
          position: "top-right",
          duration: 4000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast({
        title: error.response.data.message,

        status: "error",
        position: "top-right",
        duration: 4000,
        isClosable: true,
      });
    }
  };
  return (
    <div className="min-h-screen  flex items-center justify-center bg-[#F9FAFB] relative">
      <FaArrowLeftLong
        className="w-6 h-6 sm:w-8 sm:h-8 text-black absolute top-6 left-6 sm:top-10 sm:left-10 cursor-pointer"
        onClick={() => navigate(-1)}
      />
      <div className="bg-[#003E47] mt-14 sm:mt-0 mb-8 sm:mb-0 shadow-md rounded-md p-8  w-[90%] sm:w-full  max-w-md">
        <div className="flex flex-col items-center">
          <img
            src={logo}
            alt="Logo"
            className="h-20 sm:h-24 w-48 sm:w-60 mb-6"
          />
          <h2 className="text-2xl font-semibold text-white mb-4">
            Sign Up As Student
          </h2>
        </div>
        <form className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-white">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  fullName: e.target.value,
                }))
              }
              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-white"
              placeholder="John Doe"
            />
          </div>

          {/* email */}
          <div>
            <label className="block text-sm font-medium text-white">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  email: e.target.value,
                }))
              }
              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-white"
              placeholder="johndoe@gmail.com"
            />{" "}
          </div>

          {/* Country Input */}
          <div>
            <label className="block text-sm font-medium text-white">
              School
            </label>
            <input
              type="text"
              name="school"
              value={formData.school}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  school: e.target.value,
                }))
              }
              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-white"
              placeholder="Enter your school name"
            />{" "}
          </div>

          <div>
            <label className="block text-sm font-medium text-white">
              First-Choice Subject for Tutoring
            </label>
            <input
              type="text"
              name="firstSubject"
              value={formData.firstSubject}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  firstSubject: e.target.value,
                }))
              }
              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-white"
              placeholder="Enter first choice subject"
            />{" "}
          </div>

          <div>
            <label className="block text-sm font-medium text-white">
              What specific help would you like for this subject?
            </label>
            <input
              type="text"
              name="specificHelp"
              value={formData.specificHelp}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  specificHelp: e.target.value,
                }))
              }
              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-white"
              placeholder="Enter any specific help needed"
            />{" "}
          </div>

          <div>
            <label className="block text-sm font-medium text-white">
              Second-Choice Subject for Tutoring
            </label>
            <input
              type="text"
              name="secondSubject"
              value={formData.secondSubject}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  secondSubject: e.target.value,
                }))
              }
              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-white"
              placeholder="Enter second choice subject"
            />{" "}
          </div>
          <div>
            <label className="block text-sm font-medium text-white">
              Intended University Subject
            </label>
            <input
              type="text"
              name="intendedUniversity"
              value={formData.intendedUniversity}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  intendedUniversity: e.target.value,
                }))
              }
              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-white"
              placeholder="enter your school name"
            />{" "}
          </div>
          <div>
            <label className="block text-sm font-medium text-white">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, password: e.target.value }))
              }
              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-white"
              placeholder="Enter password"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-white">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  confirmPassword: e.target.value,
                }))
              }
              className="w-full mt-1 mb-3 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-white"
              placeholder="Confirm password"
            />
          </div>

          <button
            type="button"
            onClick={handleSignup}
            className=" w-full bg-white text-[#003E47] font-medium py-2 rounded-md hover:bg-[#00A1AB] hover:text-white transition"
          >
            Sign Up
          </button>
        </form>{" "}
        <div className="mt-4 text-sm text-center text-white">
          Already have an account?{" "}
          <span
            className="text-[#06b1bd] font-semibold cursor-pointer"
            onClick={() => navigate("/signin")}
          >
            Sign In
          </span>
        </div>
        <div className="mt-4 text-sm text-center text-white">
          Do you want to register{" "}
          <span
            className="text-[#06b1bd] font-semibold cursor-pointer"
            onClick={() => navigate("/signuptutor")}
          >
            As a Tutor?
          </span>
        </div>
      </div>
    </div>
  );
}
