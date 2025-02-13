import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AddStudent.css";

const departments = ["CSE", "IT", "ECE", "EEE", "MECH", "CIVIL", "CSBS", "AIDS", "AIML"];
const academicYears = ["2022", "2023", "2024", "2025"];

const AddStudent = () => {
    const [department, setDepartment] = useState("");
    const [academicYear, setAcademicYear] = useState("");
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    // Check user role on mount
    useEffect(() => {
        const userData = localStorage.getItem("userRole");
        if (userData !== "STAFF") {
            navigate("/attendance");
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file || !department || !academicYear) {
            setMessage("Please fill all fields");
            return;
        }

        const formData = new FormData();
        formData.append("students_data", file);
        formData.append("department", department);
        formData.append("academicYear", academicYear);

        try {
            const token = localStorage.getItem("userToken");
            const response = await fetch("http://localhost:8080/learn-free/staff/add-students", {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
                body: formData,
            });

            // Handle non-JSON responses
            const contentType = response.headers.get("content-type");
            let data;

            if (contentType && contentType.includes("application/json")) {
                data = await response.json();
            } else {
                const text = await response.text();
                throw new Error(text || "Invalid response format");
            }

            if (response.ok) {
                setMessage("Students added successfully!");
                setTimeout(() => navigate("/attendance"), 2000);
            } else {
                setMessage(data.message || "Failed to add students");
            }
        } catch (error) {
            setMessage(error.message || "Error submitting form");
        }
    };

    return (
        <div className="add-student-container">
            <h2>Add Students via Excel</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Department:</label>
                    <select
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        required
                    >
                        <option value="">Select Department</option>
                        {departments.map((dept) => (
                            <option key={dept} value={dept}>{dept}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label>Academic Year:</label>
                    <select
                        value={academicYear}
                        onChange={(e) => setAcademicYear(e.target.value)}
                        required
                    >
                        <option value="">Select Year</option>
                        {academicYears.map((year) => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label>Upload Excel File:</label>
                    <input
                        type="file"
                        accept=".xlsx, .xls"
                        onChange={(e) => setFile(e.target.files[0])}
                        required
                    />
                </div>

                <button type="submit" className="submit-btn">
                    Upload and Add Students
                </button>
            </form>
            {message && <div className="message">{message}</div>}
        </div>
    );
};

export default AddStudent;