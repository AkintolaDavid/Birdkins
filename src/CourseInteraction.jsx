import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import TimePicker from "react-time-picker";
import { useParams, useNavigate } from "react-router-dom";

const CourseInteraction = () => {
  const { id } = useParams(); // Extract course ID from URL
  const navigate = useNavigate(); // For back navigation
  const [course, setCourse] = useState(null); // Course data from MongoDB
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("10:00");

  // Fetch course data from MongoDB
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(
          `https://birdkin-server.onrender.com/api/courses/${id}` // Replace with your API endpoint
        );
        if (!response.ok) {
          throw new Error("Failed to fetch course details.");
        }
        const data = await response.json();
        setCourse(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  const handleFileUpload = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSendMessage = async () => {
    if (!message || !date || !time) {
      alert("Please fill in all required fields.");
      return;
    }

    const userId = localStorage.getItem("userID");
    if (!userId) {
      alert("User not signed in.");
      return;
    }

    const formData = new FormData();
    formData.append("message", message);
    if (file) formData.append("file", file);
    formData.append("date", date.toISOString());
    formData.append("time", time);
    formData.append("courseName", course?.title || "Unknown Course");
    formData.append("userId", userId);

    try {
      const response = await fetch(
        "https://birdkin-server.onrender.com/api/interactions",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        alert("Message sent successfully!");
        setMessage("");
        setFile(null);
        setDate(new Date());
        setTime("10:00");
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      alert("An error occurred. Please try again.");
    }
  };

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  const { title: courseName, lecturer: lecturerName } = course || {};

  return (
    <div className="min-h-screen bg-[#003E47] text-white p-8">
      <div className="flex items-center mb-4">
        <button
          onClick={() => navigate(-1)}
          className="text-white bg-transparent p-2 rounded-full hover:bg-[#005F67] transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <h2 className="text-xl font-bold ml-4">
          {courseName || "Course Details"}
        </h2>
      </div>

      <div className="bg-[#005F67] p-6 rounded-lg mb-8">
        <h1 className="text-3xl font-bold mb-2">{courseName}</h1>
        <p className="text-lg">
          <span className="font-medium">Lecturer:</span>{" "}
          {lecturerName || "Unknown Lecturer"}
        </p>
      </div>

      <div className="bg-white text-gray-900 rounded-lg shadow-lg p-6 space-y-6">
        <div>
          <label className="block font-semibold mb-2">
            Message or Question:
          </label>
          <textarea
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003E47]"
            rows="4"
            placeholder="Type your message or question here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>

        <div>
          <label className="block font-semibold mb-2">
            Upload Files or Pictures:
          </label>
          <input
            type="file"
            accept="image/*,.pdf,.doc,.docx"
            onChange={handleFileUpload}
            className="w-full p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003E47]"
          />
          {file && (
            <p className="text-sm text-green-600 mt-2">
              File selected: {file.name}
            </p>
          )}
        </div>

        <div>
          <label className="block font-semibold mb-2">
            Select Available Date:
          </label>
          <Calendar
            value={date}
            onChange={setDate}
            className="rounded-lg shadow-md"
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">Select Time:</label>
          <TimePicker
            onChange={setTime}
            value={time}
            disableClock
            clearIcon={null}
            className="w-full p-3 border-2 border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#003E47]"
          />
        </div>

        <button
          className="bg-[#005F67] text-white font-semibold px-6 py-2 rounded-md hover:bg-[#004D55] transition duration-300"
          onClick={handleSendMessage}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default CourseInteraction;
