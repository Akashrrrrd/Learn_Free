import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRobot,
  faQuestionCircle,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });
    return () => unsubscribe();
  }, [auth]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <div className="logo-container">
            <img src={logo} alt="Logo" className="navbar-logo-image" />
            <span className="navbar-title">LearnFree</span>
          </div>
        </Link>
        <div
          className={`menu-icon ${isOpen ? "open" : ""}`}
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
        <ul className={`navbar-menu ${isOpen ? "active" : ""}`}>
          <li className="navbar-item">
            <Link to="/" className="navbar-links" onClick={toggleMenu}>
              Home
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/courses" className="navbar-links" onClick={toggleMenu}>
              Departments
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/grades" className="navbar-links" onClick={toggleMenu}>
              Grades
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/room" className="navbar-links" onClick={toggleMenu}>
              Rooms
            </Link>
          </li>
          {/* <li className="navbar-item">
            <Link to="/ai" className="navbar-links" onClick={toggleMenu}>
              AI
            </Link>
          </li> */}
          {isLoggedIn ? (
            <li className="navbar-item">
              <Link className="navbar-links" onClick={handleLogout}>
                Logout
              </Link>
            </li>
          ) : (
            <li className="navbar-item">
              <Link to="/login" className="navbar-links" onClick={toggleMenu}>
                Login
              </Link>
            </li>
          )}
        </ul>
        <div className="navbar-icons">
          <Link to="/ai" className="navbar-ai-icon">
            <FontAwesomeIcon
              icon={faRobot}
              size="2x"
              style={{ color: "white" }}
            />
          </Link>
          <Link to="/faq" className="navbar-help-icon">
            <FontAwesomeIcon
              icon={faQuestionCircle}
              size="2x"
              style={{ color: "white", marginLeft: "20px" }}
            />
          </Link>
          {isLoggedIn && (
            <Link to="/profile" className="navbar-user-icon">
              <FontAwesomeIcon
                icon={faUser}
                size="2x"
                style={{ color: "white", marginLeft: "20px" }}
              />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
