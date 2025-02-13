import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Dashboard from "./components/Dashboard/Dashboard";
import Enroll from "./pages/Enroll/Enroll";
import VideoPage from "./pages/VideoPage/VideoPage";
import AI from "./pages/AI/AI";
import FAQ from "./pages/FAQ/FAQ";
import Login from "./pages/Login/Login";
import Quiz from "./pages/Quiz/Quiz";
import Courses from "./components/Courses/Courses";
import Profile from "./pages/Profile/Profile";
import Loading from "./components/Loading/Loading";
import Room from "./pages/Room/Room";
import Grades from "./pages/Grades/Grades";
import Chatbot from "./pages/Chatbot/Chatbot";
import Attendance from "./pages/Attendance/Attendance";
import Schedule from "./pages/Schedule/Schedule";
import Resume from "./pages/Resume/Resume";
import QRcode from "./pages/QRcode/QRcode";
import Detector from "./pages/Detector/Detector";
import AddStudent from "./components/AddStudent/AddStudent.jsx";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    setIsLoggedIn(!!userToken);

    // Simulate loading delay
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/home"
          element={isLoggedIn ? <Home /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/detector"
          element={isLoggedIn ? <Detector /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/"
          element={
            isLoggedIn ? <Dashboard /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/courses"
          element={isLoggedIn ? <Courses /> : <Navigate to="/login" replace />}
        />
        <Route
            path="/addstudents"
            element={isLoggedIn ? <AddStudent /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/profile"
          element={isLoggedIn ? <Profile /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/enroll"
          element={isLoggedIn ? <Enroll /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/grades"
          element={isLoggedIn ? <Grades /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/schedule"
          element={isLoggedIn ? <Schedule /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/resume"
          element={isLoggedIn ? <Resume /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/room"
          element={isLoggedIn ? <Room /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/quiz"
          element={isLoggedIn ? <Quiz /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/ai"
          element={isLoggedIn ? <AI /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/faq"
          element={isLoggedIn ? <FAQ /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/chatbot"
          element={isLoggedIn ? <Chatbot /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/attendance"
          element={
            isLoggedIn ? <Attendance /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/video-page"
          element={
            isLoggedIn ? <VideoPage /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/code"
          element={isLoggedIn ? <QRcode /> : <Navigate to="/login" replace />}
        />
      </Routes>
    </Router>
  );
};

export default App;
