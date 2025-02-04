import React, { useState } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import "./Resume.css";

const Resume = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    github: "",
    education: [
      {
        institute: "",
        degree: "",
        duration: "",
        gpa: "",
      },
    ],
    experience: [
      {
        company: "",
        position: "",
        duration: "",
        descriptions: [""],
      },
    ],
    projects: [
      {
        name: "",
        description: "",
      },
    ],
    skills: {
      programming: "",
      databases: "",
      frameworks: "",
      tools: "",
      concepts: "",
    },
  });

  const handleInputChange = (e, section, index, field) => {
    const { value } = e.target;

    if (section === "base") {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    } else if (Array.isArray(formData[section])) {
      const newArray = [...formData[section]];
      if (field === "descriptions") {
        newArray[index].descriptions[0] = value;
      } else {
        newArray[index][field] = value;
      }
      setFormData((prev) => ({
        ...prev,
        [section]: newArray,
      }));
    } else if (section === "skills") {
      setFormData((prev) => ({
        ...prev,
        skills: {
          ...prev.skills,
          [field]: value,
        },
      }));
    }
  };

  const addItem = (section) => {
    const newItem =
      section === "education"
        ? { institute: "", degree: "", duration: "", gpa: "" }
        : section === "experience"
        ? { company: "", position: "", duration: "", descriptions: [""] }
        : { name: "", description: "" };

    setFormData((prev) => ({
      ...prev,
      [section]: [...prev[section], newItem],
    }));
  };

  const generateAIDescription = async (section, index) => {
    const aiDescription = "Generated description would appear here";

    if (section === "experience") {
      const newExperience = [...formData.experience];
      newExperience[index].descriptions[0] = aiDescription;
      setFormData((prev) => ({
        ...prev,
        experience: newExperience,
      }));
    } else if (section === "projects") {
      const newProjects = [...formData.projects];
      newProjects[index].description = aiDescription;
      setFormData((prev) => ({
        ...prev,
        projects: newProjects,
      }));
    }
  };

  const downloadPDF = async () => {
    const element = document.getElementById("resume-preview");
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight,
    });

    const imgData = canvas.toDataURL("image/jpeg", 1.0);
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: [canvas.width, canvas.height],
    });

    pdf.addImage(
      imgData,
      "JPEG",
      0,
      0,
      canvas.width,
      canvas.height,
      "",
      "FAST"
    );
    pdf.save("resume.pdf");
  };

  return (
    <div className="res-container">
      <div className="res-form-section">
        <h2 className="res-form-title">Resume Builder</h2>

        <div className="res-form-group">
          <input
            type="text"
            placeholder="Full Name"
            value={formData.name}
            onChange={(e) => handleInputChange(e, "base", null, "name")}
            className="res-input"
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => handleInputChange(e, "base", null, "email")}
            className="res-input"
          />
          <input
            type="text"
            placeholder="Phone"
            value={formData.phone}
            onChange={(e) => handleInputChange(e, "base", null, "phone")}
            className="res-input"
          />
          <input
            type="text"
            placeholder="Location"
            value={formData.location}
            onChange={(e) => handleInputChange(e, "base", null, "location")}
            className="res-input"
          />
          <input
            type="text"
            placeholder="LinkedIn URL"
            value={formData.linkedin}
            onChange={(e) => handleInputChange(e, "base", null, "linkedin")}
            className="res-input"
          />
          <input
            type="text"
            placeholder="GitHub URL"
            value={formData.github}
            onChange={(e) => handleInputChange(e, "base", null, "github")}
            className="res-input"
          />
        </div>
        <h3 className="res-section-title">Education</h3>
        {formData.education.map((edu, index) => (
          <div key={index} className="res-form-group">
            <input
              type="text"
              placeholder="Institute"
              value={edu.institute}
              onChange={(e) =>
                handleInputChange(e, "education", index, "institute")
              }
              className="res-input"
            />
            <input
              type="text"
              placeholder="Degree"
              value={edu.degree}
              onChange={(e) =>
                handleInputChange(e, "education", index, "degree")
              }
              className="res-input"
            />
            <input
              type="text"
              placeholder="Duration"
              value={edu.duration}
              onChange={(e) =>
                handleInputChange(e, "education", index, "duration")
              }
              className="res-input"
            />
            <input
              type="text"
              placeholder="GPA"
              value={edu.gpa}
              onChange={(e) => handleInputChange(e, "education", index, "gpa")}
              className="res-input"
            />
          </div>
        ))}
        <button onClick={() => addItem("education")} className="res-btn">
          Add Education
        </button>

        <h3 className="res-section-title">Experience</h3>
        {formData.experience.map((exp, index) => (
          <div key={index} className="res-form-group">
            <input
              type="text"
              placeholder="Company"
              value={exp.company}
              onChange={(e) =>
                handleInputChange(e, "experience", index, "company")
              }
              className="res-input"
            />
            <input
              type="text"
              placeholder="Position"
              value={exp.position}
              onChange={(e) =>
                handleInputChange(e, "experience", index, "position")
              }
              className="res-input"
            />
            <input
              type="text"
              placeholder="Duration"
              value={exp.duration}
              onChange={(e) =>
                handleInputChange(e, "experience", index, "duration")
              }
              className="res-input"
            />
            <textarea
              placeholder="Description"
              value={exp.descriptions[0]}
              onChange={(e) =>
                handleInputChange(e, "experience", index, "descriptions")
              }
              className="res-textarea"
            />
            <button
              onClick={() => generateAIDescription("experience", index)}
              className="res-btn res-ai-btn"
            >
              Generate AI Description
            </button>
          </div>
        ))}
        <button onClick={() => addItem("experience")} className="res-btn">
          Add Experience
        </button>

        <h3 className="res-section-title">Projects</h3>
        {formData.projects.map((project, index) => (
          <div key={index} className="res-form-group">
            <input
              type="text"
              placeholder="Project Name"
              value={project.name}
              onChange={(e) => handleInputChange(e, "projects", index, "name")}
              className="res-input"
            />
            <textarea
              placeholder="Project Description"
              value={project.description}
              onChange={(e) =>
                handleInputChange(e, "projects", index, "description")
              }
              className="res-textarea"
            />
            <button
              onClick={() => generateAIDescription("projects", index)}
              className="res-btn res-ai-btn"
            >
              Generate AI Description
            </button>
          </div>
        ))}
        <button onClick={() => addItem("projects")} className="res-btn">
          Add Project
        </button>

        <h3 className="res-section-title">Skills</h3>
        <div className="res-form-group">
          <input
            type="text"
            placeholder="Programming Languages"
            value={formData.skills.programming}
            onChange={(e) =>
              handleInputChange(e, "skills", null, "programming")
            }
            className="res-input"
          />
          <input
            type="text"
            placeholder="Databases"
            value={formData.skills.databases}
            onChange={(e) => handleInputChange(e, "skills", null, "databases")}
            className="res-input"
          />
          <input
            type="text"
            placeholder="Frameworks/Libraries"
            value={formData.skills.frameworks}
            onChange={(e) => handleInputChange(e, "skills", null, "frameworks")}
            className="res-input"
          />
          <input
            type="text"
            placeholder="Tools/Platforms"
            value={formData.skills.tools}
            onChange={(e) => handleInputChange(e, "skills", null, "tools")}
            className="res-input"
          />
          <input
            type="text"
            placeholder="Concepts"
            value={formData.skills.concepts}
            onChange={(e) => handleInputChange(e, "skills", null, "concepts")}
            className="res-input"
          />
        </div>

        <button onClick={downloadPDF} className="res-btn res-download-btn">
          Download PDF
        </button>
      </div>

      <div id="resume-preview" className="res-preview">
        <div className="res-preview-header">
          <h1>{formData.name}</h1>
          <div className="res-contact-info">
            <span>{formData.location}</span>
            <span>{formData.email}</span>
            <span>{formData.phone}</span>
          </div>
          <div className="res-social-links">
            {formData.linkedin && <span>LinkedIn: {formData.linkedin}</span>} |
            {formData.github && <span> GitHub: {formData.github}</span>}
          </div>
        </div>

        <div className="res-preview-section">
          <h2>Education</h2>
          {formData.education.map((edu, index) => (
            <div key={index} className="res-edu-item">
              <div className="res-edu-header">
                <span className="res-institute">{edu.institute}</span>
                <span className="res-duration">{edu.duration}</span>
              </div>
              <div>{edu.degree}</div>
              {edu.gpa && <div>GPA: {edu.gpa}</div>}
            </div>
          ))}
        </div>

        <div className="res-preview-section">
          <h2>Experience</h2>
          {formData.experience.map((exp, index) => (
            <div key={index} className="res-exp-item">
              <div className="res-exp-header">
                <span className="res-company">{exp.company}</span>
                <span className="res-duration">{exp.duration}</span>
              </div>
              <div className="res-position">{exp.position}</div>
              <ul className="res-description-list">
                {exp.descriptions.map((desc, i) => (
                  <li key={i}>{desc}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="res-preview-section">
          <h2>Projects</h2>
          {formData.projects.map((project, index) => (
            <div key={index} className="res-project-item">
              <div className="res-project-name">{project.name}</div>
              <div className="res-project-description">
                {project.description}
              </div>
            </div>
          ))}
        </div>

        <div className="res-preview-section">
          <h2>Technologies</h2>
          {Object.entries(formData.skills).map(
            ([key, value]) =>
              value && (
                <div key={key} className="res-skill-item">
                  <span className="res-skill-category">
                    {key.charAt(0).toUpperCase() + key.slice(1)}:
                  </span>
                  <span className="res-skill-list">{value}</span>
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default Resume;
