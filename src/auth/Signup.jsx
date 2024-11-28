import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import logo from "../assets/files/logo2.png";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
export default function Signup() {
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
    phone: "",
    country: "",
    countryCode: "+1", // Default country code
    password: "",
    confirmPassword: "",
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

  const handleCountrySelect = (country) => {
    setSelectedCountry(country.name);
    setFormData((prev) => ({ ...prev, country: country.name })); // Update formData
    setCountryDropdownOpen(false);
  };

  const handlePhoneCodeSelect = (code) => {
    setFormData((prev) => ({ ...prev, countryCode: code }));
    setPhoneDropdownOpen(false);
  };

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleSignup = async () => {
    if (!formData.country || formData.country === "Country") {
      toast({
        title: "Country Selection",
        description: "Please select a country.",
        status: "error",
        position: "top-right",
        duration: 4000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match!",
        status: "error",
        position: "top-right",
        duration: 4000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }

    try {
      const { email, phone, fullName, password, country } = formData;
      // Backend API call to send OTP

      const response = await axios.post(
        "https://birdkin-server.onrender.com/api/auth/signup",
        {
          email,
          phone,
          fullName,
          password, // Add the password here
          country, // Add the selected country if required
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
          position: "top-right",
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
          position: "top-right",
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
        position: "top-right",
      });
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB] relative">
      <FaArrowLeftLong
        className="w-6 h-6 sm:w-8 sm:h-8 text-black absolute top-10 left-10 cursor-pointer"
        onClick={() => navigate(-1)}
      />
      <div className="bg-[#003E47] shadow-md rounded-md p-8 w-full max-w-md">
        <div className="flex flex-col items-center">
          <img src={logo} alt="Logo" className="h-24 w-60 mb-6" />
          <h2 className="text-2xl font-semibold text-white mb-4">Sign Up</h2>
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
              Country
            </label>
            <div className="relative" ref={countryDropdownRef}>
              <button
                type="button"
                onClick={() => setCountryDropdownOpen((prev) => !prev)}
                className="w-full px-4 py-2 border rounded-md bg-white text-left flex items-center justify-between focus:outline-none"
              >
                {selectedCountry}
                <span className="ml-2 text-sm">▼</span>
              </button>
              {countryDropdownOpen && (
                <div className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow-lg">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search country"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full px-4 py-2 border-b focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <FaSearch className="absolute top-3 right-3 text-gray-400" />
                  </div>
                  <ul className="max-h-40 overflow-y-auto">
                    {filteredCountries.map((country) => (
                      <li
                        key={country.code}
                        onClick={() => handleCountrySelect(country)}
                        className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                      >
                        {country.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-white">
              Phone Number
            </label>
            <div className="flex space-x-2">
              <div className="relative w-1/3" ref={phoneDropdownRef}>
                <button
                  type="button"
                  onClick={() => setPhoneDropdownOpen((prev) => !prev)}
                  className="w-full px-4 py-2 border rounded-md bg-white text-left flex items-center justify-between focus:outline-none"
                >
                  {formData.countryCode}
                  <span className="ml-2 text-sm">▼</span>
                </button>
                {phoneDropdownOpen && (
                  <div className="absolute z-10 mt-1 w-[250px] bg-white border rounded-md shadow-lg">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search country"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-2 border-b focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <FaSearch className="absolute top-3 right-3 text-gray-400" />
                    </div>
                    <ul className="max-h-40 overflow-y-auto">
                      {filteredCountries.map((country) => (
                        <li
                          key={country.code}
                          onClick={() => handlePhoneCodeSelect(country.code)}
                          className="px-4 py-2 hover:bg-blue-100 cursor-pointer flex justify-between"
                        >
                          <span className="font-semibold">{country.name}</span>
                          <span className="font-semibold">{country.code}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    phone: e.target.value,
                  }))
                }
                className="w-2/3 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="123-456-7890"
              />
            </div>
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
      </div>
    </div>
  );
}
