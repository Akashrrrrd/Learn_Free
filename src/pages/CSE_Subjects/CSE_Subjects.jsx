import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./CSE_Subjects.css";

const subjectsData = {
  1: [
    {
      code: "MA101",
      name: "Engineering Mathematics - I",
      credits: 4,
      type: "Theory",
    },
    {
      code: "PH101",
      name: "Engineering Physics",
      credits: 4,
      type: "Theory + Lab",
    },
    {
      code: "CH101",
      name: "Engineering Chemistry",
      credits: 4,
      type: "Theory + Lab",
    },
    {
      code: "EE101",
      name: "Basic Electrical Engineering",
      credits: 4,
      type: "Theory + Lab",
    },
    {
      code: "CS101",
      name: "Programming in C",
      credits: 4,
      type: "Theory + Lab",
    },
    {
      code: "ME101",
      name: "Engineering Graphics",
      credits: 4,
      type: "Theory + Lab",
    },
  ],
  2: [
    {
      code: "MA102",
      name: "Engineering Mathematics - II",
      credits: 4,
      type: "Theory",
    },
    {
      code: "CS201",
      name: "Data Structures",
      credits: 4,
      type: "Theory + Lab",
    },
    {
      code: "CS202",
      name: "Digital Logic Design",
      credits: 4,
      type: "Theory + Lab",
    },
    {
      code: "CS203",
      name: "Object Oriented Programming",
      credits: 4,
      type: "Theory + Lab",
    },
    {
      code: "HU201",
      name: "Professional Communication",
      credits: 3,
      type: "Theory",
    },
    {
      code: "ES201",
      name: "Environmental Science",
      credits: 3,
      type: "Theory",
    },
  ],
  // ... Similar structure for semesters 3-8
};

const CSE_Subjects = () => {
  const { department, semester } = useParams();

  return (
    <div className="subjects-container">
      <div className="subjects-header">
        <Link to={`/department/${department}`}>
          <button className="back-button">← Back to Semesters</button>
        </Link>
        <div className="header-content">
          <h1>Semester {semester} Subjects</h1>
          <p>Department of Computer Science and Engineering</p>
        </div>
      </div>

      <div className="subjects-grid">
        {subjectsData[semester]?.map((subject, index) => (
          <div key={index} className="subject-card">
            <div className="subject-code">{subject.code}</div>
            <h2 className="subject-name">{subject.name}</h2>
            <div className="subject-details">
              <span className="credits">{subject.credits} Credits</span>
              <span className="type">{subject.type}</span>
            </div>
            <button className="resources-btn">View Resources</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CSE_Subjects;
