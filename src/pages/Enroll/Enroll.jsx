import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Enroll.css";

const Enroll = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { course } = location.state || {};

  if (!course) {
    return <h2 className="no-course">No course data available.</h2>;
  }

  const handleEnrollmentSubmit = () => {
    const enrolledCourses = JSON.parse(
      localStorage.getItem("enrolledCourses") || "[]"
    );
    if (!enrolledCourses.some((c) => c.id === course.id)) {
      enrolledCourses.push(course);
      localStorage.setItem("enrolledCourses", JSON.stringify(enrolledCourses));
      toast.success("Enrollment submitted successfully!");
    } else {
      toast.info("You're already enrolled in this course!");
    }
  };

  const handleWatchVideo = () => {
    navigate("/video-page", { state: { course, videoLink: course.videoLink } });
  };

  return (
    <div className="enroll">
      <ToastContainer />
      <div className="enroll-container">
        <h1 className="enroll-title">Enroll in {course.title}</h1>
        <div className="enroll-content">
          <div className="enroll-image-wrapper">
            <div className="enroll-image-container">
              <img
                src={course.image}
                alt={course.title}
                className="enroll-image"
              />
            </div>
          </div>
          <div className="enroll-info">
            <div className="enroll-description">
              <h2>Course Description</h2>
              <p>{course.description}</p>
            </div>
            <div className="enroll-details">
              <div className="detail-item">
                <h3>Category</h3>
                <p>{course.category}</p>
              </div>
              <div className="detail-item">
                <h3>Duration</h3>
                <p>{course.duration}</p>
              </div>
              <div className="detail-item">
                <h3>Level</h3>
                <p>{course.level}</p>
              </div>
            </div>
            <div className="btns">
              <button
                className="submit-enroll-button"
                onClick={handleEnrollmentSubmit}
              >
                Submit Enrollment
              </button>
              <button
                className="submit-enroll-button"
                onClick={handleWatchVideo}
              >
                Watch Video
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Enroll;
