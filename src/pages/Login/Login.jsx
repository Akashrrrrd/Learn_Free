import React, { useEffect, useState } from "react";
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
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../assets/logo.png";
import "./Login.css";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyARyrQXtlZlbA9s45wonWAzEv3H6u4yxVA",
  authDomain: "learnfree-f8152.firebaseapp.com",
  projectId: "learnfree-f8152",
  storageBucket: "learnfree-f8152.appspot.com",
  messagingSenderId: "15333691794",
  appId: "1:15333691794:web:453b428885a7e11b77f14b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Generate Unique Student Code
const generateStudentCode = () => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < 8; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return code;
};

const Login = ({ onLoginSuccess }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("Student");
  const [department, setDepartment] = useState("Computer Science");
  const [loading, setLoading] = useState(false);
  const [selectedRoleAccess, setSelectedRoleAccess] = useState("");
  const [studentCode, setStudentCode] = useState("");
  const [verificationCode, setVerificationCode] = useState("");

  // Validation functions
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  // Social Login Providers
  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();

  // Toggle between Login and Sign Up
  const toggleSignUp = () => {
    setIsSignUp(!isSignUp);
    // Reset form when switching
    setEmail("");
    setPassword("");
    setUsername("");
    setSelectedRoleAccess("");
    setStudentCode("");
    setVerificationCode("");
  };

  // Verify Student Code
  const verifyStudentCode = async (code) => {
    try {
      const studentCodeRef = collection(db, "student_codes");
      const q = query(
        studentCodeRef,
        where("code", "==", code),
        where("used", "==", false)
      );
      const querySnapshot = await getDocs(q);

      return !querySnapshot.empty;
    } catch (error) {
      console.error("Error verifying student code:", error);
      return false;
    }
  };

  // Mark Student Code as Used
  const markStudentCodeAsUsed = async (code) => {
    try {
      const studentCodeRef = collection(db, "student_codes");
      const q = query(studentCodeRef, where("code", "==", code));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0].ref;
        await setDoc(docRef, { used: true }, { merge: true });
      }
    } catch (error) {
      console.error("Error marking student code as used:", error);
    }
  };

  // Handle Social Login
  const handleSocialLogin = async (provider) => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check if user exists in Firestore
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      // If user doesn't exist, create a default profile
      if (!userDoc.exists()) {
        await setDoc(userDocRef, {
          email: user.email,
          username: user.displayName || user.email.split("@")[0],
          role: "Student",
          department: "Computer Science",
          roleAccess: "student",
          studentCode: generateStudentCode(), // Generate unique code for social login
          createdAt: new Date(),
        });
      }

      toast.success("Logged in successfully!");
      onLoginSuccess();
    } catch (error) {
      toast.error(`Social Login Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validation
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

    // Student Code Verification for Student Role
    if (role === "Student" && isSignUp) {
      const isValidCode = await verifyStudentCode(studentCode);
      if (!isValidCode) {
        toast.error("Invalid or already used student code.");
        setLoading(false);
        return;
      }
    }

    try {
      if (isSignUp) {
        // Sign Up Process
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;

        // Create user profile in Firestore
        await setDoc(doc(db, "users", user.uid), {
          email,
          username: username || email.split("@")[0],
          role,
          department,
          roleAccess: selectedRoleAccess.toLowerCase(),
          studentCode: role === "Student" ? studentCode : null,
          verificationCode: generateStudentCode(), // Additional verification code
          createdAt: new Date(),
        });

        // Mark student code as used
        if (role === "Student") {
          await markStudentCodeAsUsed(studentCode);
        }

        toast.success("Account created successfully!");
      } else {
        // Login Process
        await signInWithEmailAndPassword(auth, email, password);
        toast.success("Logged in successfully!");
      }
      onLoginSuccess();
    } catch (error) {
      toast.error(`${isSignUp ? "Sign Up" : "Login"} Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Logout Handler
  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.info("Logged out successfully!");
      setUser(null);
    } catch (error) {
      toast.error("Logout Error: " + error.message);
    }
  };

  // Auth State Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) onLoginSuccess();
    });
    return () => unsubscribe();
  }, [onLoginSuccess]);

  // Departments List
  const departments = [
    "Computer Science",
    "Information Technology",
    "Electronics & Communication",
    "Mechanical Engineering",
    "Civil Engineering",
    "Computer Science and Business Systems",
    "Artificial Intelligence and Data Science",
    "Artificial Intelligence and Machine Learning",
  ];

  // Roles List with Access Options
  const rolesWithAccess = [
    { role: "Student", accessOptions: ["Student Portal", "Study Materials"] },
    { role: "Staff", accessOptions: ["Course Management", "Content Upload"] },
    {
      role: "HOD",
      accessOptions: [
        "Department Overview",
        "Staff Management",
        "Course Approval",
      ],
    },
    {
      role: "Principal",
      accessOptions: [
        "Department Overview",
        "Staff Management",
        "Course Approval",
        "Students Grades",
      ],
    },
  ];

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
              // Logged In View
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
              // Login/Signup Form
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
                        <input
                          type="text"
                          id="username"
                          placeholder="Choose a username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="role">Select Role:</label>
                        <select
                          id="role"
                          value={role}
                          onChange={(e) => {
                            setRole(e.target.value);
                            setSelectedRoleAccess(""); // Reset role access when role changes
                          }}
                          required
                        >
                          {rolesWithAccess.map((roleObj) => (
                            <option key={roleObj.role} value={roleObj.role}>
                              {roleObj.role}
                            </option>
                          ))}
                        </select>
                      </div>

                      {role === "Student" && (
                        <div className="form-group">
                          <input
                            type="text"
                            id="studentCode"
                            placeholder="Enter your unique student code"
                            value={studentCode}
                            onChange={(e) => setStudentCode(e.target.value)}
                            required
                          />
                        </div>
                      )}

                      <div className="form-group">
                        <label htmlFor="roleAccess">Select Role Access:</label>
                        <select
                          id="roleAccess"
                          value={selectedRoleAccess}
                          onChange={(e) =>
                            setSelectedRoleAccess(e.target.value)
                          }
                          required
                        >
                          <option value="">Select Access Level</option>
                          {rolesWithAccess
                            .find((r) => r.role === role)
                            ?.accessOptions.map((access) => (
                              <option key={access} value={access}>
                                {access}
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

                <div className="social-login">
                  <button
                    className="google-btn"
                    onClick={() => handleSocialLogin(googleProvider)}
                    disabled={loading}
                  >
                    <span>Continue with Google</span>
                  </button>
                  <button
                    className="facebook-btn"
                    onClick={() => handleSocialLogin(facebookProvider)}
                    disabled={loading}
                  >
                    <span>Continue with Facebook</span>
                  </button>
                </div>

                <p className="toggle-form">
                  {isSignUp
                    ? "Already part of our community?"
                    : "New to LearnFree?"}
                  <button onClick={toggleSignUp}>
                    {isSignUp ? " Log In" : " Sign Up"}
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
