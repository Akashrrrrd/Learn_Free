import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  resourcesData,
  departmentsData,
  studentsData,
} from "../../assets/assets";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import "./Courses.css";

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [view, setView] = useState("loading");
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [showResources, setShowResources] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [userDepartment, setUserDepartment] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const auth = getAuth();
        const db = getFirestore();
        const currentUser = auth.currentUser;

        if (!currentUser) {
          toast.error("Please login first");
          navigate("/login");
          return;
        }

        const userDocRef = doc(db, "users", currentUser.uid);
        const userDocSnapshot = await getDoc(userDocRef);

        if (!userDocSnapshot.exists()) {
          toast.error("User data not found");
          return;
        }

        const userData = userDocSnapshot.data();
        setUserRole(userData.role);
        setUserDepartment(userData.department);

        // Find department data
        const deptData = departmentsData.find(
          (d) => d.name === userData.department
        );

        if (userData.role === "Principal") {
          // Principal sees all departments initially
          setView("departments");
        } else if (deptData) {
          // Students, Staff, and HOD directly see their department's semesters
          setSelectedDepartment(deptData);
          setView("semesters");
        } else {
          toast.error("Department data not found");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Error loading user data. Please check your connection.");
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleSemesterClick = (semesterNum) => {
    const semesterData = {
      number: semesterNum,
      subjects:
        selectedDepartment?.semesters?.find((sem) => sem.number === semesterNum)
          ?.subjects || [],
    };
    setSelectedSemester(semesterData);
    setView("subjects");
  };

  const handleBack = () => {
    if (showResources) {
      setShowResources(false);
      setSelectedSubject(null);
    } else if (view === "subjects") {
      setView("semesters");
      setSelectedSemester(null);
    } else if (view === "semesters") {
      if (userRole === "Principal") {
        setView("departments");
        setSelectedDepartment(null);
      } else {
        navigate(-1);
      }
    } else {
      navigate(-1);
    }
  };

  const handleUploadResource = (type, subject) => {
    // Implement file upload functionality
    toast.info(`Upload ${type} functionality will be implemented here`);
  };

  const handleAssignWork = (subject) => {
    // Implement assignment creation
    toast.info("Assignment creation functionality will be implemented here");
  };

  const ResourceUploadControls = ({ subject }) => (
    <div className="resource-upload-controls">
      <h3>Manage Resources</h3>
      <div className="upload-buttons">
        <button
          className="upload-btn"
          onClick={() => handleUploadResource("video", subject)}
        >
          Upload Video Lecture
        </button>
        <button
          className="upload-btn"
          onClick={() => handleUploadResource("notes", subject)}
        >
          Upload Lecture Notes
        </button>
        <button
          className="upload-btn"
          onClick={() => handleUploadResource("book", subject)}
        >
          Add Reference Book
        </button>
        <button
          className="upload-btn"
          onClick={() => handleAssignWork(subject)}
        >
          Create Assignment
        </button>
      </div>
    </div>
  );

  if (showResources && selectedSubject) {
    return (
      <div className="courses-container">
        <div className="courses-header">
          <button onClick={handleBack} className="back-button-header">
            Back
          </button>
          <h1>{selectedSubject.name} - Resources</h1>
          <p>Access study materials, assignments, and reference books</p>
        </div>

        {/* Show upload controls only for staff/HOD */}
        {(userRole === "Staff" || userRole === "HOD") && (
          <ResourceUploadControls subject={selectedSubject} />
        )}

        <div className="resources-container">
          <div className="resource-section">
            <h2>Lecture Videos</h2>
            <div className="resource-list">
              {(resourcesData[selectedSubject.code]?.lectureVideos || []).map(
                (video, index) => (
                  <div key={index} className="resource-item">
                    <h3>{video.title}</h3>
                    <p>Duration: {video.duration}</p>
                    <button className="resource-btn">Watch Video</button>
                  </div>
                )
              )}
            </div>
          </div>

          <div className="resource-section">
            <h2>Lecture Notes</h2>
            <div className="resource-list">
              {(resourcesData[selectedSubject.code]?.lectureNotes || []).map(
                (note, index) => (
                  <div key={index} className="resource-item">
                    <h3>{note.title}</h3>
                    <button className="resource-btn">Download PDF</button>
                  </div>
                )
              )}
            </div>
          </div>

          <div className="resource-section">
            <h2>Assignments</h2>
            <div className="resource-list">
              {(resourcesData[selectedSubject.code]?.assignments || []).map(
                (assignment, index) => (
                  <div key={index} className="resource-item">
                    <h3>{assignment.title}</h3>
                    <p>Due: {assignment.dueDate}</p>
                    <button className="resource-btn">View Assignment</button>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (view === "subjects" && selectedDepartment && selectedSemester) {
    return (
      <div className="courses-container">
        <div className="courses-header">
          <button onClick={handleBack} className="back-button-header">
            Back
          </button>
          <h1>
            {selectedDepartment.name} - Semester {selectedSemester.number}
          </h1>
          <p>Course subjects and their details</p>
        </div>
        <div className="subjects-grid">
          {selectedSemester.subjects.map((subject) => (
            <div key={subject.code} className="subject-card">
              <div className="subject-header">
                <span className="subject-code">{subject.code}</span>
              </div>
              <div className="subject-content">
                <h2>{subject.name}</h2>
                <p>Credits: {subject.credits}</p>
                <button
                  className="explore-btn"
                  onClick={() => {
                    setSelectedSubject(subject);
                    setShowResources(true);
                  }}
                >
                  View Resources
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (view === "semesters" && selectedDepartment) {
    return (
      <div className="courses-container">
        <div className="courses-header">
          <button onClick={handleBack} className="back-button-header">
            Back
          </button>
          <h1>{selectedDepartment.name}</h1>
          <p>Select a semester to view subjects</p>
        </div>
        <div className="semesters-grid">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((semesterNum) => (
            <div
              key={semesterNum}
              className="semester-card"
              onClick={() => handleSemesterClick(semesterNum)}
            >
              <div className="semester-content">
                <h2>Semester {semesterNum}</h2>
                <p>
                  {selectedDepartment.semesters?.find(
                    (sem) => sem.number === semesterNum
                  )?.subjects?.length || 0}{" "}
                  Subjects
                </p>
                <button className="explore-btn">View Subjects</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (view === "loading") {
    return <div className="loading">Loading...</div>;
  }

  // Only show departments view for Principal
  if (userRole === "Principal" && view === "departments") {
    return (
      <div className="courses-container">
        <div className="courses-header">
          <button onClick={handleBack} className="back-button-header">
            Back
          </button>
          <h1>Academic Departments</h1>
          <p>
            Explore our diverse range of engineering and technology programs
          </p>
        </div>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search departments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="departments-grid">
          {departmentsData
            .filter(
              (dept) =>
                dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                dept.code.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((dept) => (
              <div
                key={dept.id}
                className="department-card"
                onClick={() => {
                  setSelectedDepartment(dept);
                  setView("semesters");
                }}
              >
                <div className="department-image">
                  <img src={dept.image} alt={dept.name} />
                  <div className="department-overlay">
                    <span className="dept-code">{dept.code}</span>
                  </div>
                </div>
                <div className="department-content">
                  <h2>{dept.name}</h2>
                  <p>{dept.description}</p>
                  <div className="department-stats">
                    <span>{studentsData[dept.code]?.length || 0} Students</span>
                    <span>{dept.facultyCount} Faculty</span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }

  return null;
};

export default Courses;
