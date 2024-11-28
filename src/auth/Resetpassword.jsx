import React, { useState } from "react";
import logo from "../assets/files/logo2.png";
import { useNavigate, useLocation } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

export default function ResetPassword() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const email = state?.email; // Email passed from verify-otp
  const toast = useToast();
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleReset = async () => {
    if (!email) {
      toast({
        title: "Error",
        description: "Email is missing. Please restart the reset process.",
        status: "error",
        position: "top-right",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (formData.newPassword === formData.confirmPassword) {
      try {
        const response = await axios.post(
          "https://birdkin-server.onrender.com/api/auth/reset-password",
          {
            email,
            newPassword: formData.newPassword,
          }
        );

        toast({
          title: "Password Reset Successfully",
          description: "You can now log in with your new password.",
          status: "success",
          position: "top-right",
          duration: 3000,
          isClosable: true,
        });

        navigate("/signin"); // Redirect to login page
      } catch (err) {
        toast({
          title: "Password Reset Failed",
          description: err.response?.data?.message || "Something went wrong.",
          status: "error",
          position: "top-right",
          duration: 3000,
          isClosable: true,
        });
      }
    } else {
      toast({
        title: "Passwords Do Not Match",
        description:
          "Please make sure the new password and confirmation match.",
        status: "error",
        position: "top-right",
        duration: 3000,
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
      <div className="bg-[#003E47] shadow-md rounded-md p-8 w-full max-w-md">
        <div className="flex flex-col items-center">
          <img src={logo} alt="Logo" className="h-24 w-60 mb-6" />
          <h2 className="text-2xl font-semibold text-white mb-4">
            Reset Password
          </h2>
        </div>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white">
              New Password
            </label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0093DD]"
              placeholder="New Password"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white">
              Confirm New Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full mt-1 mb-3 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0093DD]"
              placeholder="Confirm New Password"
            />
          </div>
          <button
            type="button"
            onClick={handleReset}
            className="w-full bg-white text-[#003E47] py-2 rounded-md hover:bg-[#00A1AB] font-medium hover:text-white transition"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}
