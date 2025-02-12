import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Enroll from "./pages/Enroll/Enroll";
import VideoPage from "./pages/VideoPage/VideoPage";
import AI from "./pages/AI/AI";
import FAQ from "./pages/FAQ/FAQ";
import Login from "./pages/Login/Login";
import Quiz from "./pages/Quiz/Quiz";
import Courses from "./components/Courses/Courses";
import Profile from "./pages/Profile/Profile";
import Detector from "./pages/Detector/Detector";
import Semesters from "./components/Semesters/Semesters";
import Subjects from "./components/Subjects/Subjects";
import Loading from "./components/Loading/Loading";
import Room from "./pages/Room/Room";
import Grades from "./pages/Grades/Grades";
import Chatbot from "./pages/Chatbot/Chatbot";
import Attendance from "./pages/Attendance/Attendance";
import Schedule from "./pages/Schedule/Schedule";
import Resume from "./pages/Resume/Resume";
import StudentDashboard from "./components/Dashboard/Dashboard";
import QRCodeAttendance from "./pages/QRcode/QRcode";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing user token
    const userToken = localStorage.getItem("userToken");
    setIsLoggedIn(!!userToken);
    setLoading(false);

    const handlePageChange = () => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    };

    window.addEventListener("beforeunload", handlePageChange);

    return () => {
      window.removeEventListener("beforeunload", handlePageChange);
    };
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
      <Router>
        <ScrollToTop />
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <Routes>
          {!isLoggedIn ? (
              <>
                <Route
                    path="/login"
                    element={<Login setIsLoggedIn={setIsLoggedIn} />}
                />
                <Route path="*" element={<Navigate to="/login" replace />} />
              </>
          ) : (
              <>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<StudentDashboard />} />
                <Route path="/enroll" element={<Enroll />} />
                <Route path="/video" element={<VideoPage />} />
                <Route path="/ai" element={<AI />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/quiz" element={<Quiz />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/semesters" element={<Semesters />} />
                <Route path="/subjects" element={<Subjects />} />
                <Route path="/room" element={<Room />} />
                <Route path="/grades" element={<Grades />} />
                <Route path="/chatbot" element={<Chatbot />} />
                <Route path="/attendance" element={<Attendance />} />
                <Route path="/schedule" element={<Schedule />} />
                <Route path="/resume" element={<Resume />} />
                <Route path="/login" element={<Navigate to="/" replace />} />
                <Route path="*" element={<Navigate to="/" replace />} />
                <Route path="/detector" element={<Detector/>}/>
                <Route path="/code" element={<QRcode/>}/>
              </>
          )}
        </Routes>
      </Router>
  );
};

export default App;