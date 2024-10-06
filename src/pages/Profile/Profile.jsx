import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Profile.css";

const Profile = () => {
  const [profileImage, setProfileImage] = useState(() => {
    return localStorage.getItem("profileImage") || "/api/placeholder/150/150";
  });
  const [name, setName] = useState("Akash Rajendran");
  const [email, setEmail] = useState("aakashrajendran2004@gmail.com");
  const [bio, setBio] = useState("Passionate learner | MERN Developer");
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  useEffect(() => {
    localStorage.setItem("profileImage", profileImage);
    const storedCourses = JSON.parse(
      localStorage.getItem("enrolledCourses") || "[]"
    );
    setEnrolledCourses(storedCourses);
  }, [profileImage]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        toast.success("Profile image updated successfully!");
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="pro-profile-container">
      <ToastContainer />
      <div className="pro-profile-header">
        <h1>LearnFree</h1>
        <p>Your Learning Journey</p>
      </div>
      <div className="pro-profile-content">
        <div className="pro-profile-sidebar">
          <div className="pro-profile-image-container">
            <img
              src={profileImage}
              alt="Profile"
              className="pro-profile-image"
            />
            <label className="pro-image-upload-label">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
              Update Photo
            </label>
          </div>
          <div className="pro-profile-stats">
            <div className="pro-stat-item">
              <span className="pro-stat-value">{enrolledCourses.length}</span>
              <span className="pro-stat-label">Courses</span>
            </div>
          </div>
        </div>
        <div className="pro-profile-main">
          <div className="pro-profile-details">
            <h2>Personal Information</h2>
            <div className="pro-profile-field">
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="pro-profile-field">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="pro-profile-field">
              <label htmlFor="bio">Bio</label>
              <textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </div>
          </div>
          <div className="pro-enrolled-courses">
            <h2>Enrolled Courses</h2>
            {enrolledCourses.length > 0 ? (
              <ul className="pro-course-list">
                {enrolledCourses.map((course, index) => (
                  <li key={index} className="pro-course-item">
                    <div className="pro-course-info">
                      <span className="pro-course-name">{course.title}</span>
                      <div className="pro-progress-bar">
                        <div
                          className="pro-progress-fill"
                          style={{ width: `0%` }}
                        ></div>
                      </div>
                    </div>
                    <span className="pro-course-percentage">0%</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>You haven't enrolled in any courses yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
