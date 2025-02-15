import { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import "./Schedule.css";

const Schedule = () => {
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [selectedSemester, setSelectedSemester] = useState("All");
  const [userRole] = useState(localStorage.getItem("userRole"));
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
  const [examSchedule, setExamSchedule] = useState([]);

  // Function to fetch exams from the backend using the auth token
  const fetchExams = async () => {
    try {
      const token = localStorage.getItem("userToken");
      const response = await fetch(
          `/learn-free/schedule?department=${selectedDepartment}&semester=${selectedSemester}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
      );
      if (response.ok) {
        const data = await response.json();
        setExamSchedule(data);
      } else {
        console.error("Failed to fetch exams");
      }
    } catch (error) {
      console.error("Error fetching exams:", error);
    }
  };

  // Fetch exams when component mounts and when filters change
  useEffect(() => {
    fetchExams();
  }, [selectedDepartment, selectedSemester]);

  // Download PDF functionality using the current examSchedule
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
    const tableRows = examSchedule.map((exam) => [
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

  // Add new exam handler: sends a POST request to add an exam to the backend
  const handleAddExam = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("userToken");
      const response = await fetch("/learn-free/schedule", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newExam),
      });
      if (response.ok) {
        const addedExam = await response.json();
        // Update the state with the newly added exam
        setExamSchedule([...examSchedule, addedExam]);
        setShowAddModal(false);
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
      } else {
        console.error("Failed to add exam");
      }
    } catch (error) {
      console.error("Error adding exam:", error);
    }
  };

  // Delete exam handler: sends a DELETE request to the backend
  const handleDeleteExam = async (examId) => {
    try {
      const token = localStorage.getItem("userToken");
      const response = await fetch(`/learn-free/schedule/${examId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 204) {
        setExamSchedule(examSchedule.filter((exam) => exam.id !== examId));
      } else {
        console.error("Failed to delete exam");
      }
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
              className="sc-gr-select"
          >
            <option value="All">All Departments</option>
            <option value="CSE">CSE</option>
            <option value="IT">IT</option>
            <option value="ECE">ECE</option>
            <option value="EEE">EEE</option>
          </select>

          <select
              onChange={(e) => setSelectedSemester(e.target.value)}
              className="sc-gr-select"
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

          <button className="grr-back-btn" onClick={downloadPDF}>
            Download PDF
          </button>

          {(userRole === "STAFF" || userRole === "HOD") && (
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
              {(userRole === "STAFF" || userRole === "HOD") && <th>Actions</th>}
            </tr>
            </thead>
            <tbody>
            {examSchedule.length > 0 ? (
                examSchedule.map((exam) => (
                    <tr key={exam.id}>
                      <td>{exam.examName}</td>
                      <td>{exam.department}</td>
                      <td>{exam.subject}</td>
                      <td>{exam.date}</td>
                      <td>{exam.time}</td>
                      <td>{exam.session}</td>
                      <td>{exam.type}</td>
                      {(userRole === "STAFF" || userRole === "HOD") && (
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
                      colSpan={userRole === "STAFF" || userRole === "HOD" ? 8 : 7}
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
