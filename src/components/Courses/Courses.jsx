import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Courses.css";

import { resourcesData, departmentsData } from "../../assets/assets";

const ResourceModal = ({ isOpen, onClose, subject, onSubmit, type }) => {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [dueDate, setDueDate] = useState("");
  const [author, setAuthor] = useState("");
  const [edition, setEdition] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const uniqueId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    let resourceData;

    switch (type) {
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
    <div className="crs-modal-overlay">
      <div className="crs-modal-content">
        <h2>Upload {type.charAt(0).toUpperCase() + type.slice(1)}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder={`${type} title`}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

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
                type === "notes"
                  ? ".pdf,.doc,.docx"
                  : type === "assignment"
                  ? ".pdf"
                  : "*/*"
              }
            />
          )}

          <div className="crs-modal-actions">
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
  const [userRole, setUserRole] = useState(
    localStorage.getItem("userRole") || "STUDENT"
  );
  const [userDepartment, setUserDepartment] = useState("Computer Science"); // Mock department
  const [modalType, setModalType] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resources, setResources] = useState(resourcesData);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = () => {
      setTimeout(() => {
        const storedDept = localStorage.getItem("userDepartment");
        if (userRole === "PRINCIPAL" || userRole === "HOD") {
          setView("departments");
          setSelectedDepartment(null);
        } else if (userRole === "STAFF" || userRole === "STUDENT") {
          const deptData = departmentsData.find((d) => d.code === storedDept);
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
      if (userRole === "PRINCIPAL") {
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
    <div className="crs-resource-upload-controls">
      <h3>Manage Resources</h3>
      <div className="crs-upload-buttons">
        {["notes", "assignment", "book"].map((type) => (
          <button
            key={type}
            className="crs-upload-btn"
            onClick={() => {
              setModalType(type);
              setIsModalOpen(true);
            }}
          >
            {type === "book"
              ? "Add Reference Book"
              : type === "assignment"
              ? "Create Assignment"
              : `Upload ${type.charAt(0).toUpperCase() + type.slice(1)}`}
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
      <div className="crs-courses-container">
        <div className="crs-courses-header">
          <button onClick={handleBack} className="crs-back-button-header">
            Back
          </button>
          <h1>{selectedSubject.name} - Resources</h1>
          <p>Access study materials, assignments, and reference books</p>
        </div>

        {(userRole === "STAFF" || userRole === "HOD") && (
          <ResourceUploadControls subject={selectedSubject} />
        )}

        <div className="crs-resources-container">
          {["lectureNotes", "assignments", "referenceBooks"].map(
            (resourceType) => (
              <div key={resourceType} className="crs-resource-section">
                <h2>
                  {resourceType
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase())}
                </h2>
                <div className="crs-resource-list">
                  {(resources[selectedSubject.code]?.[resourceType] || []).map(
                    (resource) => (
                      <div key={resource.id} className="crs-resource-item">
                        <h3>{resource.title}</h3>
                        {resource.dueDate && <p>Due: {resource.dueDate}</p>}
                        {resource.author && <p>Author: {resource.author}</p>}
                        {resource.edition && <p>Edition: {resource.edition}</p>}
                        {resource.url && (
                          <button
                            className="crs-resource-btn"
                            onClick={() => window.open(resource.url, "_blank")}
                          >
                            Download
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
      <div className="crs-courses-container">
        <div className="crs-courses-header">
          <button onClick={handleBack} className="crs-back-button-header">
            Back
          </button>
          <h1>
            {selectedDepartment.name} - Semester {selectedSemester.number}
          </h1>
          <p>Course subjects and their details</p>
        </div>
        <div className="crs-subjects-grid">
          {selectedSemester.subjects.map((subject) => (
            <div key={subject.code} className="crs-subject-card">
              <div className="crs-subject-header">
                <span className="crs-subject-code">{subject.code}</span>
              </div>
              <div className="crs-subject-content">
                <h2>{subject.name}</h2>
                <p>Credits: {subject.credits}</p>
                <button
                  className="crs-explore-btn"
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
      <div className="crs-courses-container">
        <div className="crs-courses-header">
          <button onClick={handleBack} className="crs-back-button-header">
            Back
          </button>
          <h1>{selectedDepartment.name}</h1>
          <p>Select a semester to view subjects</p>
        </div>
        <div className="crs-semesters-grid">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((semesterNum) => (
            <div
              key={semesterNum}
              className="crs-semester-card"
              onClick={() => handleSemesterClick(semesterNum)}
            >
              <div className="crs-semester-content">
                <h2>Semester {semesterNum}</h2>
                <p>
                  {selectedDepartment.semesters?.find(
                    (sem) => sem.number === semesterNum
                  )?.subjects?.length || 0}{" "}
                  Subjects
                </p>
                <button className="crs-explore-btn">View Subjects</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (view === "loading") {
    return <div className="crs-loading">Loading...</div>;
  }

  if (userRole === "PRINCIPAL" && view === "departments") {
    return (
      <div className="crs-courses-container">
        <div className="crs-courses-header">
          <button onClick={handleBack} className="crs-back-button-header">
            Back
          </button>
          <h1>Academic Departments</h1>
          <p>
            Explore our diverse range of engineering and technology programs
          </p>
        </div>
        <div className="crs-search-container">
          <input
            type="text"
            placeholder="Search departments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="crs-search-input"
          />
        </div>
        <div className="crs-departments-grid">
          {departmentsData
            .filter(
              (dept) =>
                userRole === "PRINCIPAL" ||
                userRole === "HOD" ||
                dept.code === localStorage.getItem("userDepartment")
            )
            .map((dept) => (
              <div
                key={dept.id}
                className="crs-department-card"
                onClick={() => {
                  setSelectedDepartment(dept);
                  setView("semesters");
                }}
              >
                <div className="crs-department-image">
                  <img src={dept.image} alt={dept.name} />
                  <div className="crs-department-overlay">
                    <span className="crs-dept-code">{dept.code}</span>
                  </div>
                </div>
                <div className="crs-department-content">
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
