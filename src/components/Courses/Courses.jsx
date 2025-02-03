import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  resourcesData,
  departmentsData,
  studentsData,
} from "../../assets/assets";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  setDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import "./Courses.css";

const ResourceModal = ({ isOpen, onClose, subject, onSubmit, type }) => {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [duration, setDuration] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [author, setAuthor] = useState("");
  const [edition, setEdition] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const uniqueId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    let resourceData;

    switch (type) {
      case "video":
        resourceData = {
          id: uniqueId,
          title,
          duration,
          thumbnail: "/default-thumbnail.jpg",
          url: file ? URL.createObjectURL(file) : "",
        };
        break;
      case "notes":
        resourceData = {
          id: uniqueId,
          title,
          url: file ? URL.createObjectURL(file) : "",
        };
        break;
      case "assignment":
        resourceData = {
          id: uniqueId,
          title,
          url: file ? URL.createObjectURL(file) : "",
          dueDate,
        };
        break;
      case "book":
        resourceData = {
          id: uniqueId,
          title,
          author,
          edition,
        };
        break;
      default:
        toast.error("Invalid resource type");
        return;
    }

    onSubmit(type, resourceData);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Upload {type.charAt(0).toUpperCase() + type.slice(1)}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder={`${type} title`}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          {type === "video" && (
            <input
              type="text"
              placeholder="Video duration (e.g., 45:30)"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              required
            />
          )}

          {type === "assignment" && (
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />
          )}

          {type === "book" && (
            <>
              <input
                type="text"
                placeholder="Author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Edition"
                value={edition}
                onChange={(e) => setEdition(e.target.value)}
                required
              />
            </>
          )}

          {type !== "book" && (
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              accept={
                type === "video"
                  ? "video/*"
                  : type === "notes"
                  ? ".pdf,.doc,.docx"
                  : type === "assignment"
                  ? ".pdf"
                  : "*/*"
              }
            />
          )}

          <div className="modal-actions">
            <button type="submit">Upload</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [view, setView] = useState("loading");
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [showResources, setShowResources] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [userDepartment, setUserDepartment] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resources, setResources] = useState(resourcesData);

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
          setView("departments");
        } else if (deptData) {
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

  const handleUploadResource = async (type, resourceData) => {
    try {
      const db = getFirestore();
      const auth = getAuth();
      const currentUser = auth.currentUser;

      if (!currentUser || !selectedSubject) {
        toast.error("Please login and select a subject");
        return;
      }

      const resourceRef = doc(db, "resources", selectedSubject.code);
      const resourceKey =
        type === "book"
          ? "referenceBooks"
          : `lecture${type.charAt(0).toUpperCase() + type.slice(1)}s`;

      // Ensure the document exists with the correct structure
      await setDoc(
        resourceRef,
        {
          lectureVideos: [],
          lectureNotes: [],
          referenceBooks: [],
          assignments: [],
        },
        { merge: true }
      );

      // Fetch current resources
      const docSnap = await getDoc(resourceRef);
      const currentResources = docSnap.data() || {};

      // Prevent duplicate entries based on title and other unique identifiers
      const existingResources = currentResources[resourceKey] || [];
      const isDuplicate = existingResources.some((res) => {
        switch (type) {
          case "video":
            return (
              res.title === resourceData.title &&
              res.duration === resourceData.duration
            );
          case "notes":
          case "assignment":
            return res.title === resourceData.title;
          case "book":
            return (
              res.title === resourceData.title &&
              res.author === resourceData.author
            );
          default:
            return false;
        }
      });

      if (isDuplicate) {
        toast.warning("This resource already exists");
        return;
      }

      // Update Firestore with new resource
      await updateDoc(resourceRef, {
        [resourceKey]: arrayUnion(resourceData),
      });

      // Update local state
      setResources((prevResources) => {
        const updatedResources = { ...prevResources };
        if (!updatedResources[selectedSubject.code]) {
          updatedResources[selectedSubject.code] = {};
        }
        updatedResources[selectedSubject.code][resourceKey] = [
          ...(updatedResources[selectedSubject.code][resourceKey] || []),
          resourceData,
        ];
        return updatedResources;
      });

      toast.success(
        `${type.charAt(0).toUpperCase() + type.slice(1)} uploaded successfully`
      );
    } catch (error) {
      console.error(`Error uploading ${type}:`, error);
      toast.error(`Failed to upload ${type}`);
    }
  };

  const ResourceUploadControls = ({ subject }) => (
    <div className="resource-upload-controls">
      <h3>Manage Resources</h3>
      <div className="upload-buttons">
        {["video", "notes", "book", "assignment"].map((type) => (
          <button
            key={type}
            className="upload-btn"
            onClick={() => {
              setModalType(type);
              setIsModalOpen(true);
            }}
          >
            {type === "book"
              ? "Add Reference Book"
              : type === "assignment"
              ? "Create Assignment"
              : `Upload ${
                  type.charAt(0).toUpperCase() + type.slice(1)
                } Lecture`}
          </button>
        ))}
      </div>
      {isModalOpen && (
        <ResourceModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          subject={selectedSubject}
          type={modalType}
          onSubmit={handleUploadResource}
        />
      )}
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
              {(resources[selectedSubject.code]?.lectureVideos || []).map(
                (video) => (
                  <div key={video.id} className="resource-item">
                    <h3>{video.title}</h3>
                    <p>Duration: {video.duration}</p>
                    <button
                      className="resource-btn"
                      onClick={() => window.open(video.url, "_blank")}
                    >
                      Watch Video
                    </button>
                  </div>
                )
              )}
            </div>
          </div>

          <div className="resource-section">
            <h2>Lecture Notes</h2>
            <div className="resource-list">
              {(resources[selectedSubject.code]?.lectureNotes || []).map(
                (note) => (
                  <div key={note.id} className="resource-item">
                    <h3>{note.title}</h3>
                    <button
                      className="resource-btn"
                      onClick={() => window.open(note.url, "_blank")}
                    >
                      Download PDF
                    </button>
                  </div>
                )
              )}
            </div>
          </div>

          <div className="resource-section">
            <h2>Assignments</h2>
            <div className="resource-list">
              {(resources[selectedSubject.code]?.assignments || []).map(
                (assignment) => (
                  <div key={assignment.id} className="resource-item">
                    <h3>{assignment.title}</h3>
                    <p>Due: {assignment.dueDate}</p>
                    <button
                      className="resource-btn"
                      onClick={() => window.open(assignment.url, "_blank")}
                    >
                      View Assignment
                    </button>
                  </div>
                )
              )}
            </div>
          </div>

          <div className="resource-section">
            <h2>Reference Books</h2>
            <div className="resource-list">
              {(resources[selectedSubject.code]?.referenceBooks || []).map(
                (book) => (
                  <div key={book.id} className="resource-item">
                    <h3>{book.title}</h3>
                    <p>Author: {book.author}</p>
                    <p>Edition: {book.edition}</p>
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
