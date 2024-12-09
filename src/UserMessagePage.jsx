import React, { useState, useEffect } from "react";
import logo from "./assets/files/logo2.png";
import { TbLogout } from "react-icons/tb";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
const UserMessagePage = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userId = localStorage.getItem("userID");
  if (!userId) {
    alert("User not signed in.");
    return null;
  }
  const handleLogout = () => {
    localStorage.removeItem("tutortoken");
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
  const username = localStorage.getItem("firstName");
  const formattedUsername =
    username?.charAt(0).toUpperCase() + username?.slice(1);
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(
          `https://birdkin-server.onrender.com/api/interactions/messages?userId=${userId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch messages.");
        }
        const data = await response.json();
        setMessages(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [userId]);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  const handleBack = () => {
    navigate("/home"); // Navigate to home page
  };
  return (
    <>
      <header className="bg-[#003E47] md:bg-white shadow-md py-5 pl-0 p-4 sm:px-7 flex justify-between items-center">
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
          <button
            onClick={handleLogout}
            className="sm:bg-red-500 text-white sm:px-3 md:px-4 py-[6px] md:py-2 rounded-md transition flex items-center gap-2"
          >
            <span className="hidden sm:flex"> Logout</span>
            <TbLogout className="text-2xl" />
          </button>
        </div>
      </header>
      <div className="min-h-screen bg-gray-50 p-5 sm:p-10">
        {" "}
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-black md:text-[#003E47] font-semibold hover:underline"
        >
          <IoArrowBack className="text-2xl sm:text-3xl" />
        </button>
        <h1
          className="text-2xl sm:text-3xl font-semibold mb-6 text-center"
          style={{ color: "#003E47" }}
        >
          Your Messages
        </h1>
        <ul className="space-y-6">
          {messages.map((msg) => (
            <li
              key={msg._id}
              className="bg-white p-6 shadow-md rounded-lg border border-gray-200"
            >
              <h2
                className="text-xl font-semibold mb-2"
                style={{ color: "#003E47" }}
              >
                {msg.courseName}
              </h2>
              <p className="text-gray-600 mb-2">
                <strong>Your Message:</strong> {msg.userMessage}
              </p>
              <p className="text-gray-500 mb-4">
                <strong>Date:</strong>{" "}
                {new Date(msg.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
              {msg.replies && msg.replies.length > 0 ? (
                <div className="text-gray-700">
                  <strong className="block mb-1">Tutor's Replies:</strong>
                  <ul className="ml-4 list-disc list-outside">
                    {msg.replies.map((reply, index) => (
                      <li key={index} className="text-gray-600">
                        {reply}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="text-gray-500 italic">No replies yet.</p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default UserMessagePage;
