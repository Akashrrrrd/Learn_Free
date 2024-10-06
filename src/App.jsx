import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/enroll" element={<Enroll />} />
        <Route path="/video-page" element={<VideoPage />} />
        <Route path="/ai" element={<AI />} />
        <Route path="/faq" element={<FAQ />} />
        <Route
          path="/login"
          element={<Login onLoginSuccess={handleLoginSuccess} />}
        />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <ConnectNow />
      <Footer />
    </Router>
  );
};

export default App;
