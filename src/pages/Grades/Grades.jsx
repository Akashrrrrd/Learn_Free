"use client";

import React, { useState, useEffect } from "react";
import "./Grades.css";
import {
  ChevronLeft,
  Search,
  Book,
  GraduationCap,
  BarChart2,
  Users,
  Calendar,
  Award,
  Clock,
  Target,
  Download,
  UserPlus,
  FileSpreadsheet,
} from "lucide-react";
import { sampleStudents } from "../../assets/assets";
import { PDFDownloadLink } from "@react-pdf/renderer";
import StudentPDFDocument from "./../../components/StudentPDFDocument";

const Grades = () => {
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [selectedDept, setSelectedDept] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showDepts, setShowDepts] = useState(false);
  const [showStudents, setShowStudents] = useState(false);
  const [showGrades, setShowGrades] = useState(false);
  const [showActivities, setShowActivities] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [userRole, setUserRole] = useState(null);
  const [userDepartment, setUserDepartment] = useState(null);
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [newStudent, setNewStudent] = useState({
    name: "",
    rollNo: "",
    email: "",
    cgpa: "",
  });

  const batches = ["First Year", "Second Year", "Third Year", "Fourth Year"];

  const departments = [
    { name: "Computer Science", icon: <Book size={24} /> },
    { name: "Electrical Engineering", icon: <BarChart2 size={24} /> },
    { name: "Mechanical Engineering", icon: <Users size={24} /> },
    { name: "Civil Engineering", icon: <GraduationCap size={24} /> },
    { name: "Chemical Engineering", icon: <Book size={24} /> },
    { name: "Biotech Engineering", icon: <Users size={24} /> },
    { name: "Electronics Engineering", icon: <BarChart2 size={24} /> },
    { name: "Information Technology", icon: <GraduationCap size={24} /> },
  ];

  useEffect(() => {
    // Fetch user role and department from localStorage
    const role = localStorage.getItem("userRole");
    const department = localStorage.getItem("userDepartment");
    setUserRole(role);
    setUserDepartment(department);

    // If user is a student, directly show their grades
    if (role === "STUDENT") {
      const studentEmail = localStorage.getItem("userEmail");
      const studentData = Object.values(sampleStudents)
        .flat()
        .find((student) => student.email === studentEmail);
      if (studentData) {
        setSelectedStudent(studentData);
        setSelectedDept(department);
        setShowGrades(true);
      }
    }
  }, []);

  const handleClose = () => {
    if (showActivities) setShowActivities(false);
    else if (showGrades) setShowGrades(false);
    else if (showStudents) {
      setShowStudents(false);
      setSearchQuery("");
    } else if (showDepts) {
      setShowDepts(false);
      setSelectedBatch(null);
    }
  };

  const getGradeColor = (grade) => {
    const gradeColors = {
      "A+": "#22c55e",
      A: "#16a34a",
      "A-": "#15803d",
      "B+": "#0284c7",
      B: "#0369a1",
      "B-": "#075985",
      "C+": "#f59e0b",
      C: "#d97706",
      "C-": "#b45309",
      D: "#dc2626",
      F: "#991b1b",
    };
    return gradeColors[grade] || "#6b7280";
  };

  const getBatchIcon = (index) => {
    const icons = [
      <Book size={32} key={0} />,
      <Users size={32} key={1} />,
      <BarChart2 size={32} key={2} />,
      <GraduationCap size={32} key={3} />,
    ];
    return icons[index];
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleAddStudent = () => {
    // Add the new student to the sampleStudents array
    const newStudentData = {
      id: Date.now(), // Generate a unique ID
      ...newStudent,
      branch: userDepartment,
      attendance: 100, // Default attendance
      grades: {}, // You may want to initialize this with some default data
      activities: {
        attendance_history: [],
        academic: [],
        certifications: [],
      },
    };
    sampleStudents[userDepartment] = [
      ...sampleStudents[userDepartment],
      newStudentData,
    ];

    // Reset the form and close the modal
    setNewStudent({ name: "", rollNo: "", email: "", cgpa: "" });
    setShowAddStudentModal(false);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    // Here you would typically process the Excel file
    // For this example, we'll just show an alert
    alert(
      `File "${file.name}" uploaded successfully. Processing would happen here.`
    );
  };

  if (userRole === "STUDENT" && showGrades) {
    const student = selectedStudent;
    return (
      <div className="gr-grades-container">
        <div className="gr-header">
          <div className="gr-header-content">
            <h1>{student.name}</h1>
            <p className="gr-subtitle">
              {student.rollNo} - {selectedDept}
            </p>
          </div>
          <div className="gr-modal-actions">
            <PDFDownloadLink
              document={
                <StudentPDFDocument
                  student={student}
                  department={selectedDept}
                  batch={selectedBatch}
                />
              }
              fileName={`${student.rollNo}_academic_record.pdf`}
              className="gr-download-pdf-btn"
            >
              {({ loading }) =>
                loading ? (
                  "Generating PDF..."
                ) : (
                  <>
                    <Download size={16} />
                    Download PDF
                  </>
                )
              }
            </PDFDownloadLink>
            <button
              className="gr-view-activities-btn"
              onClick={() => setShowActivities(true)}
            >
              View Activities
            </button>
          </div>
        </div>
        <div className="gr-grades-content">
          <div className="gr-grades-summary">
            <div className="gr-summary-item">
              <h3>CGPA</h3>
              <p className="gr-cgpa-large">{student.cgpa}</p>
            </div>
            <div className="gr-summary-item">
              <h3>Attendance</h3>
              <p className="gr-attendance">{student.attendance}%</p>
            </div>
          </div>
          <div className="gr-semester-grades">
            {Object.entries(student.grades).map(([sem, data]) => (
              <div key={sem} className="gr-semester-card">
                <div className="gr-semester-header">
                  <h3>{sem.replace(/([A-Z])/g, " $1").trim()}</h3>
                  <span className="gr-semester-gpa">GPA: {data.gpa}</span>
                </div>
                <table>
                  <thead>
                    <tr>
                      <th>Subject</th>
                      <th>Credits</th>
                      <th>Grade</th>
                      <th>Attendance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.subjects.map((subject, idx) => (
                      <tr key={idx}>
                        <td>{subject.name}</td>
                        <td>{subject.credits}</td>
                        <td>
                          <span
                            className="gr-grade-pill"
                            style={{
                              backgroundColor: getGradeColor(subject.grade),
                            }}
                          >
                            {subject.grade}
                          </span>
                        </td>
                        <td>
                          <div className="gr-attendance-bar">
                            <div
                              className="gr-attendance-fill"
                              style={{ width: `${subject.attendance}%` }}
                            />
                            <span>{subject.attendance}%</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (userRole === "STAFF" || userRole === "HOD") {
    if (!showStudents) {
      return (
        <div className="gr-batch-container">
          <h1 className="gr-main-title">Academic Records</h1>
          <p className="gr-subtitle">Select a batch to view student records</p>
          <div className="gr-batch-grid">
            {batches.map((batch, index) => (
              <div
                key={batch}
                className="gr-batch-card"
                onClick={() => {
                  setSelectedBatch(batch);
                  setSelectedDept(userDepartment); // Directly set the department for staff/HOD
                  setShowStudents(true);
                }}
              >
                <div className="gr-batch-icon">{getBatchIcon(index)}</div>
                <h2>{batch}</h2>
                <p className="gr-batch-description">
                  View academic records for {batch.toLowerCase()} students
                </p>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // Show students directly for the selected batch and staff's department
    const filteredStudents = sampleStudents[userDepartment]?.filter(
      (student) =>
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.rollNo.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <div className="gr-student-container">
        <div className="gr-header">
          <button className="gr-back-btn" onClick={handleClose}>
            <ChevronLeft size={20} />
            <span>Back</span>
          </button>
          <div className="gr-header-content">
            <h1>{userDepartment}</h1>
            <p className="gr-subtitle">{selectedBatch} Students</p>
          </div>
          <div className="gr-action-buttons">
            <button
              className="gr-add-student-btn"
              onClick={() => setShowAddStudentModal(true)}
            >
              <UserPlus size={20} />
              Add Student
            </button>
            <label className="gr-upload-xl-btn">
              <FileSpreadsheet size={20} />
              Upload XL Sheet
              <input
                type="file"
                accept=".xlsx, .xls"
                onChange={handleFileUpload}
                style={{ display: "none" }}
              />
            </label>
          </div>
        </div>
        <div className="gr-search-bar">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search by name or roll number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="gr-student-list-container">
          <div className="gr-student-list-header">
            <div>Roll No</div>
            <div>Name</div>
            <div>Branch</div>
            <div>CGPA</div>
          </div>
          <div className="gr-student-list-body">
            {filteredStudents?.map((student) => (
              <div
                key={student.id}
                className="gr-student-list-item"
                onClick={() => {
                  setSelectedStudent(student);
                  setShowGrades(true); // Show grades when a student is clicked
                }}
              >
                <div>{student.rollNo}</div>
                <div>{student.name}</div>
                <div>{student.branch}</div>
                <div className="gr-cgpa">{student.cgpa.toFixed(2)}</div>
              </div>
            ))}
          </div>
        </div>
        {showAddStudentModal && (
          <div className="gr-modal-overlay">
            <div className="gr-add-student-modal">
              <h2>Add New Student</h2>
              <input
                type="text"
                placeholder="Name"
                value={newStudent.name}
                onChange={(e) =>
                  setNewStudent({ ...newStudent, name: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Roll No"
                value={newStudent.rollNo}
                onChange={(e) =>
                  setNewStudent({ ...newStudent, rollNo: e.target.value })
                }
              />
              <input
                type="email"
                placeholder="Email"
                value={newStudent.email}
                onChange={(e) =>
                  setNewStudent({ ...newStudent, email: e.target.value })
                }
              />
              <input
                type="number"
                placeholder="CGPA"
                value={newStudent.cgpa}
                onChange={(e) =>
                  setNewStudent({ ...newStudent, cgpa: e.target.value })
                }
              />
              <div className="gr-modal-actions">
                <button onClick={handleAddStudent}>Add Student</button>
                <button onClick={() => setShowAddStudentModal(false)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (userRole === "PRINCIPAL") {
    if (!showDepts) {
      return (
        <div className="gr-batch-container">
          <h1 className="gr-main-title">Academic Records</h1>
          <p className="gr-subtitle">
            Select a batch to view departments and student records
          </p>
          <div className="gr-batch-grid">
            {batches.map((batch, index) => (
              <div
                key={batch}
                className="gr-batch-card"
                onClick={() => {
                  setSelectedBatch(batch);
                  setShowDepts(true);
                }}
              >
                <div className="gr-batch-icon">{getBatchIcon(index)}</div>
                <h2>{batch}</h2>
                <p className="gr-batch-description">
                  View academic records for {batch.toLowerCase()} students
                </p>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (showDepts && !showStudents) {
      return (
        <div className="gr-dept-container">
          <div className="gr-header">
            <button className="gr-back-btn" onClick={handleClose}>
              <ChevronLeft size={20} />
              <span>Back</span>
            </button>
            <div className="gr-header-content">
              <h1>{selectedBatch}</h1>
              <p className="gr-subtitle">
                Select a department to view student records
              </p>
            </div>
          </div>
          <div className="gr-dept-grid">
            {departments.map((dept) => (
              <div
                key={dept.name}
                className="gr-dept-card"
                onClick={() => {
                  setSelectedDept(dept.name);
                  setShowStudents(true);
                }}
              >
                <div className="gr-dept-icon">{dept.icon}</div>
                <h3>{dept.name}</h3>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (showStudents && !showGrades && !showActivities) {
      const filteredStudents = sampleStudents[selectedDept]?.filter(
        (student) =>
          student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          student.rollNo.toLowerCase().includes(searchQuery.toLowerCase())
      );

      return (
        <div className="gr-student-container">
          <div className="gr-header">
            <button className="gr-back-btn" onClick={handleClose}>
              <ChevronLeft size={20} />
              <span>Back</span>
            </button>
            <div className="gr-header-content">
              <h1>{selectedDept}</h1>
              <p className="gr-subtitle">{selectedBatch} Students</p>
            </div>
          </div>
          <div className="gr-search-bar">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search by name or roll number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="gr-student-list-container">
            <div className="gr-student-list-header">
              <div>Roll No</div>
              <div>Name</div>
              <div>Branch</div>
              <div>CGPA</div>
            </div>
            <div className="gr-student-list-body">
              {filteredStudents?.map((student) => (
                <div
                  key={student.id}
                  className="gr-student-list-item"
                  onClick={() => {
                    setSelectedStudent(student);
                    setShowGrades(true); // Show grades when a student is clicked
                  }}
                >
                  <div>{student.rollNo}</div>
                  <div>{student.name}</div>
                  <div>{student.branch}</div>
                  <div className="gr-cgpa">{student.cgpa.toFixed(2)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }
  }

  if (showGrades && !showActivities) {
    const student = selectedStudent || sampleStudents[selectedDept][0];
    return (
      <div className="gr-grades-container">
        <div className="gr-header">
          <button className="gr-back-btn" onClick={handleClose}>
            <ChevronLeft size={20} />
            <span>Back</span>
          </button>
          <div className="gr-header-content">
            <h1>{student.name}</h1>
            <p className="gr-subtitle">
              {student.rollNo} - {selectedDept}
            </p>
          </div>
          <div className="gr-modal-actions">
            <PDFDownloadLink
              document={
                <StudentPDFDocument
                  student={student}
                  department={selectedDept}
                  batch={selectedBatch}
                />
              }
              fileName={`${student.rollNo}_academic_record.pdf`}
              className="gr-download-pdf-btn"
            >
              {({ loading }) =>
                loading ? (
                  "Generating PDF..."
                ) : (
                  <>
                    <Download size={16} />
                    Download PDF
                  </>
                )
              }
            </PDFDownloadLink>
            <button
              className="gr-view-activities-btn"
              onClick={() => setShowActivities(true)}
            >
              View Activities
            </button>
          </div>
        </div>
        <div className="gr-grades-content">
          <div className="gr-grades-summary">
            <div className="gr-summary-item">
              <h3>CGPA</h3>
              <p className="gr-cgpa-large">{student.cgpa}</p>
            </div>
            <div className="gr-summary-item">
              <h3>Attendance</h3>
              <p className="gr-attendance">{student.attendance}%</p>
            </div>
          </div>
          <div className="gr-semester-grades">
            {Object.entries(student.grades).map(([sem, data]) => (
              <div key={sem} className="gr-semester-card">
                <div className="gr-semester-header">
                  <h3>{sem.replace(/([A-Z])/g, " $1").trim()}</h3>
                  <span className="gr-semester-gpa">GPA: {data.gpa}</span>
                </div>
                <table>
                  <thead>
                    <tr>
                      <th>Subject</th>
                      <th>Credits</th>
                      <th>Grade</th>
                      <th>Attendance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.subjects.map((subject, idx) => (
                      <tr key={idx}>
                        <td>{subject.name}</td>
                        <td>{subject.credits}</td>
                        <td>
                          <span
                            className="gr-grade-pill"
                            style={{
                              backgroundColor: getGradeColor(subject.grade),
                            }}
                          >
                            {subject.grade}
                          </span>
                        </td>
                        <td>
                          <div className="gr-attendance-bar">
                            <div
                              className="gr-attendance-fill"
                              style={{ width: `${subject.attendance}%` }}
                            />
                            <span>{subject.attendance}%</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (showActivities) {
    const student = selectedStudent || sampleStudents[selectedDept][0];
    return (
      <div className="gr-activities-container">
        <div className="gr-header">
          <button className="gr-back-btn" onClick={handleClose}>
            <ChevronLeft size={20} />
            <span>Back</span>
          </button>
          <div className="gr-header-content">
            <h1>Academic Activities</h1>
            <p className="gr-subtitle">
              {student.name} - {student.rollNo}
            </p>
          </div>
          <div className="gr-modal-actions">
            <PDFDownloadLink
              document={
                <StudentPDFDocument
                  student={student}
                  department={selectedDept}
                  batch={selectedBatch}
                  showActivities={true}
                />
              }
              fileName={`${student.rollNo}_activities.pdf`}
              className="gr-download-pdf-btn"
            >
              {({ loading }) =>
                loading ? (
                  "Generating PDF..."
                ) : (
                  <>
                    <Download size={16} />
                    Download PDF
                  </>
                )
              }
            </PDFDownloadLink>
          </div>
        </div>
        <div className="gr-activities-content">
          <div className="gr-attendance-chart">
            <h3>
              <Clock size={20} /> Attendance History
            </h3>
            <div className="gr-attendance-bars">
              {student.activities.attendance_history.map((month, index) => (
                <div key={index} className="gr-monthly-attendance">
                  <div className="gr-attendance-bar-vertical">
                    <div
                      className="gr-attendance-fill-vertical"
                      style={{ height: `${month.percentage}%` }}
                    />
                  </div>
                  <span className="gr-month-label">{month.month}</span>
                  <span className="gr-percentage-label">
                    {month.percentage}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="gr-academic-achievements">
            <h3>
              <Award size={20} /> Academic Achievements
            </h3>
            <div className="gr-achievements-timeline">
              {student.activities.academic.map((activity, index) => (
                <div key={index} className="gr-timeline-item">
                  <div className="gr-timeline-date">
                    <Calendar size={16} />
                    {formatDate(activity.date)}
                  </div>
                  <div className="gr-timeline-content">
                    <h4>{activity.title}</h4>
                    {activity.position && (
                      <span className="gr-achievement-badge">
                        {activity.position}
                      </span>
                    )}
                    <p>{activity.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="gr-certifications">
            <h3>
              <Target size={20} /> Certifications
            </h3>
            <div className="gr-certifications-grid">
              {student.activities.certifications.map((cert, index) => (
                <div key={index} className="gr-certification-card">
                  <h4>{cert.name}</h4>
                  <p className="gr-cert-issuer">{cert.issuer}</p>
                  <div className="gr-cert-dates">
                    <span>Issued: {formatDate(cert.date)}</span>
                    {cert.validUntil && (
                      <span>Valid until: {formatDate(cert.validUntil)}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default Grades;
