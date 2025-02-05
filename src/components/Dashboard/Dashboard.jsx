import React, { useState, useEffect } from "react";
import {
  TrendingUp,
  AlertTriangle,
  BookOpen,
  Users,
  Calendar,
  Clock,
  Award,
  Target,
  BookMarked,
  GraduationCap,
  Timer,
  ArrowUpRight,
  ArrowDownRight,
  Check,
  Activity,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import "./Dashboard.css";

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedPeriod, setSelectedPeriod] = useState("semester");
  const [studentData, setStudentData] = useState({
    personalInfo: {
      name: "Alex Rodriguez",
      program: "Computer Science",
      semester: 4,
      email: "alex.rodriguez@university.edu",
    },
    performanceData: [
      { month: "Jan", attendance: 95, grades: 85, assignments: 90 },
      { month: "Feb", attendance: 88, grades: 82, assignments: 85 },
      { month: "Mar", attendance: 92, grades: 78, assignments: 82 },
      { month: "Apr", attendance: 85, grades: 88, assignments: 87 },
    ],
    subjectPerformance: [
      { subject: "Mathematics", score: 85, average: 78, trend: "up" },
      { subject: "Physics", score: 78, average: 75, trend: "down" },
      { subject: "Computer Science", score: 92, average: 80, trend: "up" },
      { subject: "English", score: 88, average: 82, trend: "stable" },
    ],
    attendanceBreakdown: [
      { name: "Present", value: 85, color: "#4CAF50" },
      { name: "Excused", value: 10, color: "#FFC107" },
      { name: "Absent", value: 5, color: "#FF5252" },
    ],
    upcomingDeadlines: [
      {
        subject: "Mathematics",
        task: "Linear Algebra Assignment",
        due: "2 days",
        priority: "high",
      },
      {
        subject: "Physics",
        task: "Lab Report Submission",
        due: "4 days",
        priority: "medium",
      },
      {
        subject: "Computer Science",
        task: "Project Milestone",
        due: "1 week",
        priority: "low",
      },
    ],
    recentActivities: [
      {
        type: "submission",
        subject: "Physics",
        detail: "Submitted Lab Report",
        time: "2 hours ago",
        status: "completed",
      },
      {
        type: "grade",
        subject: "Mathematics",
        detail: "Scored 92% in Quiz",
        time: "1 day ago",
        status: "success",
      },
      {
        type: "attendance",
        subject: "Computer Science",
        detail: "Attended Practical Session",
        time: "2 days ago",
        status: "present",
      },
    ],
    riskMetrics: {
      overall: 82,
      attendance: 88,
      assignments: 85,
      grades: 78,
      riskLevel: "moderate",
    },
    earlyWarningIndicators: [
      {
        indicator: "Declining Grades",
        subjects: ["Physics"],
        severity: "moderate",
        recommendation: "Seek additional tutoring",
      },
      {
        indicator: "Missed Assignments",
        subjects: ["Mathematics"],
        severity: "low",
        recommendation: "Review assignment schedule",
      },
    ],
  });

  const renderRiskLevelIndicator = () => {
    const riskColors = {
      low: "#4CAF50",
      moderate: "#FFC107",
      high: "#FF5252",
    };
    const riskLevel = studentData.riskMetrics.riskLevel;

    return (
      <div className="risk-level-indicator">
        <span
          className="risk-dot"
          style={{
            backgroundColor: riskColors[riskLevel],
            marginRight: "8px",
          }}
        />
        Risk Level: {riskLevel.charAt(0).toUpperCase() + riskLevel.slice(1)}
      </div>
    );
  };

  const renderEarlyWarningIndicators = () => {
    return (
      <div className="early-warning-indicators">
        <div className="card-header">
          <AlertTriangle size={20} />
          <h3>Early Warning Indicators</h3>
        </div>
        {studentData.earlyWarningIndicators.map((warning, index) => (
          <div key={index} className="warning-item">
            <div className="warning-header">
              <span className="warning-title">{warning.indicator}</span>
              <span className={`warning-severity ${warning.severity}`}>
                {warning.severity.charAt(0).toUpperCase() +
                  warning.severity.slice(1)}
              </span>
            </div>
            <div className="warning-details">
              <p>Affected Subjects: {warning.subjects.join(", ")}</p>
              <p>Recommendation: {warning.recommendation}</p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="dashboard-wrapper">
      <header className="dashboard-header">
        <div className="student-info">
          <GraduationCap size={24} />
          <div>
            <h1>{studentData.personalInfo.name}</h1>
            <p>{`${studentData.personalInfo.program} - Semester ${studentData.personalInfo.semester}`}</p>
          </div>
        </div>
        <div className="header-actions">
          {renderRiskLevelIndicator()}
          <div className="period-selector">
            <button
              className={selectedPeriod === "semester" ? "active" : ""}
              onClick={() => setSelectedPeriod("semester")}
            >
              Semester
            </button>
            <button
              className={selectedPeriod === "year" ? "active" : ""}
              onClick={() => setSelectedPeriod("year")}
            >
              Year
            </button>
          </div>
        </div>
      </header>

      <nav className="dashboard-nav">
        {["overview", "performance", "attendance", "tasks"].map((tab) => (
          <button
            key={tab}
            className={activeTab === tab ? "active" : ""}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </nav>

      <div className="dashboard-grid">
        {/* Existing cards from previous implementation */}
        {/* Risk Score Card */}
        <div className="dashboard-card primary-card">
          <div className="card-header">
            <Target size={20} />
            <h3>Risk Assessment Score</h3>
          </div>
          <div className="risk-metrics">
            <div className="main-risk-score">
              <div
                className={`score ${
                  studentData.riskMetrics.overall >= 80 ? "good" : "warning"
                }`}
              >
                {studentData.riskMetrics.overall}
              </div>
              <span>Overall Score</span>
            </div>
            <div className="risk-breakdown">
              {["attendance", "assignments", "grades"].map((metric) => (
                <div key={metric} className="metric">
                  <span>
                    {metric.charAt(0).toUpperCase() + metric.slice(1)}
                  </span>
                  <div className="progress-bar">
                    <div
                      className="progress"
                      style={{
                        width: `${studentData.riskMetrics[metric]}%`,
                        backgroundColor:
                          metric === "attendance"
                            ? "#4CAF50"
                            : metric === "assignments"
                            ? "#2196F3"
                            : "#9C27B0",
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Performance Trends Card - Remains the same as previous implementation */}
        <div className="dashboard-card wide-card">
          <div className="card-header">
            <Activity size={20} />
            <h3>Performance Trends</h3>
          </div>
          <div className="chart-container">
            <LineChart
              width={700}
              height={300}
              data={studentData.performanceData}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip />
              <Legend />
              {[
                { key: "attendance", color: "#4CAF50" },
                { key: "grades", color: "#2196F3" },
                { key: "assignments", color: "#9C27B0" },
              ].map((line) => (
                <Line
                  key={line.key}
                  type="monotone"
                  dataKey={line.key}
                  stroke={line.color}
                  strokeWidth={2}
                />
              ))}
            </LineChart>
          </div>
        </div>

        {/* Subject Performance Card */}
        <div className="dashboard-card">
          <div className="card-header">
            <BookMarked size={20} />
            <h3>Subject Performance</h3>
          </div>
          <div className="subject-scores">
            {studentData.subjectPerformance.map((subject, index) => (
              <div key={index} className="subject-score-item">
                <div className="subject-info">
                  <span className="subject-name">{subject.subject}</span>
                  <div className="score-details">
                    <span className="score-value">{subject.score}%</span>
                    {subject.trend === "up" && (
                      <ArrowUpRight color="#4CAF50" size={16} />
                    )}
                    {subject.trend === "down" && (
                      <ArrowDownRight color="#FF5252" size={16} />
                    )}
                  </div>
                </div>
                <div className="score-comparison">
                  <div className="progress-bar">
                    <div
                      className="progress"
                      style={{
                        width: `${subject.score}%`,
                        backgroundColor: "#2196F3",
                      }}
                    ></div>
                    <div
                      className="average-marker"
                      style={{ left: `${subject.average}%` }}
                    ></div>
                  </div>
                  <span className="average-label">
                    Class Avg: {subject.average}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Early Warning Indicators - New Section */}
        <div className="dashboard-card">{renderEarlyWarningIndicators()}</div>

        {/* Remaining cards stay mostly the same, using studentData */}
        {/* Attendance Breakdown Card */}
        <div className="dashboard-card">
          <div className="card-header">
            <Users size={20} />
            <h3>Attendance Overview</h3>
          </div>
          <div className="attendance-container">
            <PieChart width={200} height={200}>
              <Pie
                data={studentData.attendanceBreakdown}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {studentData.attendanceBreakdown.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
            <div className="attendance-legend">
              {studentData.attendanceBreakdown.map((item, index) => (
                <div key={index} className="legend-item">
                  <span
                    className="dot"
                    style={{ backgroundColor: item.color }}
                  ></span>
                  <span>{item.name}</span>
                  <span>{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming Deadlines Card */}
        <div className="dashboard-card">
          <div className="card-header">
            <Timer size={20} />
            <h3>Upcoming Deadlines</h3>
          </div>
          <div className="deadlines-list">
            {studentData.upcomingDeadlines.map((deadline, index) => (
              <div
                key={index}
                className={`deadline-item priority-${deadline.priority}`}
              >
                <div className="deadline-info">
                  <span className="subject">{deadline.subject}</span>
                  <span className="task">{deadline.task}</span>
                </div>
                <span className="due-date">{deadline.due}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity Card */}
        <div className="dashboard-card">
          <div className="card-header">
            <Clock size={20} />
            <h3>Recent Activity</h3>
          </div>
          <div className="activity-list">
            {studentData.recentActivities.map((activity, index) => (
              <div
                key={index}
                className={`activity-item status-${activity.status}`}
              >
                <div className="activity-icon">
                  {activity.type === "submission" && <Check size={16} />}
                  {activity.type === "grade" && <Award size={16} />}
                  {activity.type === "attendance" && <Users size={16} />}
                </div>
                <div className="activity-info">
                  <span className="activity-detail">{activity.detail}</span>
                  <span className="activity-time">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
