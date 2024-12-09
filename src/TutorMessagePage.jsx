import React, { useState, useEffect } from "react";
import logo from "./assets/files/logo2.png";
import { MdOutlineMessage } from "react-icons/md";
import { IoNotifications } from "react-icons/io5";
import { TbLogout } from "react-icons/tb";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
const TutorMessagePage = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [replyContent, setReplyContent] = useState({});
  const tutoremail = localStorage.getItem("tutoremail");
  const username = localStorage.getItem("firstName");
  const formattedUsername =
    username?.charAt(0).toUpperCase() + username?.slice(1);
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
    navigate("/signintutor");
  };
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(
          `https://birdkin-server.onrender.com/api/interactions/messagestutor?tutoremail=${tutoremail}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
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

    if (tutoremail) {
      fetchMessages();
    } else {
      setError("Tutor email not found.");
      setLoading(false);
    }
  }, [tutoremail]);

  const handleReplyChange = (messageId, value) => {
    setReplyContent((prev) => ({ ...prev, [messageId]: value }));
  };

  const handleSendReply = async (messageId) => {
    const reply = replyContent[messageId];
    if (!reply) {
      alert("Reply cannot be empty.");
      return;
    }

    try {
      const response = await fetch(
        `https://birdkin-server.onrender.com/api/interactions/messages/${messageId}/reply`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ reply }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send reply.");
      }

      const updatedMessage = await response.json();
      alert("Reply sent successfully!");
      setMessages((prev) =>
        prev.map((msg) =>
          msg._id === updatedMessage.updatedMessage._id
            ? updatedMessage.updatedMessage
            : msg
        )
      );
      setReplyContent((prev) => ({ ...prev, [messageId]: "" }));
    } catch (err) {
      console.error("Error sending reply:", err);
      alert("Failed to send reply.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <>
      {" "}
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
          <MdOutlineMessage className="text-xl sm:text-2xl text-white md:text-gray-500" />
          {/* <IoNotifications className="text-xl sm:text-2xl text-white md:text-gray-500" /> */}
          <button
            onClick={handleLogout}
            className="sm:bg-red-500 text-white sm:px-3 md:px-4 py-[6px] md:py-2 rounded-md transition flex items-center gap-2"
          >
            <span className="hidden sm:flex"> Logout</span>
            <TbLogout className="text-xl sm:text-2xl" />
          </button>
        </div>
      </header>
      <div className="min-h-screen bg-[#f8fafc] p-4 sm:p-6 md:p-12">
        <h1 className="text-center text-2xl sm:text-3xl font-semibold text-[#003E47] mb-4 sm:mb-6">
          Tutor Messages
        </h1>
        <ul className="space-y-4 sm:space-y-6">
          {messages.map((msg) => (
            <li
              key={msg._id}
              className="bg-white p-4 sm:p-6 shadow-md rounded-lg border border-[#00A1AB]"
            >
              <h2 className="text-xl font-bold text-[#003E47] mb-2">
                {msg.courseName}
              </h2>
              <p className="text-gray-700 mb-2">
                <strong>Student Message:</strong> {msg.userMessage}
              </p>
              <p className="text-gray-500 mb-4">
                <strong>Date:</strong> {new Date(msg.date).toLocaleDateString()}
              </p>
              {msg.replies && msg.replies.length > 0 ? (
                <ul className="text-[#00A1AB] mb-4">
                  <strong>Tutor's Replies:</strong>
                  {msg.replies.map((reply, index) => (
                    <li key={index} className="ml-4">
                      - {reply}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-400 italic mb-4">No replies yet.</p>
              )}
              <textarea
                value={replyContent[msg._id] || ""}
                onChange={(e) => handleReplyChange(msg._id, e.target.value)}
                placeholder="Write your reply here..."
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A1AB] mb-4"
              ></textarea>
              <button
                onClick={() => handleSendReply(msg._id)}
                className="bg-[#003E47] text-white px-6 py-2 rounded hover:bg-[#002d37] transition"
              >
                Send Reply
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default TutorMessagePage;
