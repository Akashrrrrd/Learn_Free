import { useState, useEffect } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "./Attendance.css";

const departments = [
  "CSE",
  "IT",
  "ECE",
  "EEE",
  "MECH",
  "CIVIL",
  "CSBS",
  "AIDS",
  "AIML",
];
const semesters = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"];

const Attendance = () => {
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [attendanceHistory, setAttendanceHistory] = useState({});
  const [showAlerts, setShowAlerts] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [stats, setStats] = useState({});

  useEffect(() => {
    if (selectedDepartment && selectedSemester) {
      fetchStudents();
      fetchAttendanceHistory();
    }
  }, [selectedDepartment, selectedSemester]);

  useEffect(() => {
    if (Object.keys(attendanceHistory).length > 0) {
      calculateStats();
    }
  }, [attendanceHistory]);

  const fetchStudents = async () => {
    const token = localStorage.getItem("userToken");
    try {
      const response = await fetch(
          `http://localhost:8080/learn-free/staff/students?department=${selectedDepartment}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
      );

      const data = await response.json();
      if (Array.isArray(data)) {
        setStudents(
            data.map((student) => ({
              id: student.id,
              name: `${student.firstName} ${student.lastName}`,
              rollNo: student.registrationNumber,
            }))
        );
      } else {
        setStudents([]);
      }
    } catch (error) {
      console.error("Error fetching students:", error);
      setStudents([]);
    }
  };

  const fetchAttendanceHistory = async () => {
    const token = localStorage.getItem("userToken");
    const dummyHistory = {};

    for (const student of students) {
      try {
        const response = await fetch(
            `http://localhost:8080/learn-free/attendance/history?userId=${student.id}&department=${selectedDepartment}&semester=${selectedSemester}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
        );
        const history = await response.json();
        dummyHistory[student.id] = history.map(entry => entry.present);
      } catch (error) {
        console.error("Error fetching history:", error);
      }
    }

    setAttendanceHistory(dummyHistory);
  };


  const calculateStats = () => {
    const newStats = {};
    Object.entries(attendanceHistory).forEach(([studentId, history]) => {
      const totalDays = history.length;
      const presentDays = history.filter((present) => present).length;
      const attendancePercentage = (presentDays / totalDays) * 100;
      newStats[studentId] = {
        totalDays,
        presentDays,
        absentDays: totalDays - presentDays,
        percentage: attendancePercentage.toFixed(2),
      };
    });
    setStats(newStats);
  };

  const handleAttendanceChange = (studentId) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: !prev[studentId],
    }));
  };

  const handleMarkAll = (present) => {
    const newAttendance = {};
    students.forEach((student) => {
      newAttendance[student.id] = present;
    });
    setAttendance(newAttendance);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("userToken");

    const attendanceData = {
      date,
      department: selectedDepartment,
      semester: selectedSemester,
      students: students.map(student => ({
        userId: student.id,
        present: attendance[student.id] || false
      }))
    };

    try {
      const response = await fetch('http://localhost:8080/learn-free/attendance/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(attendanceData)
      });

      if (response.ok) {
        alert("Attendance submitted successfully!");
        setAttendance({});
      }
    } catch (error) {
      console.error("Submission error:", error);
    }
  };


  const downloadPDF = () => {
    const doc = new jsPDF();

    // Add header
    doc.setFontSize(18);
    doc.text("Attendance Report", 14, 15);

    doc.setFontSize(12);
    doc.text(`Date: ${date}`, 14, 25);
    doc.text(`Department: ${selectedDepartment}`, 14, 32);
    doc.text(`Semester: ${selectedSemester}`, 14, 39);

    // Create table data
    const tableData = students.map((student) => [
      student.rollNo,
      student.name,
      attendance[student.id] ? "Present" : "Absent",
      stats[student.id]?.percentage + "%",
    ]);

    doc.autoTable({
      startY: 45,
      head: [["Roll No", "Name", "Attendance", "Overall %"]],
      body: tableData,
      theme: "grid",
    });

    doc.save(
      `attendance_${selectedDepartment}_${selectedSemester}_${date}.pdf`
    );
  };

  const filteredStudents = Array.isArray(students)
      ? students.filter(
          (student) =>
              student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              (student.rollNo && student.rollNo.toLowerCase().includes(searchQuery.toLowerCase()))
      )
      : [];


  const getAttendanceAlert = (studentId) => {
    const studentStats = stats[studentId];
    if (!studentStats) return null;

    if (parseFloat(studentStats.percentage) < 75) {
      return {
        type: "danger",
        message: "Low attendance! Below 75% threshold.",
      };
    } else if (parseFloat(studentStats.percentage) < 85) {
      return {
        type: "warning",
        message: "Attendance needs improvement.",
      };
    }
    return null;
  };

  return (
    <div className="att-container">
      <div className="att-header">
        <h2>Attendance Management System</h2>
        <div className="att-header-right">
          <div className="att-date">
            <span>Date: </span>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <button
            className="att-btn att-btn-secondary"
            onClick={() => setShowAlerts(!showAlerts)}
          >
            {showAlerts ? "Hide Alerts" : "Show Alerts"}
          </button>
        </div>
      </div>

      <div className="att-controls">
        <div className="att-filters">
          <div className="att-filter-item">
            <label>Department:</label>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
            >
              <option value="">Select</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>
          <div className="att-filter-item">
            <label>Semester:</label>
            <select
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
            >
              <option value="">Select</option>
              {semesters.map((sem) => (
                <option key={sem} value={sem}>
                  {sem}
                </option>
              ))}
            </select>
          </div>
          <div className="att-filter-item">
            <label>Search:</label>
            <input
              type="text"
              placeholder="Search by name or roll no..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="att-search-input"
            />
          </div>
        </div>

        {students.length > 0 && (
          <div className="att-actions">
            <button
              onClick={() => handleMarkAll(true)}
              className="att-btn att-btn-present"
            >
              Mark All Present
            </button>
            <button
              onClick={() => handleMarkAll(false)}
              className="att-btn att-btn-absent"
            >
              Mark All Absent
            </button>
            <button onClick={downloadPDF} className="att-btn att-btn-download">
              Download PDF
            </button>
          </div>
        )}
      </div>

      {students.length > 0 && (
        <form onSubmit={handleSubmit}>
          <div className="att-table">
            <table>
              <thead>
                <tr>
                  <th>Roll No</th>
                  <th>Student Name</th>
                  <th>Overall Attendance</th>
                  <th>Today's Attendance</th>
                  {showAlerts && <th>Alerts</th>}
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => {
                  const alert = getAttendanceAlert(student.id);
                  return (
                    <tr key={student.id}>
                      <td>{student.rollNo}</td>
                      <td>{student.name}</td>
                      <td>{stats[student.id]?.percentage}%</td>
                      <td>
                        <label className="att-attendance-radio">
                          <input
                            type="checkbox"
                            checked={attendance[student.id] || false}
                            onChange={() => handleAttendanceChange(student.id)}
                          />
                          <span>
                            {attendance[student.id] ? "Present" : "Absent"}
                          </span>
                        </label>
                      </td>
                      {showAlerts && (
                        <td>
                          {alert && (
                            <div
                              className={`att-alert att-alert-${alert.type}`}
                            >
                              {alert.message}
                            </div>
                          )}
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="att-submit">
            <button type="submit" className="att-btn att-btn-submit">
              Submit Attendance
            </button>
          </div>
        </form>
      )}

      {!students.length && (
        <div className="att-no-data">
          Select Department & Semester to load students
        </div>
      )}
    </div>
  );
};

export default Attendance;
