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
      return [<Link to="/login" key="login">Login</Link>];
    }

    const roleSpecificLinks = {
      principal: [<Link to="/courses" key="departments">Departments</Link>],
      hod: [<Link to="/grades" key="grades">Grades</Link>, <Link to="/attendance" key="attendance">Attendance</Link>, <Link to="/courses" key="departments">Departments</Link>],
      staff: [<Link to="/grades" key="grades">Grades</Link>, <Link to="/schedule" key="schedule">Schedule</Link>, <Link to="/attendance" key="attendance">Attendance</Link>, <Link to="/courses" key="departments">Departments</Link>],
      student: [<Link to="/schedule" key="schedule">Schedule</Link>, <Link to="/resume" key="resume">Resume</Link>],
    };

    return [...(roleSpecificLinks[userRole] || []), <button onClick={handleLogout} key="logout">Logout</button>];
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