import { useEffect, useState } from "react";
import axios from "axios";
import "./Profile.css";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    dateOfBirth: "",
    studentId: "",
    major: "",
    academicYear: "",
    semester: "",
    gpa: "",
    department: "",
    advisor: "",
    enrollmentDate: "",
    expectedGraduation: "",
    achievements: [],
    activities: [],
    certificates: [],
    courses: [],
  });
  const userId = localStorage.getItem("userId");
  const userToken = localStorage.getItem("userToken");

  const fetchProfileData = async () => {
    if (!userId) return;
    try {
      const response = await axios.get(`/learn-free/profile/view/${userId}`, {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      const data = response.data;
      setProfile({
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        email: data.personalEmail || "",
        phone: data.mobileNumber || "",
        gender: data.gender || "",
        dateOfBirth: data.dateOfBirth || "",
        studentId: data.registrationNumber || "",
        major: data.major || "",
        academicYear: data.academicYear || "",
        semester: data.semester || "",
        gpa: data.gpa || "",
        department: data.department || "",
        advisor: data.advisor || "",
        enrollmentDate: data.enrollmentDate || "",
        expectedGraduation: data.expectedGraduation || "",
        achievements: data.achievements || [],
        activities: data.activities || [],
        certificates: data.certificates || [],
        courses: data.courses || [],
      });
    } catch (error) {
      console.error("Error fetching profile:", error);
      alert("Failed to load profile data");
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, [userId, userToken]);

  const [newAchievement, setNewAchievement] = useState("");
  const [newActivity, setNewActivity] = useState("");
  const [newCertificate, setNewCertificate] = useState("");
  const [newCourse, setNewCourse] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayInputChange = (type, value) => {
    if (!value.trim()) return;
    setProfile((prev) => ({ ...prev, [type]: [...prev[type], value] }));
    switch (type) {
      case "achievements":
        setNewAchievement("");
        break;
      case "activities":
        setNewActivity("");
        break;
      case "certificates":
        setNewCertificate("");
        break;
      case "courses":
        setNewCourse("");
        break;
      default:
        break;
    }
  };

  const handleSave = async () => {
    try {
      const updateData = {
        firstName: profile.firstName,
        lastName: profile.lastName,
        gender: profile.gender,
        dateOfBirth: profile.dateOfBirth,
        mobileNumber: profile.phone,
        department: profile.department,
        personalEmail: profile.email,
        studentId: profile.studentId,
        major: profile.major,
        academicYear: parseInt(profile.academicYear),
        semester: parseInt(profile.semester),
        gpa: parseFloat(profile.gpa),
        advisor: profile.advisor,
        enrollmentDate: profile.enrollmentDate,
        expectedGraduation: profile.expectedGraduation,
        achievements: profile.achievements,
        activities: profile.activities,
        courses: profile.courses,
        certificates: profile.certificates,
      };
      await axios.post(
          "/learn-free/profile/student/update",
          updateData,
          { headers: { Authorization: `Bearer ${userToken}` } }
      );
      await fetchProfileData();
      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Update failed:", error.response?.data);
      alert(error.response?.data.message || "Update failed");
    }
  };

  const handleRemoveItem = (type, index) => {
    setProfile((prev) => ({ ...prev, [type]: prev[type].filter((_, i) => i !== index) }));
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const profilePicture = document.querySelector(".pro-profile-picture img");
        if (profilePicture) profilePicture.src = reader.result;
      };
      reader.readAsDataURL(file);
    }
  };

  return (
      <div className="pro-profile-container">
        <div className="pro-profile-header">
          <div className="pro-profile-picture">
            <img src="/api/placeholder/150/150" alt="Profile" />
            {isEditing && (
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePictureChange}
                    className="pro-profile-picture-input"
                />
            )}
          </div>
          <button
              className="pro-edit-button"
              onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
          >
            {isEditing ? "Save Profile" : "Edit Profile"}
          </button>
        </div>
        <div className="pro-profile-content">
          <div className="pro-profile-section">
            <h2>Personal Information</h2>
            <div className="pro-info-grid">
              <div className="pro-info-item">
                <label>First Name:</label>
                {isEditing ? (
                    <input
                        type="text"
                        name="firstName"
                        value={profile.firstName}
                        onChange={handleInputChange}
                    />
                ) : (
                    <span>{profile.firstName}</span>
                )}
              </div>
              <div className="pro-info-item">
                <label>Last Name:</label>
                {isEditing ? (
                    <input
                        type="text"
                        name="lastName"
                        value={profile.lastName}
                        onChange={handleInputChange}
                    />
                ) : (
                    <span>{profile.lastName}</span>
                )}
              </div>
              <div className="pro-info-item">
                <label>Email:</label>
                {isEditing ? (
                    <input
                        type="email"
                        name="email"
                        value={profile.email}
                        onChange={handleInputChange}
                    />
                ) : (
                    <span>{profile.email}</span>
                )}
              </div>
              <div className="pro-info-item">
                <label>Phone:</label>
                {isEditing ? (
                    <input
                        type="tel"
                        name="phone"
                        value={profile.phone}
                        onChange={handleInputChange}
                    />
                ) : (
                    <span>{profile.phone}</span>
                )}
              </div>
              <div className="pro-info-item">
                <label>Gender:</label>
                {isEditing ? (
                    <select name="gender" value={profile.gender} onChange={handleInputChange}>
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                ) : (
                    <span>{profile.gender}</span>
                )}
              </div>
            </div>
          </div>
          <div className="pro-profile-section">
            <h2>Academic Information</h2>
            <div className="pro-info-grid">
              <div className="pro-info-item">
                <label>Student ID:</label>
                {isEditing ? (
                    <input
                        type="text"
                        name="studentId"
                        value={profile.studentId}
                        onChange={handleInputChange}
                    />
                ) : (
                    <span>{profile.studentId}</span>
                )}
              </div>
              <div className="pro-info-item">
                <label>Major:</label>
                {isEditing ? (
                    <input
                        type="text"
                        name="major"
                        value={profile.major}
                        onChange={handleInputChange}
                    />
                ) : (
                    <span>{profile.major}</span>
                )}
              </div>
              <div className="pro-info-item">
                <label>Year of Study:</label>
                {isEditing ? (
                    <input
                        type="text"
                        name="academicYear"
                        value={profile.academicYear}
                        onChange={handleInputChange}
                    />
                ) : (
                    <span>{profile.academicYear}</span>
                )}
              </div>
              <div className="pro-info-item">
                <label>Current Semester:</label>
                {isEditing ? (
                    <input
                        type="text"
                        name="semester"
                        value={profile.semester}
                        onChange={handleInputChange}
                    />
                ) : (
                    <span>{profile.semester}</span>
                )}
              </div>
              <div className="pro-info-item">
                <label>GPA:</label>
                {isEditing ? (
                    <input
                        type="number"
                        step="0.01"
                        name="gpa"
                        value={profile.gpa}
                        onChange={handleInputChange}
                    />
                ) : (
                    <span>{profile.gpa}</span>
                )}
              </div>
              <div className="pro-info-item">
                <label>Department:</label>
                {isEditing ? (
                    <input
                        type="text"
                        name="department"
                        value={profile.department}
                        onChange={handleInputChange}
                    />
                ) : (
                    <span>{profile.department}</span>
                )}
              </div>
              <div className="pro-info-item">
                <label>Academic Advisor:</label>
                {isEditing ? (
                    <input
                        type="text"
                        name="advisor"
                        value={profile.advisor}
                        onChange={handleInputChange}
                    />
                ) : (
                    <span>{profile.advisor}</span>
                )}
              </div>
              <div className="pro-info-item">
                <label>Enrollment Date:</label>
                {isEditing ? (
                    <input
                        type="date"
                        name="enrollmentDate"
                        value={profile.enrollmentDate}
                        onChange={handleInputChange}
                    />
                ) : (
                    <span>{profile.enrollmentDate}</span>
                )}
              </div>
              <div className="pro-info-item">
                <label>Expected Graduation:</label>
                {isEditing ? (
                    <input
                        type="date"
                        name="expectedGraduation"
                        value={profile.expectedGraduation}
                        onChange={handleInputChange}
                    />
                ) : (
                    <span>{profile.expectedGraduation}</span>
                )}
              </div>
            </div>
          </div>
          <div className="pro-profile-section">
            <h2>Current Courses</h2>
            <ul>
              {profile.courses.map((course, index) => (
                  <li key={index}>
                    {course}
                    {isEditing && (
                        <button className="pro-remove-button" onClick={() => handleRemoveItem("courses", index)}>
                          ×
                        </button>
                    )}
                  </li>
              ))}
            </ul>
            {isEditing && (
                <div className="pro-add-item">
                  <input type="text" value={newCourse} onChange={(e) => setNewCourse(e.target.value)} placeholder="Add new course" />
                  <button onClick={() => handleArrayInputChange("courses", newCourse)}>Add</button>
                </div>
            )}
          </div>
          <div className="pro-profile-section">
            <h2>Achievements</h2>
            <ul>
              {profile.achievements.map((achievement, index) => (
                  <li key={index}>
                    {achievement}
                    {isEditing && (
                        <button className="pro-remove-button" onClick={() => handleRemoveItem("achievements", index)}>
                          ×
                        </button>
                    )}
                  </li>
              ))}
            </ul>
            {isEditing && (
                <div className="pro-add-item">
                  <input type="text" value={newAchievement} onChange={(e) => setNewAchievement(e.target.value)} placeholder="Add new achievement" />
                  <button onClick={() => handleArrayInputChange("achievements", newAchievement)}>Add</button>
                </div>
            )}
          </div>
          <div className="pro-profile-section">
            <h2>Activities</h2>
            <ul>
              {profile.activities.map((activity, index) => (
                  <li key={index}>
                    {activity}
                    {isEditing && (
                        <button className="pro-remove-button" onClick={() => handleRemoveItem("activities", index)}>
                          ×
                        </button>
                    )}
                  </li>
              ))}
            </ul>
            {isEditing && (
                <div className="pro-add-item">
                  <input type="text" value={newActivity} onChange={(e) => setNewActivity(e.target.value)} placeholder="Add new activity" />
                  <button onClick={() => handleArrayInputChange("activities", newActivity)}>Add</button>
                </div>
            )}
          </div>
          <div className="pro-profile-section">
            <h2>Certificates</h2>
            <ul>
              {profile.certificates.map((certificate, index) => (
                  <li key={index}>
                    {certificate}
                    {isEditing && (
                        <button className="pro-remove-button" onClick={() => handleRemoveItem("certificates", index)}>
                          ×
                        </button>
                    )}
                  </li>
              ))}
            </ul>
            {isEditing && (
                <div className="pro-add-item">
                  <input type="text" value={newCertificate} onChange={(e) => setNewCertificate(e.target.value)} placeholder="Add new certificate" />
                  <button onClick={() => handleArrayInputChange("certificates", newCertificate)}>Add</button>
                </div>
            )}
          </div>
        </div>
      </div>
  );
};

export default Profile;
