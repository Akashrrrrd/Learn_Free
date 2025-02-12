import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Courses.css";

import { resourcesData, departmentsData } from "../../assets/assets";

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
  const [userRole, setUserRole] = useState(localStorage.getItem("userRole") || "Student");
  const [userDepartment, setUserDepartment] = useState("Computer Science"); // Mock department
  const [modalType, setModalType] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resources, setResources] = useState(resourcesData);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = () => {
      setTimeout(() => {
        const storedDept = localStorage.getItem("userDepartment");
        if (userRole === "Principal" || userRole === "HOD") {
          setView("departments");
          setSelectedDepartment(null);
        } else if (userRole === "STAFF" || userRole === "Student") {
          const deptData = departmentsData.find(d => d.code === storedDept);
          if (deptData) {
            setSelectedDepartment(deptData);
            setView("semesters");
          }
        } else {
          navigate("/login");
        }
      }, 500);
    };
    fetchUserData();
  }, [userDepartment, userRole, navigate]);

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

  const handleUploadResource = (type, resourceData) => {
    setResources((prevResources) => {
      const updatedResources = { ...prevResources };
      if (!updatedResources[selectedSubject.code]) {
        updatedResources[selectedSubject.code] = {};
      }
      const resourceKey =
          type === "book"
              ? "referenceBooks"
              : `lecture${type.charAt(0).toUpperCase() + type.slice(1)}s`;
      updatedResources[selectedSubject.code][resourceKey] = [
        ...(updatedResources[selectedSubject.code][resourceKey] || []),
        resourceData,
      ];
      return updatedResources;
    });

    toast.success(
        `${type.charAt(0).toUpperCase() + type.slice(1)} uploaded successfully`
    );
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

          {(userRole === "Staff" || userRole === "HOD") && (
              <ResourceUploadControls subject={selectedSubject} />
          )}

          <div className="resources-container">
            {["lectureVideos", "lectureNotes", "assignments", "referenceBooks"].map(
                (resourceType) => (
                    <div key={resourceType} className="resource-section">
                      <h2>
                        {resourceType
                            .replace(/([A-Z])/g, " $1")
                            .replace(/^./, (str) => str.toUpperCase())}
                      </h2>
                      <div className="resource-list">
                        {(resources[selectedSubject.code]?.[resourceType] || []).map(
                            (resource) => (
                                <div key={resource.id} className="resource-item">
                                  <h3>{resource.title}</h3>
                                  {resource.duration && <p>Duration: {resource.duration}</p>}
                                  {resource.dueDate && <p>Due: {resource.dueDate}</p>}
                                  {resource.author && <p>Author: {resource.author}</p>}
                                  {resource.edition && <p>Edition: {resource.edition}</p>}
                                  {resource.url && (
                                      <button
                                          className="resource-btn"
                                          onClick={() => window.open(resource.url, "_blank")}
                                      >
                                        {resourceType === "lectureVideos" ? "Watch Video" : "Download"}
                                      </button>
                                  )}
                                </div>
                            )
                        )}
                      </div>
                    </div>
                )
            )}
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
                .filter(dept =>
                    (userRole === "Principal" || userRole === "HOD") ||
                    dept.code === localStorage.getItem("userDepartment")
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