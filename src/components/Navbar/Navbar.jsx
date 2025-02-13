import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import logo from "../../assets/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setUserRole(null);
    window.dispatchEvent(new Event("authChange"));
    navigate("/login");
  };

  useEffect(() => {
    const updateUserState = () => {
      const userToken = localStorage.getItem("userToken");
      const role = localStorage.getItem("userRole");
      setIsLoggedIn(!!userToken);
      setUserRole(role?.toLowerCase() || null);
    };

    updateUserState();
    window.addEventListener("authChange", updateUserState);

    return () => {
      window.removeEventListener("authChange", updateUserState);
    };
  }, []);

  const renderNavLinks = () => {
    if (!isLoggedIn) {
      return [
        <Link to="/login" key="login" className="navbar-links">
          Login
        </Link>,
      ];
    }

    const roleSpecificLinks = {
      principal: [
        <Link to="/departments" key="departments" className="navbar-links">
          Departments
        </Link>,
        <Link to="/grades" key="grades" className="navbar-links">
          Grades
        </Link>,
        <Link to="/schedule" key="schedule" className="navbar-links">
          Schedule
        </Link>,
      ],
      hod: [
        <Link to="/" key="dashboard" className="navbar-links">
          Dashboard
        </Link>,
        <Link to="/courses" key="departments" className="navbar-links">
          Departments
        </Link>,
        <Link to="/grades" key="grades" className="navbar-links">
          Grades
        </Link>,
        <Link to="/schedule" key="schedule" className="navbar-links">
          Schedule
        </Link>,
        <Link to="/attendance" key="attendance" className="navbar-links">
          Attendance
        </Link>,
        <Link to="/detector" key="detector" className="navbar-links">
          Detector
        </Link>,
      ],
      staff: [
        <Link to="/" key="dashboard" className="navbar-links">
          Dashboard
        </Link>,
        <Link to="/courses" key="departments" className="navbar-links">
          Departments
        </Link>,
        <Link to="/grades" key="grades" className="navbar-links">
          Grades
        </Link>,
        <Link to="/schedule" key="schedule" className="navbar-links">
          Schedule
        </Link>,
        <Link to="/attendance" key="attendance" className="navbar-links">
          Attendance
        </Link>,
        <Link to="/detector" key="detector" className="navbar-links">
          Detector
        </Link>,
      ],
      student: [
        <Link to="/" key="dashboard" className="navbar-links">
          Dashboard
        </Link>,
        <Link to="/courses" key="departments" className="navbar-links">
          Departments
        </Link>,
        <Link to="/grades" key="grades" className="navbar-links">
          Grades
        </Link>,
        <Link to="/schedule" key="schedule" className="navbar-links">
          Schedule
        </Link>,
        <Link to="/resume" key="resume" className="navbar-links">
          Resume
        </Link>,
        <Link to="/profile" key="profile" className="navbar-links">
          Profile
        </Link>,
      ],
    };

    return [
      ...(roleSpecificLinks[userRole] || []),
      <button onClick={handleLogout} key="logout" className="logout-button">
        Logout
      </button>,
    ];
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <img src={logo} alt="LearnFree Logo" className="navbar-logo-image" />
          LearnFree
        </div>
        <div className={`navbar-menu ${isOpen ? "active" : ""}`}>
          {renderNavLinks()}
        </div>
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
