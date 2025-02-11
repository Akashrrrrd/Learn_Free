import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRobot,
  faQuestionCircle,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userName");
    setIsLoggedIn(false);
    setUserRole(null);
    navigate("/login");
  };

  // Sync Navbar state with localStorage
  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    const role = localStorage.getItem("userRole");
    setIsLoggedIn(!!userToken);
    setUserRole(role?.toLowerCase() || null);

    // Add event listener for storage changes (e.g., login/logout from other tabs)
    const handleStorageChange = () => {
      const updatedToken = localStorage.getItem("userToken");
      const updatedRole = localStorage.getItem("userRole");
      setIsLoggedIn(!!updatedToken);
      setUserRole(updatedRole?.toLowerCase() || null);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Render navigation links based on user role
  const renderNavLinks = () => {
    const commonLinks = [
      <Link to="/" key="home">
        Home
      </Link>,
    ];

    if (!isLoggedIn) {
      return [
        ...commonLinks,
        <Link to="/login" key="login">
          Login
        </Link>,
      ];
    }

    const roleSpecificLinks = {
      principal: [
        <Link to="/departments" key="departments">
          Departments
        </Link>,
        <Link to="/schedule" key="schedule">
          Schedule
        </Link>,
        <Link to="/grades" key="grades">
          Grades
        </Link>,
      ],
      hod: [
        <Link to="/departments" key="departments">
          Departments
        </Link>,
        <Link to="/grades" key="grades">
          Grades
        </Link>,
        <Link to="/attendance" key="attendance">
          Attendance
        </Link>,
        <Link to="/schedule" key="schedule">
          Schedule
        </Link>,
        <Link to="/room" key="rooms">
          Rooms
        </Link>,
      ],
      staff: [
        <Link to="/departments" key="departments">
          Departments
        </Link>,
        <Link to="/grades" key="grades">
          Grades
        </Link>,
        <Link to="/attendance" key="attendance">
          Attendance
        </Link>,
        <Link to="/schedule" key="schedule">
          Schedule
        </Link>,
        <Link to="/room" key="rooms">
          Rooms
        </Link>,
      ],
      student: [
        <Link to="/departments" key="departments">
          Departments
        </Link>,
        <Link to="/schedule" key="schedule">
          Schedule
        </Link>,
        <Link to="/resume" key="resume">
          Resume
        </Link>,
        <Link to="/room" key="rooms">
          Rooms
        </Link>,
      ],
    };

    return [...commonLinks, ...(roleSpecificLinks[userRole] || []), <button onClick={handleLogout} key="logout">Logout</button>];
  };

  return (
      <nav className="navbar">
        <div className="navbar-container">
          {/* Logo */}
          <div className="navbar-logo">
            <img src={logo} alt="LearnFree Logo" className="navbar-logo-image" />
            LearnFree
          </div>

          {/* Navigation Links */}
          <div className={`navbar-menu ${isOpen ? "active" : ""}`}>
            {renderNavLinks()}
          </div>

          {/* Mobile Menu Icon */}
          <div className="menu-icon" onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>
  );
};

export default Navbar;