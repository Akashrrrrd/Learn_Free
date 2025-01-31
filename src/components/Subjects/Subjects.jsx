import React from 'react';
import { Link, useParams } from 'react-router-dom';
import './Subjects.css';

// Comprehensive subject data for all departments and semesters
const subjectsData = {
  cse: {
    1: [
      { code: "MA101", name: "Engineering Mathematics I", credits: 4, type: "Theory" },
      { code: "PH101", name: "Engineering Physics", credits: 4, type: "Theory" },
      { code: "CS101", name: "Programming Fundamentals", credits: 4, type: "Theory + Lab" },
      { code: "ME101", name: "Engineering Mechanics", credits: 4, type: "Theory" },
      { code: "EN101", name: "Technical English", credits: 4, type: "Theory" },
      { code: "CS102", name: "Programming Lab", credits: 2, type: "Lab" }
    ],
    // Add more semesters for CSE...
  },
  // Add data for other departments...
};

const departmentFullNames = {
  cse: "Computer Science and Engineering",
  it: "Information Technology",
  aids: "Artificial Intelligence and Data Science",
  aiml: "AI and Machine Learning",
  ece: "Electronics and Communication",
  eee: "Electrical and Electronics",
  mech: "Mechanical Engineering",
  civil: "Civil Engineering",
  csbs: "Computer Science and Business Systems"
};

const Subjects = () => {
  const { department, semester } = useParams();
  const semesterNumber = parseInt(semester);
  const departmentCode = department?.toLowerCase();

  // Debugging: Log department and semester
  console.log("Department:", departmentCode);
  console.log("Semester:", semesterNumber);

  const subjects = subjectsData[departmentCode]?.[semesterNumber] || [];
  
  // Debugging: Log subjects
  console.log("Subjects:", subjects);

  const departmentName = departmentFullNames[departmentCode];

  if (subjects.length === 0) {
    return (
      <div className="subjects-container">
        <div className="subjects-header">
          <Link to={`/department/${department}`}>
            <button className="back-button">← Back to Semesters</button>
          </Link>
          <div className="header-content">
            <h1>{departmentName} - Semester {semesterNumber}</h1>
            <p>No subjects found for this semester.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="subjects-container">
      <div className="subjects-header">
        <Link to={`/department/${department}`}>
          <button className="back-button">← Back to Semesters</button>
        </Link>
        <div className="header-content">
          <h1>{departmentName} - Semester {semesterNumber}</h1>
          <p>Course subjects and their details</p>
        </div>
      </div>

      <div className="subjects-grid">
        {subjects.map((subject, index) => (
          <div key={subject.code} className="subject-card">
            <div className="subject-header">
              <span className="subject-code">{subject.code}</span>
              <span className={`subject-type ${subject.type.toLowerCase().replace(' + ', '-')}`}>
                {subject.type}
              </span>
            </div>
            <div className="subject-content">
              <h2>{subject.name}</h2>
              <div className="subject-details">
                <span className="credits">
                  <i className="fas fa-graduation-cap"></i> {subject.credits} Credits
                </span>
              </div>
              <button className="view-resources-btn">
                View Resources
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subjects;