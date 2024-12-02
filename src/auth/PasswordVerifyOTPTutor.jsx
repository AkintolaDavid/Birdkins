import React, { useState, useEffect } from "react";
import logo from "../assets/files/logo2.png";
import { useNavigate, useLocation } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

export default function PasswordVerifyOTPTutor() {
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();

  // Extract email from location.state
  const email = location.state?.email || "";
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!email) {
      toast({
        title: "Error",
        description: "Email is missing. Please retry the process.",
        status: "error",
        position: "top-right",
        duration: 5000,
        isClosable: true,
      });
      navigate("/forgot-password"); // Redirect back to forgot-password if email is not present
    }
  }, [email, navigate, toast]);

  const handleVerify = async () => {
    if (!/^\d{6}$/.test(otp)) {
      setError("Please enter a valid 6-digit OTP.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Send OTP verification request to the backend
      const response = await axios.post(
        "https://birdkin-server.onrender.com/api/auth/verify-otptutor",
        { email, otp }
      );

      if (response.status === 200) {
        toast({
          title: "OTP Verified",
          description: "Your account has been verified.",
          status: "success",
          position: "top-right",
          duration: 5000,
          isClosable: true,
        });
        navigate("/reset-passwordtutor", { state: { email } }); // Pass email to reset password page
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Failed to verify OTP.";
      setError(errorMessage);
      toast({
        title: "Verification Failed",
        description: errorMessage,
        status: "error",
        position: "top-right",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB] relative">
      <FaArrowLeftLong
        className="w-6 h-6 sm:w-8 sm:h-8 text-black absolute top-10 left-10 cursor-pointer"
        onClick={() => navigate(-1)}
      />
      <div className="bg-[#003E47] shadow-md rounded-md p-8  w-[90%] sm:w-full max-w-md">
        <div className="flex flex-col items-center">
          <img src={logo} alt="Logo" className="h-24 w-60 mb-6" />
          <h2 className="text-2xl font-semibold text-white mb-4">
            Tutor Verify OTP
          </h2>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleVerify();
          }}
          className="space-y-4"
        >
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
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-[#003E47] py-2 rounded-md hover:bg-[#00A1AB] font-medium hover:text-white transition"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
      </div>
    </div>
  );
}
