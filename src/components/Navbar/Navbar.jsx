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
import { getFirestore, doc, getDoc } from "firebase/firestore";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();
  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setIsLoggedIn(!!user);
      if (user) {
        // Fetch user role from Firestore
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setUserRole(userDoc.data().role);
        }
      } else {
        setUserRole(null);
      }
    });
    return () => unsubscribe();
  }, [auth, db]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUserRole(null);
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const renderNavLinks = () => {
    const commonLinks = [
      <li key="home" className="navbar-item">
        <Link to="/" className="navbar-links" onClick={toggleMenu}>
          Home
        </Link>
      </li>,
    ];

    if (!isLoggedIn) {
      return [
        ...commonLinks,
        <li key="login" className="navbar-item">
          <Link to="/login" className="navbar-links" onClick={toggleMenu}>
            Login
          </Link>
        </li>,
      ];
    }

    const roleSpecificLinks = {
      Principal: [
        <li key="departments" className="navbar-item">
          <Link to="/courses" className="navbar-links" onClick={toggleMenu}>
            Departments
          </Link>
        </li>,
        <li key="grades" className="navbar-item">
          <Link to="/grades" className="navbar-links" onClick={toggleMenu}>
            Grades
          </Link>
        </li>,
      ],
      HOD: [
        <li key="departments" className="navbar-item">
          <Link to="/courses" className="navbar-links" onClick={toggleMenu}>
            Departments
          </Link>
        </li>,
        <li key="grades" className="navbar-item">
          <Link to="/grades" className="navbar-links" onClick={toggleMenu}>
            Grades
          </Link>
        </li>,
        <li key="rooms" className="navbar-item">
          <Link to="/room" className="navbar-links" onClick={toggleMenu}>
            Rooms
          </Link>
        </li>,
      ],
      Staff: [
        <li key="departments" className="navbar-item">
          <Link to="/courses" className="navbar-links" onClick={toggleMenu}>
            Departments
          </Link>
        </li>,
        <li key="grades" className="navbar-item">
          <Link to="/grades" className="navbar-links" onClick={toggleMenu}>
            Grades
          </Link>
        </li>,
        <li key="rooms" className="navbar-item">
          <Link to="/room" className="navbar-links" onClick={toggleMenu}>
            Rooms
          </Link>
        </li>,
      ],
      Student: [
        <li key="rooms" className="navbar-item">
          <Link to="/room" className="navbar-links" onClick={toggleMenu}>
            Rooms
          </Link>
        </li>,
      ],
    };

    return [
      ...commonLinks,
      ...(roleSpecificLinks[userRole] || []),
      <li key="logout" className="navbar-item">
        <Link to="#" className="navbar-links" onClick={handleLogout}>
          Logout
        </Link>
      </li>,
    ];
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
          {renderNavLinks()}
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
