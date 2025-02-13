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
const semesterMap = {
  "1st": 1,
  "2nd": 2,
  "3rd": 3,
  "4th": 4,
  "5th": 5,
  "6th": 6,
  "7th": 7,
  "8th": 8,
};
const semesters = Object.keys(semesterMap);
const academicYears = ["2022", "2023", "2024", "2025"];
const getSemesterNumber = (semester) => semesterMap[semester] || null;
const getCurrentSemester = (academicYear) => {
  const currentYear = new Date().getFullYear();
  const diff = currentYear - parseInt(academicYear, 10);
  let sem = diff === 0 ? 1 : diff * 2;
  if (sem < 1) sem = 1;
  if (sem > 8) sem = 8;
  return Object.keys(semesterMap).find((key) => semesterMap[key] === sem) || "";
};

const Attendance = () => {
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [attendanceHistory, setAttendanceHistory] = useState([]);
  const [showAlerts, setShowAlerts] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [stats, setStats] = useState({});

  useEffect(() => {
    if (selectedYear) {
      setSelectedSemester(getCurrentSemester(selectedYear));
    }
  }, [selectedYear]);

  useEffect(() => {
    if (selectedDepartment && selectedSemester && selectedYear) {
      fetchStudents();
      fetchAttendanceHistory();
    }
  }, [selectedDepartment, selectedSemester, selectedYear]);

  useEffect(() => {
    if (attendanceHistory.length > 0) {
      calculateStats();
    }
  }, [attendanceHistory]);

  const getHeaders = () => {
    const token = localStorage.getItem("userToken");
    return token && token !== "null"
        ? { Authorization: `Bearer ${token}` }
        : {};
  };

  const fetchStudents = async () => {
    if (!selectedDepartment || !selectedYear) return;
    try {
      const response = await fetch(
          `/learn-free/staff/students?department=${selectedDepartment}&academicYear=${selectedYear}`,
          { headers: getHeaders() }
      );
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
      setStudents(
          data.map((student) => ({
            id: student.id,
            name: `${student.firstName} ${student.lastName}`,
            rollNo: student.registrationNumber,
            email: student.personalEmail,
            phone: student.mobileNumber,
          }))
      );
    } catch (error) {
      console.error("Error fetching students:", error);
      alert("Failed to fetch students. Please check your connection or credentials.");
    }
  };

  const fetchAttendanceHistory = async () => {
    if (!selectedDepartment || !selectedSemester || !selectedYear) return;
    try {
      const response = await fetch(
          `/learn-free/attendance/history?department=${selectedDepartment}&academicYear=${selectedYear}&semester=${getSemesterNumber(selectedSemester)}`,
          { headers: getHeaders() }
      );
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
      setAttendanceHistory(data);
    } catch (error) {
      console.error("Error fetching attendance history:", error);
      alert("Failed to fetch attendance history. Please check your connection or credentials.");
    }
  };


  const calculateStats = () => {
    const newStats = {};
    attendanceHistory.forEach((record) => {
      const id = record.userId;
      if (!newStats[id]) newStats[id] = { totalDays: 0, presentDays: 0 };
      newStats[id].totalDays++;
      if (record.present) newStats[id].presentDays++;
    });
    Object.keys(newStats).forEach((id) => {
      const { totalDays, presentDays } = newStats[id];
      newStats[id].percentage = ((presentDays / totalDays) * 100).toFixed(2);
      newStats[id].absentDays = totalDays - presentDays;
    });
    setStats(newStats);
  };

  const handleAttendanceChange = (studentId) => {
    setAttendance((prev) => ({ ...prev, [studentId]: !prev[studentId] }));
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
    if (!selectedDepartment || !selectedSemester || !selectedYear) return;
    try {
      const response = await fetch("/learn-free/attendance/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", ...getHeaders() },
        body: JSON.stringify({
          date,
          department: selectedDepartment,
          semester: getSemesterNumber(selectedSemester),
          academicYear: parseInt(selectedYear),
          students: students.map((s) => ({
            userId: s.id,
            present: !!attendance[s.id],
          })),
        }),
      });
      if (response.ok) alert("Attendance submitted successfully!");
      else alert("Failed to submit attendance.");
    } catch (error) {
      console.error("Error submitting attendance:", error);
    }
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Attendance Report", 14, 15);
    doc.setFontSize(12);
    doc.text(`Date: ${date}`, 14, 25);
    doc.text(`Department: ${selectedDepartment}`, 14, 32);
    doc.text(`Year: ${selectedYear}`, 14, 39);
    doc.text(`Semester: ${selectedSemester}`, 14, 46);
    const tableData = students.map((student) => [
      student.rollNo,
      student.name,
      attendance[student.id] ? "Present" : "Absent",
      stats[student.id]?.percentage + "%",
    ]);
    doc.autoTable({
      startY: 52,
      head: [["Roll No", "Name", "Attendance", "Overall %"]],
      body: tableData,
      theme: "grid",
    });
    doc.save(
        `attendance_${selectedDepartment}_${selectedYear}_${selectedSemester}_${date}.pdf`
    );
  };

  const filteredStudents = students.filter(
      (student) =>
          student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          student.rollNo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getAttendanceAlert = (studentId) => {
    const studentStats = stats[studentId];
    if (!studentStats) return null;
    if (parseFloat(studentStats.percentage) < 75)
      return { type: "danger", message: "Low attendance! Below 75% threshold." };
    else if (parseFloat(studentStats.percentage) < 85)
      return { type: "warning", message: "Attendance needs improvement." };
    return null;
  };

  return (
      <div className="att-container">
        <div className="att-header">
          <h2>Attendance Management System</h2>
          <div className="att-header-right">
            <div className="att-date">
              <span>Date: </span>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
            <button className="att-btn att-btn-secondary" onClick={() => setShowAlerts(!showAlerts)}>
              {showAlerts ? "Hide Alerts" : "Show Alerts"}
            </button>
          </div>
        </div>
        <div className="att-controls">
          <div className="att-filters">
            <div className="att-filter-item">
              <label>Department:</label>
              <select value={selectedDepartment} onChange={(e) => setSelectedDepartment(e.target.value)}>
                <option value="">Select</option>
                {departments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                ))}
              </select>
            </div>
            <div className="att-filter-item">
              <label>Year:</label>
              <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
                <option value="">Select</option>
                {academicYears.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                ))}
              </select>
            </div>
            <div className="att-filter-item">
              <label>Semester:</label>
              <select value={selectedSemester} onChange={(e) => setSelectedSemester(e.target.value)}>
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
                <button onClick={() => handleMarkAll(true)} className="att-btn att-btn-present">
                  Mark All Present
                </button>
                <button onClick={() => handleMarkAll(false)} className="att-btn att-btn-absent">
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
                              <span>{attendance[student.id] ? "Present" : "Absent"}</span>
                            </label>
                          </td>
                          {showAlerts && (
                              <td>
                                {alert && (
                                    <div className={`att-alert att-alert-${alert.type}`}>{alert.message}</div>
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
            <div className="att-no-data">Select Department, Year & Semester to load students</div>
        )}
      </div>
  );
};

export default Attendance;
