import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Enroll from "./pages/Enroll/Enroll";
import ConnectNow from "./components/ConnectNow/ConnectNow";
import Footer from "./components/Footer/Footer";
import VideoPage from "./pages/VideoPage/VideoPage";
import AI from "./pages/AI/AI";
import FAQ from "./pages/FAQ/FAQ";
import Login from "./pages/Login/Login";
import Quiz from "./pages/Quiz/Quiz";
import Courses from "./components/Courses/Courses";
import Profile from "./pages/Profile/Profile";
import Semesters from "./components/Semesters/Semesters";
import Subjects from "./components/Subjects/Subjects";
import Loading from "./components/Loading/Loading"; // Import Loading component
import CSE_Subjects from "./pages/CSE_Subjects/CSE_Subjects";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state for page transitions

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  // Trigger loading state during navigation
  const startLoading = () => {
    setLoading(true);
  };

  const stopLoading = () => {
    setLoading(false);
  };

  useEffect(() => {
    // This function simulates loading when navigating or loading resources.
    const handlePageChange = () => {
      startLoading(); // Show loading state when navigating
      setTimeout(() => {
        stopLoading(); // Stop loading after a delay (simulate a network or page load)
      }, 1500); // Adjust delay as needed
    };

    // Add event listener for page transitions (optional)
    window.addEventListener("beforeunload", handlePageChange);

    return () => {
      window.removeEventListener("beforeunload", handlePageChange);
    };
  }, []);

  return (
    <Router>
  <ScrollToTop />  {/* This will ensure every page scrolls to top */}
  <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />

  {loading ? <Loading /> : (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/enroll" element={<Enroll />} />
      <Route path="/video-page" element={<VideoPage />} />
      <Route path="/ai" element={<AI />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/semesters" element={<Semesters />} />
      <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
      <Route path="/quiz" element={<Quiz />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/department/:department/semester/:semester" element={<Subjects />} />
      <Route path="/cse_subjects" element={<CSE_Subjects />} />
    </Routes>
  )}
</Router>
  );
};

export default App;
