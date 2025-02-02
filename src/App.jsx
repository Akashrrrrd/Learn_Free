import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
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
import Loading from "./components/Loading/Loading";
import Room from "./pages/Room/Room";
import Grades from "./pages/Grades/Grades";
import Chatbot from "./pages/Chatbot/Chatbot";


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
      setLoading(false);
    });

    const handlePageChange = () => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    };

    window.addEventListener("beforeunload", handlePageChange);

    return () => {
      unsubscribe();
      window.removeEventListener("beforeunload", handlePageChange);
    };
  }, [auth]);

  if (loading) {
    return <Loading />;
  }

  return (
    <Router>
      <ScrollToTop />
      {isLoggedIn && <Navbar />}

      <Routes>
        {!isLoggedIn ? (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/enroll" element={<Enroll />} />
            <Route path="/video-page" element={<VideoPage />} />
            <Route path="/ai" element={<AI />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/semesters" element={<Semesters />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/profile" element={<Profile />} />
            <Route
              path="/department/:department/semester/:semester"
              element={<Subjects />}
            />
            <Route path="/room" element={<Room />} />
            <Route path="/login" element={<Navigate to="/" />} />
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/grades" element={<Grades/>}/>
          </>
        )}
      </Routes>
      <Chatbot/>
    </Router>
  );
};

export default App;
