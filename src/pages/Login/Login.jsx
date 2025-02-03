import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../assets/logo.png";
import "./Login.css";

const firebaseConfig = {
  apiKey: "AIzaSyARyrQXtlZlbA9s45wonWAzEv3H6u4yxVA",
  authDomain: "learnfree-f8152.firebaseapp.com",
  projectId: "learnfree-f8152",
  storageBucket: "learnfree-f8152.appspot.com",
  messagingSenderId: "15333691794",
  appId: "1:15333691794:web:453b428885a7e11b77f14b",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const Login = () => {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("Student");
  const [department, setDepartment] = useState("Computer Science");
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();

  const toggleSignUp = () => {
    setIsSignUp(!isSignUp);
    setEmail("");
    setPassword("");
  };

  const handleSocialLogin = async (provider) => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        await setDoc(userDocRef, {
          email: user.email,
          role: "Student",
          department: "Computer Science",
          createdAt: new Date(),
        });
      }

      toast.success("Logged in successfully!");
      navigate("/");
    } catch (error) {
      toast.error(`Social Login Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    if (!validatePassword(password)) {
      toast.error("Password must be at least 8 characters long.");
      setLoading(false);
      return;
    }

    try {
      if (isSignUp) {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;

        await setDoc(doc(db, "users", user.uid), {
          email,
          role,
          department,
          createdAt: new Date(),
        });

        toast.success("Account created successfully!");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        toast.success("Logged in successfully!");
      }
      navigate("/");
    } catch (error) {
      toast.error(`${isSignUp ? "Sign Up" : "Login"} Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.info("Logged out successfully!");
      setUser(null);
    } catch (error) {
      toast.error("Logout Error: " + error.message);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) navigate("/");
    });
    return () => unsubscribe();
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

  const roles = ["Student", "Staff", "HOD", "Principal"];

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
                <button
                  onClick={handleLogout}
                  className="submit-btn"
                  disabled={loading}
                >
                  {loading ? "Logging Out..." : "Logout"}
                </button>
              </div>
            ) : (
              <div className="auth-form">
                <h2>
                  {isSignUp
                    ? "Join Our Learning Community"
                    : "Welcome Back, Learner!"}
                </h2>

                <form onSubmit={handleSubmit} className="login-form">
                  {isSignUp && (
                    <>
                      <div className="form-group">
                        <label htmlFor="role">Select Role:</label>
                        <select
                          id="role"
                          value={role}
                          onChange={(e) => setRole(e.target.value)}
                          required
                        >
                          {roles.map((role) => (
                            <option key={role} value={role}>
                              {role}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="form-group">
                        <label htmlFor="department">Select Department:</label>
                        <select
                          id="department"
                          value={department}
                          onChange={(e) => setDepartment(e.target.value)}
                          required
                        >
                          {departments.map((dept) => (
                            <option key={dept} value={dept}>
                              {dept}
                            </option>
                          ))}
                        </select>
                      </div>
                    </>
                  )}

                  <div className="form-group">
                    <input
                      type="email"
                      id="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <input
                      type="password"
                      id="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="submit-btn"
                    disabled={loading}
                  >
                    {loading
                      ? isSignUp
                        ? "Creating Account..."
                        : "Logging In..."
                      : isSignUp
                      ? "Start Learning"
                      : "Continue Learning"}
                  </button>
                </form>

                <div className="login-divider">
                  <span>or</span>
                </div>

                <p className="toggle-form">
                  {isSignUp
                    ? "Already part of our community?"
                    : "New to LearnFree?"}
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
