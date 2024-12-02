import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/files/logo2.png";
import { useToast } from "@chakra-ui/react";
export default function SignupVerifyOtpTutor() {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const { state } = useLocation(); // Retrieve email and phone from signup.
  const toast = useToast();
  const handleVerify = async () => {
    try {
      const response = await axios.post(
        "https://birdkin-server.onrender.com/api/auth/verifyOtpTutor",
        {
          email: state.email,
          otp,
        }
      );

      if (response.status) {
        toast({
          title: "Verification Successful",
          description: "Your account has been verified.",
          status: "success",
          position: "top-right",
          duration: 5000,
          isClosable: true,
        });
        navigate("/signin"); // Redirect to home or another page.
      } else {
        toast({
          title: "Invalid OTP",
          description: "Please try again with the correct OTP.",
          status: "error",
          position: "top-right",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      // Show error toast
      toast({
        title: "Error",
        description:
          "An error occurred while verifying your OTP. Please try again.",
        status: "error",
        position: "top-right",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB]">
      <div className="bg-[#003E47] shadow-md rounded-md p-8  w-[90%] sm:w-full max-w-md">
        <div className="flex flex-col items-center">
          <img src={logo} alt="Logo" className="h-24 w-60 mb-6" />
          <h2 className="text-2xl font-semibold text-white mb-4">
            {" "}
            Verify OTP
          </h2>
        </div>
        <div>
          <label className="block text-sm font-medium text-white">
            Enter OTP
          </label>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full mt-1 mb-3 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-white"
            placeholder="Enter 6-digit OTP"
            maxLength={6}
          />
        </div>

        <button
          onClick={handleVerify}
          className="w-full bg-white text-[#003E47] py-2 rounded-md mt-4 hover:bg-[#00A1AB] font-medium hover:text-white transition"
        >
          Verify OTP
        </button>
      </div>
    </div>
  );
}
