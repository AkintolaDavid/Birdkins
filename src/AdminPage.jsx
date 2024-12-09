import React, { useState, useEffect } from "react";

const AdminPage = () => {
  const [course, setCourse] = useState({
    title: "",
    rating: 0,
    lecturer: "",
    emails: "",
    description: "",
    img: "",
    category: "",
    topics: "",
  });

  const [tutors, setTutors] = useState([]);
  const [selectedEmails, setSelectedEmails] = useState([]);

  // Fetch tutors when the component is mounted
  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const response = await fetch(
          "https://birdkin-server.onrender.com/api/tutors"
        );
        const data = await response.json();
        setTutors(data); // Set the fetched tutors to the state
      } catch (error) {
        console.error("Error fetching tutors:", error);
      }
    };

    fetchTutors();
  }, []);

  const handleAddEmail = (email) => {
    if (!selectedEmails.includes(email)) {
      const updatedEmails = [...selectedEmails, email];
      setSelectedEmails(updatedEmails);
      setCourse((prevCourse) => ({
        ...prevCourse,
        emails: updatedEmails.join(", "),
      }));
    }
  };

  const handleRemoveEmail = (email) => {
    const updatedEmails = selectedEmails.filter((e) => e !== email);
    setSelectedEmails(updatedEmails);
    setCourse((prevCourse) => ({
      ...prevCourse,
      emails: updatedEmails.join(", "),
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse({ ...course, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(course);
    try {
      const response = await fetch(
        "https://birdkin-server.onrender.com/api/courses",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...course,
            topics: course.topics.split(",").map((topic) => topic.trim()),
          }),
        }
      );

      if (response.ok) {
        alert("Course created successfully!");
        setCourse({
          title: "",
          rating: 0,
          lecturer: "",
          emails: "",
          description: "",
          img: "",
          category: "",
          topics: "",
        });
        setSelectedEmails([]);
      } else {
        alert("Failed to create course.");
      }
    } catch (error) {
      console.error("Error creating course:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Admin - Create Course</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          value={course.title}
          onChange={handleChange}
          placeholder="Course Title"
          className="w-full p-3 border rounded"
          required
        />
        <input
          name="rating"
          type="number"
          value={course.rating}
          onChange={handleChange}
          placeholder="Rating"
          className="w-full p-3 border rounded"
          min="0"
          max="5"
        />
        <input
          name="lecturer"
          value={course.lecturer}
          onChange={handleChange}
          placeholder="Lecturer Name"
          className="w-full p-3 border rounded"
          required
        />

        {/* Display selected tutor emails */}
        <input
          name="emails"
          value={course.emails}
          onChange={handleChange}
          placeholder="Selected Tutor Emails"
          className="w-full p-3 border rounded"
          readOnly
        />

        {/* Tutor email buttons */}
        <div className="flex flex-wrap gap-2">
          {tutors.map((tutor) => (
            <button
              key={tutor.email}
              type="button"
              className={`px-3 py-2 rounded ${
                selectedEmails.includes(tutor.email)
                  ? "bg-green-500 text-white"
                  : "bg-gray-300 text-black"
              }`}
              onClick={() =>
                selectedEmails.includes(tutor.email)
                  ? handleRemoveEmail(tutor.email)
                  : handleAddEmail(tutor.email)
              }
            >
              {tutor.fullName} ({tutor.email})
            </button>
          ))}
        </div>

        <textarea
          name="description"
          value={course.description}
          onChange={handleChange}
          placeholder="Course Description"
          className="w-full p-3 border rounded"
          rows="4"
        ></textarea>
        <input
          name="img"
          value={course.img}
          onChange={handleChange}
          placeholder="Image URL"
          className="w-full p-3 border rounded"
        />
        <input
          name="category"
          value={course.category}
          onChange={handleChange}
          placeholder="Category"
          className="w-full p-3 border rounded"
        />
        <textarea
          name="topics"
          value={course.topics}
          onChange={handleChange}
          placeholder="Topics (comma-separated)"
          className="w-full p-3 border rounded"
          rows="4"
        ></textarea>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Create Course
        </button>
      </form>
    </div>
  );
};

export default AdminPage;
