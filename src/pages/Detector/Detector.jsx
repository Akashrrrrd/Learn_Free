import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertTriangle,
  Award,
  BarChart2,
  BookOpen,
  Calendar,
  TrendingDown,
  TrendingUp,
  User,
  Clock,
  Bell,
  CreditCard,
  FileText,
} from "lucide-react";
import "./Detector.css";

const Detector = ({ userRole, userId }) => {
  const [students, setStudents] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [examAlerts, setExamAlerts] = useState([]);
  const [feeAlerts, setFeeAlerts] = useState([]);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [performanceHistory, setPerformanceHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const calculateRiskScore = (student) => {
    let score = 100;

    // Attendance impact (40% weight)
    if (student.attendance < 75) {
      score -= ((75 - student.attendance) / 75) * 40;
    }

    // CGPA impact (40% weight)
    if (student.cgpa < 6.0) {
      score -= ((6.0 - student.cgpa) / 6.0) * 40;
    }

    // Assignment completion impact (20% weight)
    if (student.assignmentCompletion < 80) {
      score -= ((80 - student.assignmentCompletion) / 80) * 20;
    }

    return Math.max(0, Math.round(score));
  };

  useEffect(() => {
    const fetchData = async () => {
      // Simulated API call with enhanced student data
      const fetchedStudents = [
        {
          id: 1,
          name: "Rahul Sharma",
          attendance: 65,
          cgpa: 6.2,
          assignmentCompletion: 75,
          subjects: [
            { name: "Mathematics", grade: "C+", trend: "declining" },
            { name: "Physics", grade: "B", trend: "stable" },
            { name: "Computer Science", grade: "B+", trend: "improving" },
          ],
          lastActive: "2024-02-08",
          semester: 4,
        },
        {
          id: 2,
          name: "Ayesha Khan",
          attendance: 90,
          cgpa: 8.5,
          assignmentCompletion: 95,
          subjects: [
            { name: "Mathematics", grade: "A", trend: "stable" },
            { name: "Physics", grade: "A-", trend: "improving" },
            { name: "Computer Science", grade: "A+", trend: "stable" },
          ],
          lastActive: "2024-02-09",
          semester: 4,
        },
      ];

      setStudents(fetchedStudents);

      // Generate performance history (simulated)
      const history = Array.from({ length: 6 }, (_, i) => ({
        month: new Date(2024, i).toLocaleString("default", { month: "short" }),
        attendance: Math.random() * 20 + 75,
        cgpa: (Math.random() * 2 + 6).toFixed(1),
      }));
      setPerformanceHistory(history);

      if (userRole === "student") {
        const studentData = fetchedStudents.find((s) => s.id === userId);
        setCurrentStudent(studentData);

        if (studentData) {
          const studentAlerts = [];
          if (studentData.attendance < 75) {
            studentAlerts.push({
              id: 1,
              type: "critical",
              message: "Attendance below 75%! Risk of semester detention.",
              action: "Schedule a meeting with your advisor.",
            });
          }
          if (studentData.cgpa < 6.0) {
            studentAlerts.push({
              id: 2,
              type: "warning",
              message: "CGPA below minimum requirement.",
              action: "Visit academic support center.",
            });
          }
          if (studentData.assignmentCompletion < 80) {
            studentAlerts.push({
              id: 3,
              type: "info",
              message: "Assignment completion rate needs improvement.",
              action: "Check pending assignments.",
            });
          }
          setAlerts(studentAlerts);

          // Manually added exam alerts
          const examAlerts = [
            {
              id: 1,
              type: "warning",
              message: "GATE Mock Test on 25th February 2024.",
              action: "Start preparing for the test.",
            },
            {
              id: 2,
              type: "info",
              message: "NPTEL Week 1 submission deadline: 20th February 2024.",
              action: "Complete and submit your assignments.",
            },
            {
              id: 3,
              type: "critical",
              message: "Internal Assessment (IA) on Monday, 19th February 2024.",
              action: "Revise the syllabus and prepare for the IA.",
            },
          ];
          setExamAlerts(examAlerts);

          // Manually added fee alerts
          const feeAlerts = [
            {
              id: 1,
              type: "warning",
              message: "Uniform fee payment deadline: 22nd February 2024.",
              action: "Pay the fee before the deadline.",
            },
            {
              id: 2,
              type: "critical",
              message: "Exam fee payment deadline: 28th February 2024.",
              action: "Pay the fee to avoid late charges.",
            },
            {
              id: 3,
              type: "info",
              message: "Registration fee payment deadline: 15th March 2024.",
              action: "Complete the payment process.",
            },
          ];
          setFeeAlerts(feeAlerts);
        }
      } else {
        // For Staff/HOD: Comprehensive risk assessment
        const detectedAlerts = fetchedStudents
          .filter((student) => calculateRiskScore(student) < 70)
          .map((student) => ({
            id: student.id,
            type: calculateRiskScore(student) < 50 ? "critical" : "warning",
            name: student.name,
            message: `Risk Score: ${calculateRiskScore(student)}%`,
            details: `Attendance: ${student.attendance}% | CGPA: ${student.cgpa}`,
          }));
        setAlerts(detectedAlerts);
      }

      setLoading(false);
    };

    fetchData();
  }, [userRole, userId]);

  const renderPerformanceCard = (student) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="performance-card"
    >
      <div className="performance-header">
        <User size={24} />
        <h3>{student.name}</h3>
      </div>

      <div className="metrics-grid">
        <div className="metric">
          <Calendar size={20} />
          <span>Attendance</span>
          <h4>{student.attendance}%</h4>
        </div>

        <div className="metric">
          <Award size={20} />
          <span>CGPA</span>
          <h4>{student.cgpa}</h4>
        </div>

        <div className="metric">
          <BookOpen size={20} />
          <span>Assignments</span>
          <h4>{student.assignmentCompletion}%</h4>
        </div>

        <div className="metric">
          <BarChart2 size={20} />
          <span>Risk Score</span>
          <h4>{calculateRiskScore(student)}%</h4>
        </div>
      </div>

      <div className="subjects-section">
        <h4>Subject Performance</h4>
        {student.subjects.map((subject, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="subject-row"
          >
            <span>{subject.name}</span>
            <span
              className={`grade ${
                subject.grade.includes("A")
                  ? "excellent"
                  : subject.grade.includes("B")
                  ? "good"
                  : "needs-improvement"
              }`}
            >
              {subject.grade}
            </span>
            {subject.trend === "improving" ? (
              <TrendingUp size={16} className="trend-up" />
            ) : subject.trend === "declining" ? (
              <TrendingDown size={16} className="trend-down" />
            ) : (
              <span className="trend-stable">→</span>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

  if (loading) {
    return (
      <div className="loading-container">
        <Clock className="spin" size={40} />
        <p>Loading academic data...</p>
      </div>
    );
  }

  return (
    <div className="detector-container">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="page-title"
      >
        Academic Progress Tracker
      </motion.h2>

      {userRole === "student" ? (
        currentStudent ? (
          <>
            {/* Grades & Attendance Risk Alerts */}
            <AnimatePresence>
              {alerts.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="alerts-container"
                >
                  {alerts.map((alert) => (
                    <motion.div
                      key={alert.id}
                      initial={{ x: -100, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      className={`alert-card ${alert.type}`}
                    >
                      <AlertTriangle size={20} />
                      <div className="alert-content">
                        <p className="alert-message">{alert.message}</p>
                        <p className="alert-action">{alert.action}</p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Upcoming Exam Alerts */}
            <AnimatePresence>
              {examAlerts.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="alerts-container"
                >
                  {examAlerts.map((alert) => (
                    <motion.div
                      key={alert.id}
                      initial={{ x: -100, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      className={`alert-card ${alert.type}`}
                    >
                      <Bell size={20} />
                      <div className="alert-content">
                        <p className="alert-message">{alert.message}</p>
                        <p className="alert-action">{alert.action}</p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Fee Payment Alerts */}
            <AnimatePresence>
              {feeAlerts.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="alerts-container"
                >
                  {feeAlerts.map((alert) => (
                    <motion.div
                      key={alert.id}
                      initial={{ x: -100, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      className={`alert-card ${alert.type}`}
                    >
                      <CreditCard size={20} />
                      <div className="alert-content">
                        <p className="alert-message">{alert.message}</p>
                        <p className="alert-action">{alert.action}</p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {renderPerformanceCard(currentStudent)}
          </>
        ) : (
          <p>Student data not found.</p>
        )
      ) : (
        <div className="staff-view">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="risk-summary"
          >
            <h3>At-Risk Students Overview</h3>
            <div className="alerts-grid">
              {alerts.map((alert) => (
                <motion.div
                  key={alert.id}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className={`risk-card ${alert.type}`}
                >
                  <h4>{alert.name}</h4>
                  <p className="risk-score">{alert.message}</p>
                  <p className="risk-details">{alert.details}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="students-table-container"
          >
            <table className="students-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Attendance</th>
                  <th>CGPA</th>
                  <th>Assignments</th>
                  <th>Risk Level</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => {
                  const riskScore = calculateRiskScore(student);
                  return (
                    <motion.tr
                      key={student.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: student.id * 0.1 }}
                      className={
                        riskScore < 50
                          ? "high-risk"
                          : riskScore < 70
                          ? "medium-risk"
                          : "low-risk"
                      }
                    >
                      <td>{student.name}</td>
                      <td>{student.attendance}%</td>
                      <td>{student.cgpa}</td>
                      <td>{student.assignmentCompletion}%</td>
                      <td>
                        <span
                          className={`risk-badge ${
                            riskScore < 50
                              ? "critical"
                              : riskScore < 70
                              ? "warning"
                              : "safe"
                          }`}
                        >
                          {riskScore}%
                        </span>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Detector;