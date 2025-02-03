import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc, deleteDoc } from "firebase/firestore";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import "./Schedule.css";

const Schedule = () => {
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [selectedSemester, setSelectedSemester] = useState("All");
  const [userRole, setUserRole] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newExam, setNewExam] = useState({
    examName: "",
    department: "",
    subject: "",
    date: "",
    time: "",
    session: "FN",
    type: "Offline",
    semester: "",
  });
  const [examSchedule, setExamSchedule] = useState([
    {
      id: 1,
      examName: "Midterm Exam",
      department: "CSE",
      subject: "Data Structures",
      date: "2025-02-10",
      time: "10:00 AM",
      session: "FN",
      type: "Offline",
      semester: "2nd",
    },
    {
      id: 2,
      examName: "Semester Exam",
      department: "IT",
      subject: "Operating Systems",
      date: "2025-02-15",
      time: "2:00 PM",
      session: "AN",
      type: "Offline",
      semester: "4th",
    },
    {
      id: 3,
      examName: "Weekly Test",
      department: "ECE",
      subject: "Microprocessors",
      date: "2025-02-08",
      time: "9:00 AM",
      session: "FN",
      type: "Online",
      semester: "3rd",
    },
    {
      id: 4,
      examName: "Lab Practical",
      department: "CSE",
      subject: "DBMS Lab",
      date: "2025-02-12",
      time: "1:00 PM",
      session: "AN",
      type: "Offline",
      semester: "5th",
    },
    {
      id: 5,
      examName: "Final Exam",
      department: "MECH",
      subject: "Thermodynamics",
      date: "2025-02-20",
      time: "10:00 AM",
      session: "FN",
      type: "Offline",
      semester: "6th",
    },
    {
      id: 6,
      examName: "Unit Test",
      department: "AIML",
      subject: "Machine Learning",
      date: "2025-02-18",
      time: "2:00 PM",
      session: "AN",
      type: "Online",
      semester: "2nd",
    },
    {
      id: 7,
      examName: "Semester Exam",
      department: "EEE",
      subject: "Power Systems",
      date: "2025-02-22",
      time: "9:30 AM",
      session: "FN",
      type: "Offline",
      semester: "7th",
    },
    {
      id: 8,
      examName: "Surprise Quiz",
      department: "CSBS",
      subject: "Cloud Computing",
      date: "2025-02-25",
      time: "3:00 PM",
      session: "AN",
      type: "Online",
      semester: "3rd",
    },
  ]);

  useEffect(() => {
    const auth = getAuth();
    const db = getFirestore();

    const fetchUserRole = async (user) => {
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setUserRole(userDoc.data().role);
        }
      }
    };

    const unsubscribe = onAuthStateChanged(auth, fetchUserRole);
    return () => unsubscribe();
  }, []);

  // Filtered Exams based on Department & Semester
  const filteredExams = examSchedule.filter(
    (exam) =>
      (selectedDepartment === "All" ||
        exam.department === selectedDepartment) &&
      (selectedSemester === "All" || exam.semester === selectedSemester)
  );

  // Download PDF functionality
  const downloadPDF = () => {
    const doc = new jsPDF();
    const tableColumn = [
      "Exam Name",
      "Department",
      "Subject",
      "Date",
      "Time",
      "Session",
      "Type",
    ];
    const tableRows = filteredExams.map((exam) => [
      exam.examName,
      exam.department,
      exam.subject,
      exam.date,
      exam.time,
      exam.session,
      exam.type,
    ]);

    doc.text("Exam Schedule", 14, 20);
    doc.autoTable({
      startY: 30,
      head: [tableColumn],
      body: tableRows,
      theme: "striped",
    });
    doc.save("exam_schedule.pdf");
  };

  // Add new exam handler
  const handleAddExam = (e) => {
    e.preventDefault();
    const newExamWithId = {
      ...newExam,
      id: examSchedule.length + 1,
    };
    setExamSchedule([...examSchedule, newExamWithId]);
    setShowAddModal(false);
    // Reset form
    setNewExam({
      examName: "",
      department: "",
      subject: "",
      date: "",
      time: "",
      session: "FN",
      type: "Offline",
      semester: "",
    });
  };

  // Delete exam handler
  const handleDeleteExam = async (examId) => {
    try {
      await deleteDoc(doc(getFirestore(), "exams", examId.toString()));
      setExamSchedule(examSchedule.filter((exam) => exam.id !== examId));
    } catch (error) {
      console.error("Error deleting exam:", error);
    }
  };

  return (
    <div className="gr-schedule-container">
      <h2 className="gr-title">Exam & Test Schedule</h2>

      {/* Filters */}
      <div className="gr-filters">
        <select
          onChange={(e) => setSelectedDepartment(e.target.value)}
          className="gr-select"
        >
          <option value="All">All Departments</option>
          <option value="CSE">CSE</option>
          <option value="IT">IT</option>
          <option value="ECE">ECE</option>
          <option value="EEE">EEE</option>
        </select>

        <select
          onChange={(e) => setSelectedSemester(e.target.value)}
          className="gr-select"
        >
          <option value="All">All Semesters</option>
          <option value="1st">1st Semester</option>
          <option value="2nd">2nd Semester</option>
          <option value="3rd">3rd Semester</option>
          <option value="4th">4th Semester</option>
          <option value="5th">5th Semester</option>
          <option value="6th">6th Semester</option>
          <option value="7th">7th Semester</option>
          <option value="8th">8th Semester</option>
        </select>

        <button className="gr-download-btn" onClick={downloadPDF}>
          Download PDF
        </button>

        {(userRole === "Staff" || userRole === "HOD") && (
          <button className="gr-add-btn" onClick={() => setShowAddModal(true)}>
            Add Exam
          </button>
        )}
      </div>

      {/* Schedule Table */}
      <div className="gr-table-container">
        <table className="gr-table">
          <thead>
            <tr>
              <th>Exam Name</th>
              <th>Department</th>
              <th>Subject</th>
              <th>Date</th>
              <th>Time</th>
              <th>Session</th>
              <th>Type</th>
              {(userRole === "Staff" || userRole === "HOD") && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {filteredExams.length > 0 ? (
              filteredExams.map((exam) => (
                <tr key={exam.id}>
                  <td>{exam.examName}</td>
                  <td>{exam.department}</td>
                  <td>{exam.subject}</td>
                  <td>{exam.date}</td>
                  <td>{exam.time}</td>
                  <td>{exam.session}</td>
                  <td>{exam.type}</td>
                  {(userRole === "Staff" || userRole === "HOD") && (
                    <td>
                      <button
                        className="gr-delete-btn"
                        onClick={() => handleDeleteExam(exam.id)}
                      >
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={userRole === "Staff" || userRole === "HOD" ? 8 : 7}
                  className="gr-no-data"
                >
                  No Exams Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Exam Modal */}
      {showAddModal && (
        <div className="gr-modal-overlay">
          <div className="gr-modal">
            <h3>Add New Exam</h3>
            <form onSubmit={handleAddExam}>
              <div className="gr-modal-form">
                <input
                  type="text"
                  placeholder="Exam Name"
                  value={newExam.examName}
                  onChange={(e) =>
                    setNewExam({ ...newExam, examName: e.target.value })
                  }
                  required
                />
                <select
                  value={newExam.department}
                  onChange={(e) =>
                    setNewExam({ ...newExam, department: e.target.value })
                  }
                  required
                >
                  <option value="">Select Department</option>
                  <option value="CSE">CSE</option>
                  <option value="IT">IT</option>
                  <option value="ECE">ECE</option>
                  <option value="EEE">EEE</option>
                </select>
                <input
                  type="text"
                  placeholder="Subject"
                  value={newExam.subject}
                  onChange={(e) =>
                    setNewExam({ ...newExam, subject: e.target.value })
                  }
                  required
                />
                <input
                  type="date"
                  value={newExam.date}
                  onChange={(e) =>
                    setNewExam({ ...newExam, date: e.target.value })
                  }
                  required
                />
                <input
                  type="time"
                  value={newExam.time}
                  onChange={(e) =>
                    setNewExam({ ...newExam, time: e.target.value })
                  }
                  required
                />
                <select
                  value={newExam.session}
                  onChange={(e) =>
                    setNewExam({ ...newExam, session: e.target.value })
                  }
                >
                  <option value="FN">Forenoon (FN)</option>
                  <option value="AN">Afternoon (AN)</option>
                </select>
                <select
                  value={newExam.type}
                  onChange={(e) =>
                    setNewExam({ ...newExam, type: e.target.value })
                  }
                >
                  <option value="Offline">Offline</option>
                  <option value="Online">Online</option>
                </select>
                <select
                  value={newExam.semester}
                  onChange={(e) =>
                    setNewExam({ ...newExam, semester: e.target.value })
                  }
                  required
                >
                  <option value="">Select Semester</option>
                  <option value="1st">1st Semester</option>
                  <option value="2nd">2nd Semester</option>
                  <option value="3rd">3rd Semester</option>
                  <option value="4th">4th Semester</option>
                  <option value="5th">5th Semester</option>
                  <option value="6th">6th Semester</option>
                  <option value="7th">7th Semester</option>
                  <option value="8th">8th Semester</option>
                </select>
              </div>
              <div className="gr-modal-actions">
                <button type="submit" className="gr-modal-submit">
                  Add Exam
                </button>
                <button
                  type="button"
                  className="gr-modal-cancel"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <button className="grr-back-btn" onClick={() => window.history.back()}>
        Back
      </button>
    </div>
  );
};

export default Schedule;
