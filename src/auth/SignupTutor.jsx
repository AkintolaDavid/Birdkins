import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import logo from "../assets/files/logo2.png";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
export default function SignupTutor() {
  const navigate = useNavigate();
  const [phoneDropdownOpen, setPhoneDropdownOpen] = useState(false);
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);
  const phoneDropdownRef = useRef(null);
  const countryDropdownRef = useRef(null);
  const toast = useToast();
  const countries = [
    { name: "Nigeria", code: "+234" },
    { name: "United States", code: "+1" },
    { name: "India", code: "+91" },
    { name: "United Kingdom", code: "+44" },
    { name: "Japan", code: "+81" },
    // Add more countries
  ];

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    university: "",
    firstSubject: "",
    firstgrade: "",
    secondSubject: "",
    secondgrade: "",
    commitment: "",
    additionalTutoring: "",

    confirmPassword: "",
    password: "",
  });

  const [selectedCountry, setSelectedCountry] = useState("Country");
  const [searchTerm, setSearchTerm] = useState("");

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
        university,
        firstSubject,
        firstgrade,
        secondSubject,
        secondgrade,
        commitment,
        additionalTutoring,

        confirmPassword,
        password,
      } = formData;
      // Backend API call to send OTP

      const response = await axios.post(
        "https://birdkin-server.onrender.com/api/auth/signupTutor",
        {
          fullName,
          email,
          university,
          firstSubject,
          firstgrade,
          secondSubject,
          secondgrade,
          commitment,
          additionalTutoring,

          confirmPassword,
          password,
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
        navigate("/verifyOtpTutor", { state: { email } });
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
            Sign Up As Tutor
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

          <div>
            <label className="block text-sm font-medium text-white">
              University
            </label>
            <input
              type="text"
              name="university"
              value={formData.university}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  university: e.target.value,
                }))
              }
              className="w-full mt-1 mb-3 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-white"
              placeholder="Enter your university"
            />
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
              className="w-full mt-1 mb-3 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-white"
              placeholder="Enter first choice subject"
            />
          </div>

          <div>
            <label className="block text-[13.5px] font-medium text-white">
              What grade did you achieve in this subject?
            </label>
            <input
              type="text"
              name="firstgrade"
              value={formData.firstgrade}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  firstgrade: e.target.value,
                }))
              }
              className="w-full mt-1 mb-3 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-white"
              placeholder="Enter grade achieved in subject"
            />
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
              className="w-full mt-1 mb-3 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-white"
              placeholder="Enter second choice subject"
            />
          </div>

          <div>
            <label className="block text-[13.5px] font-medium text-white">
              What grade did you achieve in this subject?
            </label>
            <input
              type="text"
              name="secondgrade"
              value={formData.secondgrade}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  secondgrade: e.target.value,
                }))
              }
              className="w-full mt-1 mb-3 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-white"
              placeholder="Enter grade achieved in subject"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white">
              Commitment Confirmation
            </label>
            <select
              name="commitment"
              value={formData.commitment}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  commitment: e.target.value,
                }))
              }
              className="w-full mt-1 mb-3 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-white bg-white"
            >
              <option value="" disabled>
                Select your commitment
              </option>
              <option value="yes">
                Yes, I can provide 5 hours of free tutoring
              </option>
              <option value="no">
                No, I cannot provide 5 hours of free tutoring
              </option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-white">
              Additional Tutoring
            </label>
            <select
              name="additionalTutoring"
              value={formData.additionalTutoring}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  additionalTutoring: e.target.value,
                }))
              }
              className="w-full mt-1 mb-3 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-white bg-white"
            >
              <option value="" disabled>
                Select additional tutoring availability
              </option>
              <option value="none">I cannot volunteer additional hours</option>
              <option value="5-10">5-10 extra hours</option>
              <option value="10+">More than 10 extra hours</option>
            </select>
          </div>

          {/* Confirm Password */}
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
            onClick={() => navigate("/signup")}
          >
            As a Student?
          </span>
        </div>
      </div>
    </div>
  );
}
