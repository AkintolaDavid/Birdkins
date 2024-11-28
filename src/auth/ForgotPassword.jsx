import React, { useState } from "react";
import logo from "../assets/files/logo2.png";
import { useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import axios from "axios";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendOTP = async () => {
    setLoading(true);
    setError("");

    try {
      await axios.post(
        "https://birdkin-server.onrender.com/api/auth/send-otp",
        { email }
      ); // Adjust the endpoint as needed
      navigate("/verify-otp", { state: { email } });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send OTP");
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
      <div className="bg-[#003E47] shadow-md rounded-md p-8 w-full max-w-md">
        <div className="flex flex-col items-center">
          <img src={logo} alt="Logo" className="h-24 w-60 mb-6" />
          <h2 className="text-2xl font-semibold text-white mb-4">
            Forgot Password
          </h2>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendOTP();
          }}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-white">
              Enter your email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 mb-3 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-white"
              placeholder="Enter your email"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-md text-[#003E47] font-medium ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-white hover:bg-[#00A1AB] hover:text-white transition"
            }`}
          >
            {loading ? "Sending..." : "Send OTP"}
          </button>
        </form>
      </div>
    </div>
  );
}
