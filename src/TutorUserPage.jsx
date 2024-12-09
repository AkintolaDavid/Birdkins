import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { FaPaperPlane } from "react-icons/fa";

const TutorUserPage = () => {
  const [messages, setMessages] = useState([]); // Ensure it's initialized as an array
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    // Mock API call
    fetch("/api/messages")
      .then((res) => res.json())
      .then((data) => setMessages(Array.isArray(data) ? data : []))
      .catch((err) => console.error(err));
  }, []);

  const handleSendMessage = () => {
    const message = { id: Date.now(), text: newMessage };
    setMessages([...messages, message]);
    setNewMessage("");
  };

  return (
    <div>
      <h1>Tutor/User Messaging</h1>
      <div>
        {Array.isArray(messages) && messages.length > 0 ? (
          messages.map((message) => <div key={message.id}>{message.text}</div>)
        ) : (
          <p>No messages yet.</p>
        )}
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <button onClick={handleSendMessage}>
        <FaPaperPlane /> Send
      </button>
      <Calendar />
    </div>
  );
};

export default TutorUserPage;
