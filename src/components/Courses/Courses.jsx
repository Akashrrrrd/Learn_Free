import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { resourcesData } from "../../assets/assets";
import { departmentsData } from "../../assets/assets";
import { studentsData } from "../../assets/assets";
import "./Courses.css";

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [view, setView] = useState("departments");
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [showResources, setShowResources] = useState(false);
  const [enteredPin, setEnteredPin] = useState("");
  const [isPinValid, setIsPinValid] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);
  const [showStudentList, setShowStudentList] = useState(false);
  const navigate = useNavigate();

  const filteredDepartments = departmentsData.filter(
    (dept) =>
      dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDepartmentClick = (dept) => {
    setSelectedDepartment(dept);
    setShowPinModal(true);
  };

  const validatePin = () => {
    if (enteredPin === selectedDepartment.pin) {
      setIsPinValid(true);
      setShowPinModal(false);
      setView("semesters");
    } else {
      alert("Invalid PIN. Please try again.");
    }
  };

  const handleSemesterClick = (semester) => {
    setSelectedSemester(semester);
    setView("subjects");
  };

  const handleBack = () => {
    if (showStudentList) {
      setShowStudentList(false);
    } else if (view === "subjects") {
      setView("semesters");
      setSelectedSemester(null);
    } else if (view === "semesters") {
      setView("departments");
      setSelectedDepartment(null);
      setIsPinValid(false);
    } else if (showResources) {
      setShowResources(false);
      setSelectedSubject(null);
    } else {
      navigate(-1);
    }
  };

  const handleViewResources = (subject) => {
    setSelectedSubject(subject);
    setShowResources(true);
  };

  const handleViewStudents = (e, dept) => {
    e.stopPropagation();
    setSelectedDepartment(dept);
    setShowStudentList(true);
  };

  const getSubjectResources = (subjectCode) => {
    return (
      resourcesData[subjectCode] || {
        lectureNotes: [],
        assignments: [],
        referenceBooks: [],
      }
    );
  };

  const renderPinModal = () => {
    return (
      <div className="pin-modal-overlay">
        <div className="pin-modal">
          <h2>Enter Department PIN</h2>
          <input
            type="password"
            placeholder="Enter PIN"
            value={enteredPin}
            onChange={(e) => setEnteredPin(e.target.value)}
            className="pin-input"
          />
          <button onClick={validatePin} className="submit-pin-btn">
            Submit
          </button>
          <button onClick={() => setShowPinModal(false)} className="cancel-btn">
            Cancel
          </button>
        </div>
      </div>
    );
  };

  const renderStudentList = () => {
    if (!selectedDepartment || !studentsData[selectedDepartment.code]) {
      return null;
    }

    const departmentStudents = studentsData[selectedDepartment.code];

    return (
      <div
        className="sl-modal-overlay"
        onClick={() => setShowStudentList(false)}
      >
        <div className="sl-student-modal" onClick={(e) => e.stopPropagation()}>
          <div className="sl-modal-header">
            <h2>{selectedDepartment.name} - Student List</h2>
            <button
              className="sl-close-button"
              onClick={() => setShowStudentList(false)}
            >
              ×
            </button>
          </div>
          <div className="sl-modal-content">
            <div className="sl-student-list-container">
              <div className="sl-student-list-header">
                <div>Roll No</div>
                <div>Name</div>
                <div>Year</div>
                <div>CGPA</div>
              </div>
              <div className="sl-student-list-body">
                {departmentStudents.map((student) => (
                  <div key={student.rollNo} className="sl-student-list-item">
                    <div>{student.rollNo}</div>
                    <div>{student.name}</div>
                    <div>{student.year}</div>
                    <div>{student.cgpa}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (showStudentList && selectedDepartment) {
    return renderStudentList();
  }

  if (showResources && selectedSubject) {
    const resources = getSubjectResources(selectedSubject.code);
    return (
      <div className="courses-container">
        <div className="courses-header">
          <button onClick={handleBack} className="back-button-header">
            Back
          </button>
          <h1>{selectedSubject.name} - Resources</h1>
          <p>Access study materials, assignments, and reference books</p>
        </div>
        <div className="resources-container">
          <div className="resource-section">
            <h2>Lecture Notes</h2>
            <div className="resource-list">
              {resources.lectureNotes.map((note, index) => (
                <div key={index} className="resource-item">
                  <div className="resource-icon">📚</div>
                  <div className="resource-details">
                    <h3>{note.title}</h3>
                    <a
                      href={note.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Download PDF
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="resource-section">
            <h2>Assignments</h2>
            <div className="resource-list">
              {resources.assignments.map((assignment, index) => (
                <div key={index} className="resource-item">
                  <div className="resource-icon">📝</div>
                  <div className="resource-details">
                    <h3>{assignment.title}</h3>
                    <p>Due Date: {assignment.dueDate}</p>
                    <a
                      href={assignment.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Assignment
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="resource-section">
            <h2>Reference Books</h2>
            <div className="resource-list">
              {resources.referenceBooks.map((book, index) => (
                <div key={index} className="resource-item">
                  <div className="resource-icon">📖</div>
                  <div className="resource-details">
                    <h3>{book.title}</h3>
                    <p>Author: {book.author}</p>
                    <p>Edition: {book.edition}</p>
                  </div>
                </div>
              ))}
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
                  onClick={() => handleViewResources(subject)}
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

  if (view === "semesters" && selectedDepartment && isPinValid) {
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
          {selectedDepartment.semesters.map((semester) => (
            <div
              key={semester.number}
              className="semester-card"
              onClick={() => handleSemesterClick(semester)}
            >
              <div className="semester-content">
                <h2>Semester {semester.number}</h2>
                <p>{semester.subjects.length} Subjects</p>
                <button className="explore-btn">View Subjects</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="courses-container">
      <div className="courses-header">
        <button onClick={handleBack} className="back-button-header">
          Back
        </button>
        <h1>Academic Departments</h1>
        <p>Explore our diverse range of engineering and technology programs</p>
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
        {filteredDepartments.map((dept) => (
          <div
            key={dept.id}
            className="department-card"
            onClick={() => handleDepartmentClick(dept)}
          >
            <div className="department-image">
              <img src={dept.image} alt={dept.name} />
              <div className="department-overlay">
                <span className="dept-code">{dept.code}</span>
              </div>
            </div>
            <div className="department-content">
              <h2>{dept.name}</h2>
              <p className="description">{dept.description}</p>
              <div className="department-stats">
                <span>{studentsData[dept.code]?.length || 0} Students</span>
                <span>{dept.facultyCount} Faculty</span>
              </div>
              <div className="department-buttons">
                <button
                  className="explore-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDepartmentClick(dept);
                  }}
                >
                  Explore Department
                </button>
                <button
                  className="explore-btn"
                  onClick={(e) => handleViewStudents(e, dept)}
                >
                  View Students
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {showPinModal && renderPinModal()}
    </div>
  );
};

export default Courses;
