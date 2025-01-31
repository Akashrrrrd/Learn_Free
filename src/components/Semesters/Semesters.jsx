import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./Semesters.css";

const semesterData = [
  {
    number: 1,
    title: "Semester One",
    description: "Foundation courses and basic engineering principles",
    subjects: "6 Subjects",
    credits: "24 Credits",
  },
  {
    number: 2,
    title: "Semester Two",
    description: "Core engineering concepts and mathematical foundations",
    subjects: "6 Subjects",
    credits: "24 Credits",
  },
  {
    number: 3,
    title: "Semester Three",
    description: "Advanced theoretical concepts and practical applications",
    subjects: "7 Subjects",
    credits: "26 Credits",
  },
  {
    number: 4,
    title: "Semester Four",
    description: "Specialized technical courses and laboratory work",
    subjects: "7 Subjects",
    credits: "26 Credits",
  },
  {
    number: 5,
    title: "Semester Five",
    description: "Professional core subjects and technical electives",
    subjects: "6 Subjects",
    credits: "24 Credits",
  },
  {
    number: 6,
    title: "Semester Six",
    description: "Advanced electives and industry-oriented courses",
    subjects: "6 Subjects",
    credits: "24 Credits",
  },
  {
    number: 7,
    title: "Semester Seven",
    description: "Specialized domains and project work initiation",
    subjects: "5 Subjects",
    credits: "22 Credits",
  },
  {
    number: 8,
    title: "Semester Eight",
    description: "Project work and industry preparation courses",
    subjects: "4 Subjects",
    credits: "20 Credits",
  },
];

const departmentInfo = {
  CSE: "Computer Science and Engineering",
  IT: "Information Technology",
  AIDS: "Artificial Intelligence and Data Science",
  AIML: "AI and Machine Learning",
  ECE: "Electronics and Communication Engineering",
  EEE: "Electrical and Electronics Engineering",
  MECH: "Mechanical Engineering",
  CIVIL: "Civil Engineering",
  CSBS: "Computer Science and Business Systems",
};

const Semesters = () => {
  const navigate = useNavigate();
  const { department } = useParams();

  const handleSemesterClick = (semesterNumber) => {
    navigate(`/department/${department}/semester/${semesterNumber}`);
  };

  return (
    <div className="semesters-container">
      <div className="semesters-header">
        <Link to="/courses">
          <button className="back-button">← Back to Departments</button>
        </Link>
        <div className="header-content">
          <h1>{departmentInfo[department?.toUpperCase()]}</h1>
          <p>Select a semester to explore subjects and resources</p>
        </div>
      </div>

      <div className="semesters-grid">
        {semesterData.map((semester) => (
          <div key={semester.number} className="semester-card">
            <div className="semester-content">
              <div className="semester-header">
                <span className="semester-number">{semester.number}</span>
                <h2>{semester.title}</h2>
              </div>
              <p className="semester-description">{semester.description}</p>
              <div className="semester-details">
                <span>{semester.subjects}</span>
                <span>{semester.credits}</span>
              </div>
              <button
                className="view-subjects-btn"
                onClick={() => handleSemesterClick(semester.number)}
              >
                View Subjects
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Semesters;
