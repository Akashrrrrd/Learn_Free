import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "./../../assets/logo.png";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("MALE");
  const [mobileNumber, setMobileNumber] = useState("");
  const [activationCode, setActivationCode] = useState("");
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("STAFF");
  const [department, setDepartment] = useState("ECE");
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const BASE_URL = "http://localhost:8080/learn-free";
  const EMAIL_VALIDATION_URL = `${BASE_URL}/registration/email-validation`;
  const VERIFY_REGISTRATION_URL = `${BASE_URL}/registration/verify`;
  const LOGIN_URL = `${BASE_URL}/authentication`;

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const toggleSignUp = () => {
    setIsSignUp(!isSignUp);
    resetForm();
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
    setGender("MALE");
    setMobileNumber("");
    setActivationCode("");
    setEmailSent(false);
  };

  const sendVerificationEmail = async () => {
    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.get(`${EMAIL_VALIDATION_URL}/${email}`, {});
      if (response.data.status) {
        toast.success("Verification email has been sent successfully!");
        setEmailSent(true);
      }
    } catch (error) {
      toast.error(`Email Verification Error: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async () => {
    if (!firstName || !lastName || !mobileNumber || !activationCode) {
      toast.error("Please fill in all required fields.");
      return;
    }
    try {
      setLoading(true);
      const payload = {
        firstName,
        lastName,
        gender,
        mobileNumber,
        email,
        password,
        role,
        department,
        activationCode,
      };
      const response = await axios.post(VERIFY_REGISTRATION_URL, payload, {});
      if (response.data.status) {
        toast.success("Registration verified successfully! Please log in.");
        setIsSignUp(false);
      }
    } catch (error) {
      toast.error(`Registration Error: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    try {
      setLoading(true);
      const payload = { email, password };
      const response = await axios.post(LOGIN_URL, payload);
      const userData = response.data;
      userData.userEmail = undefined;
      localStorage.setItem("userToken", userData.jwtToken);
      localStorage.setItem("userEmail", userData.email);
      localStorage.setItem("userId", userData.userId);
      localStorage.setItem("userRole", userData.role);
      localStorage.setItem("userName", `${userData.firstName} ${userData.lastName}`);
      localStorage.setItem("userGender", userData.gender);
      localStorage.setItem("userAge", userData.age);
      localStorage.setItem("userMobile", userData.mobileNumber);
      localStorage.setItem("userDepartment", userData.department);
      window.dispatchEvent(new Event("authChange"));
      toast.success("Logged in successfully!");
      navigate(userData.role.toLowerCase() === "student" ? "/courses" : "/");
    } catch (error) {
      toast.error(`Login Error: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSignUp) {
      if (!emailSent) {
        await sendVerificationEmail();
      } else {
        await handleSignUp();
      }
    } else {
      await handleLogin();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userName");
    setUser(null);
    toast.info("Logged out successfully!");
    navigate("/login");
  };

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    const email = localStorage.getItem("userEmail");
    if (token) {
      setUser({ email });
      navigate("/");
    }
  }, [navigate]);

  const departments = [
    "Computer Science",
    "Information Technology",
    "Electronics & Communication",
    "Electrical & Electronics",
    "Mechanical Engineering",
    "Civil Engineering",
    "Artificial Intelligence and Data Science",
    "AI and Machine Learning",
  ];

  const roles = ["STAFF", "HOD", "PRINCIPAL"];

  return (
      <div className="login-container">
        <ToastContainer />
        <div className="login-content">
          <div className="login-left">
            <div className="login-header">
              <img src={logo} alt="LearnFree Logo" className="login-logo" />
              <h1>LearnFree</h1>
              <p>
                Breaking barriers, connecting minds—where students and teachers
                collaborate effortlessly.
              </p>
            </div>
          </div>
          <div className="login-right">
            <div className="login-form-container">
              {user ? (
                  <div className="logged-in-view">
                    <h2>
                      Welcome to <span>LearnFree</span>,{" "}
                      {user.email.split("@")[0].charAt(0).toUpperCase() +
                          user.email.split("@")[0].slice(1)}
                    </h2>
                    <button onClick={handleLogout} className="submit-btn" disabled={loading}>
                      {loading ? "Logging Out..." : "Logout"}
                    </button>
                  </div>
              ) : (
                  <div className="auth-form">
                    <h2>
                      {isSignUp
                          ? emailSent
                              ? "Complete Your Registration"
                              : "Join Our Learning Community"
                          : "Welcome Back, Learner!"}
                    </h2>
                    <form onSubmit={handleSubmit} className="login-form">
                      {isSignUp && (
                          <>
                            {!emailSent ? (
                                <div className="form-group">
                                  <input type="email" id="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                </div>
                            ) : (
                                <>
                                  <div className="form-group">
                                    <input type="text" id="firstName" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                                  </div>
                                  <div className="form-group">
                                    <input type="text" id="lastName" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                                  </div>
                                  <div className="form-group">
                                    <label htmlFor="gender">Gender:</label>
                                    <select id="gender" value={gender} onChange={(e) => setGender(e.target.value)} required>
                                      <option value="MALE">Male</option>
                                      <option value="FEMALE">Female</option>
                                      <option value="OTHER">Other</option>
                                    </select>
                                  </div>
                                  <div className="form-group">
                                    <input type="tel" id="mobileNumber" placeholder="Mobile Number" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} required />
                                  </div>
                                  <div className="form-group">
                                    <label htmlFor="role">Select Role:</label>
                                    <select id="role" value={role} onChange={(e) => setRole(e.target.value)} required>
                                      {roles.map((roleOption) => (
                                          <option key={roleOption} value={roleOption}>{roleOption}</option>
                                      ))}
                                    </select>
                                  </div>
                                  <div className="form-group">
                                    <label htmlFor="department">Select Department:</label>
                                    <select id="department" value={department} onChange={(e) => setDepartment(e.target.value)} required>
                                      {departments.map((dept) => (
                                          <option key={dept} value={dept}>{dept}</option>
                                      ))}
                                    </select>
                                  </div>
                                  <div className="form-group">
                                    <input type="text" id="activationCode" placeholder="Activation Code" value={activationCode} onChange={(e) => setActivationCode(e.target.value)} required />
                                  </div>
                                </>
                            )}
                            <div className="form-group">
                              <input type="password" id="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                            </div>
                          </>
                      )}
                      {!isSignUp && (
                          <>
                            <div className="form-group">
                              <input type="email" id="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            </div>
                            <div className="form-group">
                              <input type="password" id="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                            </div>
                          </>
                      )}
                      <button type="submit" className="submit-btn" disabled={loading}>
                        {loading
                            ? isSignUp
                                ? emailSent
                                    ? "Verifying..."
                                    : "Sending Verification..."
                                : "Logging In..."
                            : isSignUp
                                ? emailSent
                                    ? "Complete Registration"
                                    : "Send Verification Email"
                                : "Continue Learning"}
                      </button>
                    </form>
                    <div className="login-divider">
                      <span>or</span>
                    </div>
                    <p className="toggle-form">
                      {isSignUp ? "Already part of our community?" : "New to LearnFree?"}
                      <button onClick={toggleSignUp}>
                        {isSignUp ? "Log In" : "Sign Up"}
                      </button>
                    </p>
                  </div>
              )}
            </div>
          </div>
        </div>
      </div>
  );
};

export default Login;
