import React, { useState } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import "./Resume.css";

const Resume = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
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
    internships: [
      {
        company: "",
        position: "",
        duration: "",
        description: "",
      },
    ],
    projects: [
      {
        name: "",
        descriptions: ["", ""],
      },
    ],
    skills: {
      programming: "",
      databases: "",
      frameworks: "",
      tools: "",
    },
    achievements: ["", ""],
    certifications: ["", ""],
    volunteering: ["", ""],
  });

  const handleInputChange = (e, section, index, field, subIndex) => {
    const { value } = e.target;
    setFormData((prev) => {
      if (section === "base") {
        return { ...prev, [field]: value };
      }

      if (Array.isArray(prev[section])) {
        const newArray = [...prev[section]];
        if (field === "descriptions") {
          newArray[index].descriptions[subIndex] = value;
        } else if (typeof newArray[index] === "string") {
          newArray[index] = value;
        } else {
          newArray[index][field] = value;
        }
        return { ...prev, [section]: newArray };
      }

      if (section === "skills") {
        return {
          ...prev,
          skills: { ...prev.skills, [field]: value },
        };
      }

      return prev;
    });
  };

  const addItem = (section) => {
    const newItems = {
      education: { institute: "", degree: "", duration: "", gpa: "" },
      internships: { company: "", position: "", duration: "", description: "" },
      projects: { name: "", descriptions: ["", ""] },
      achievements: "",
      certifications: "",
      volunteering: "",
    };

    setFormData((prev) => ({
      ...prev,
      [section]: [...prev[section], newItems[section]],
    }));
  };

  const downloadPDF = async () => {
    const element = document.getElementById("resume-preview");
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
    });

    const imgData = canvas.toDataURL("image/jpeg", 1.0);
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: "a4",
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);

    const imgX = (pdfWidth - imgWidth * ratio) / 2;
    const imgY = 0;

    pdf.addImage(
      imgData,
      "JPEG",
      imgX,
      imgY,
      imgWidth * ratio,
      imgHeight * ratio
    );
    pdf.save("resume.pdf");
  };

  return (
    <div className="lfr-res-container">
      <div className="lfr-res-form-section">
        <h2 className="lfr-res-form-title">ATS-Friendly Resume Builder</h2>

        {/* Personal Information */}
        <div className="lfr-res-form-group">
          <h3 className="lfr-res-section-title">Personal Information</h3>
          <input
            type="text"
            placeholder="Full Name"
            value={formData.name}
            onChange={(e) => handleInputChange(e, "base", null, "name")}
            className="lfr-res-input"
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => handleInputChange(e, "base", null, "email")}
            className="lfr-res-input"
          />
          <input
            type="text"
            placeholder="Phone"
            value={formData.phone}
            onChange={(e) => handleInputChange(e, "base", null, "phone")}
            className="lfr-res-input"
          />
          <input
            type="text"
            placeholder="LinkedIn URL"
            value={formData.linkedin}
            onChange={(e) => handleInputChange(e, "base", null, "linkedin")}
            className="lfr-res-input"
          />
          <input
            type="text"
            placeholder="GitHub Profile"
            value={formData.github}
            onChange={(e) => handleInputChange(e, "base", null, "github")}
            className="lfr-res-input"
          />
        </div>

        {/* Education */}
        <div className="lfr-res-form-group">
          <h3 className="lfr-res-section-title">Education</h3>
          {formData.education.map((edu, index) => (
            <div key={index} className="lfr-res-form-subgroup">
              <input
                type="text"
                placeholder="Institute Name"
                value={edu.institute}
                onChange={(e) =>
                  handleInputChange(e, "education", index, "institute")
                }
                className="lfr-res-input"
              />
              <input
                type="text"
                placeholder="Degree"
                value={edu.degree}
                onChange={(e) =>
                  handleInputChange(e, "education", index, "degree")
                }
                className="lfr-res-input"
              />
              <input
                type="text"
                placeholder="Duration (e.g., Nov 2022 - Mar 2026)"
                value={edu.duration}
                onChange={(e) =>
                  handleInputChange(e, "education", index, "duration")
                }
                className="lfr-res-input"
              />
              <input
                type="text"
                placeholder="GPA"
                value={edu.gpa}
                onChange={(e) =>
                  handleInputChange(e, "education", index, "gpa")
                }
                className="lfr-res-input"
              />
            </div>
          ))}
          <button onClick={() => addItem("education")} className="lfr-res-btn">
            Add Education
          </button>
        </div>

        {/* Internships */}
        <div className="lfr-res-form-group">
          <h3 className="lfr-res-section-title">Internship Experience</h3>
          {formData.internships.map((intern, index) => (
            <div key={index} className="lfr-res-form-subgroup">
              <input
                type="text"
                placeholder="Company Name"
                value={intern.company}
                onChange={(e) =>
                  handleInputChange(e, "internships", index, "company")
                }
                className="lfr-res-input"
              />
              <input
                type="text"
                placeholder="Position"
                value={intern.position}
                onChange={(e) =>
                  handleInputChange(e, "internships", index, "position")
                }
                className="lfr-res-input"
              />
              <input
                type="text"
                placeholder="Duration (e.g., Jun 2024 - Aug 2024)"
                value={intern.duration}
                onChange={(e) =>
                  handleInputChange(e, "internships", index, "duration")
                }
                className="lfr-res-input"
              />
              <textarea
                placeholder="Description of responsibilities and achievements"
                value={intern.description}
                onChange={(e) =>
                  handleInputChange(e, "internships", index, "description")
                }
                className="lfr-res-textarea"
              />
            </div>
          ))}
          <button
            onClick={() => addItem("internships")}
            className="lfr-res-btn"
          >
            Add Internship
          </button>
        </div>

        {/* Projects */}
        <div className="lfr-res-form-group">
          <h3 className="lfr-res-section-title">Projects</h3>
          {formData.projects.map((project, index) => (
            <div key={index} className="lfr-res-form-subgroup">
              <input
                type="text"
                placeholder="Project Name"
                value={project.name}
                onChange={(e) =>
                  handleInputChange(e, "projects", index, "name")
                }
                className="lfr-res-input"
              />
              <textarea
                placeholder="Key Achievement/Feature 1"
                value={project.descriptions[0]}
                onChange={(e) =>
                  handleInputChange(e, "projects", index, "descriptions", 0)
                }
                className="lfr-res-textarea"
              />
              <textarea
                placeholder="Key Achievement/Feature 2"
                value={project.descriptions[1]}
                onChange={(e) =>
                  handleInputChange(e, "projects", index, "descriptions", 1)
                }
                className="lfr-res-textarea"
              />
            </div>
          ))}
          <button onClick={() => addItem("projects")} className="lfr-res-btn">
            Add Project
          </button>
        </div>

        {/* Skills */}
        <div className="lfr-res-form-group">
          <h3 className="lfr-res-section-title">Skills</h3>
          <input
            type="text"
            placeholder="Programming Languages (e.g., Java, Python, C, SQL)"
            value={formData.skills.programming}
            onChange={(e) =>
              handleInputChange(e, "skills", null, "programming")
            }
            className="lfr-res-input"
          />
          <input
            type="text"
            placeholder="Databases (e.g., MongoDB, MySQL)"
            value={formData.skills.databases}
            onChange={(e) => handleInputChange(e, "skills", null, "databases")}
            className="lfr-res-input"
          />
          <input
            type="text"
            placeholder="Frameworks & Libraries (e.g., React.js, Tailwind CSS)"
            value={formData.skills.frameworks}
            onChange={(e) => handleInputChange(e, "skills", null, "frameworks")}
            className="lfr-res-input"
          />
          <input
            type="text"
            placeholder="Tools & Platforms (e.g., Git, GitHub, Vercel, VS Code, AWS)"
            value={formData.skills.tools}
            onChange={(e) => handleInputChange(e, "skills", null, "tools")}
            className="lfr-res-input"
          />
        </div>

        {/* Achievements */}
        <div className="lfr-res-form-group">
          <h3 className="lfr-res-section-title">Achievements</h3>
          {formData.achievements.map((achievement, index) => (
            <textarea
              key={index}
              placeholder="Enter achievement"
              value={achievement}
              onChange={(e) => handleInputChange(e, "achievements", index)}
              className="lfr-res-textarea"
            />
          ))}
          <button
            onClick={() => addItem("achievements")}
            className="lfr-res-btn"
          >
            Add Achievement
          </button>
        </div>

        {/* Certifications */}
        <div className="lfr-res-form-group">
          <h3 className="lfr-res-section-title">Certifications</h3>
          {formData.certifications.map((cert, index) => (
            <textarea
              key={index}
              placeholder="Enter certification details"
              value={cert}
              onChange={(e) => handleInputChange(e, "certifications", index)}
              className="lfr-res-textarea"
            />
          ))}
          <button
            onClick={() => addItem("certifications")}
            className="lfr-res-btn"
          >
            Add Certification
          </button>
        </div>

        {/* Volunteering */}
        <div className="lfr-res-form-group">
          <h3 className="lfr-res-section-title">Volunteering Experience</h3>
          {formData.volunteering.map((vol, index) => (
            <textarea
              key={index}
              placeholder="Enter volunteering experience"
              value={vol}
              onChange={(e) => handleInputChange(e, "volunteering", index)}
              className="lfr-res-textarea"
            />
          ))}
          <button
            onClick={() => addItem("volunteering")}
            className="lfr-res-btn"
          >
            Add Volunteering
          </button>
        </div>

        <button
          onClick={downloadPDF}
          className="lfr-res-btn lfr-res-download-btn"
        >
          Download PDF
        </button>
      </div>

      {/* Preview Section */}
      <div id="resume-preview" className="lfr-res-preview">
        <div className="lfr-res-preview-header">
          <h1 className="lfr-res-preview-name">
            {formData.name || "Your Name"}
          </h1>
          <div className="lfr-res-contact-info">
            <span>{formData.email}</span>
            {formData.email && formData.phone && <span>|</span>}
            <span>{formData.phone}</span>
          </div>
          <div className="lfr-res-social-links">
            {formData.linkedin && (
              <span>
                <a
                  href={formData.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </span>
            )}
            {formData.linkedin && formData.github && <span>|</span>}
            {formData.github && (
              <span>
                <a
                  href={formData.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </span>
            )}
          </div>
        </div>

        {/* Education Section */}
        {formData.education.some((edu) => edu.institute || edu.degree) && (
          <div className="lfr-res-preview-section">
            <h2 className="lfr-res-section-heading">Education</h2>
            {formData.education.map(
              (edu, index) =>
                edu.institute && (
                  <div key={index} className="lfr-res-edu-item">
                    <div className="lfr-res-edu-header">
                      <span>{edu.institute}</span>
                      <span>{edu.duration}</span>
                    </div>
                    <div>{edu.degree}</div>
                    {edu.gpa && <div>GPA: {edu.gpa}</div>}
                  </div>
                )
            )}
          </div>
        )}

        {/* Internship Experience Section */}
        {formData.internships.some(
          (intern) => intern.company || intern.position
        ) && (
          <div className="lfr-res-preview-section">
            <h2 className="lfr-res-section-heading">Internship Experience</h2>
            {formData.internships.map(
              (intern, index) =>
                intern.company && (
                  <div key={index} className="lfr-res-exp-item">
                    <div className="lfr-res-exp-header">
                      <span>{intern.company}</span>
                      <span>{intern.duration}</span>
                    </div>
                    <div className="lfr-res-position">{intern.position}</div>
                    <div className="lfr-res-description">
                      {intern.description}
                    </div>
                  </div>
                )
            )}
          </div>
        )}

        {/* Projects Section */}
        {formData.projects.some(
          (project) => project.name || project.descriptions[0]
        ) && (
          <div className="lfr-res-project-section">
            <h2 className="lfr-res-section-heading">Projects</h2>
            {formData.projects.map(
              (project, index) =>
                project.name && (
                  <div key={index} className="lfr-res-project-item">
                    <div className="lfr-res-project-name">{project.name}</div>
                    <div className="lfr-res-project-description">
                      <ul className="lfr-res-achievements-list">
                        {project.descriptions.map(
                          (desc, i) => desc && <li key={i}>{desc}</li>
                        )}
                      </ul>
                    </div>
                  </div>
                )
            )}
          </div>
        )}

        {/* Skills Section */}
        {Object.values(formData.skills).some((skill) => skill) && (
          <div className="lfr-res-preview-section">
            <h2 className="lfr-res-section-heading">Skills</h2>
            <div className="lfr-res-skills-content">
              {formData.skills.programming && (
                <div className="lfr-res-skill-item">
                  <span className="lfr-res-skill-category">
                    Programming Languages:
                  </span>
                  <span>{formData.skills.programming}</span>
                </div>
              )}
              {formData.skills.databases && (
                <div className="lfr-res-skill-item">
                  <span className="lfr-res-skill-category">Databases:</span>
                  <span>{formData.skills.databases}</span>
                </div>
              )}
              {formData.skills.frameworks && (
                <div className="lfr-res-skill-item">
                  <span className="lfr-res-skill-category">
                    Frameworks & Libraries:
                  </span>
                  <span>{formData.skills.frameworks}</span>
                </div>
              )}
              {formData.skills.tools && (
                <div className="lfr-res-skill-item">
                  <span className="lfr-res-skill-category">
                    Tools & Platforms:
                  </span>
                  <span>{formData.skills.tools}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Achievements Section (continued) */}
        {formData.achievements.some((achievement) => achievement) && (
          <div className="lfr-res-preview-section">
            <h2 className="lfr-res-section-heading">Achievements</h2>
            <ul className="lfr-res-achievements-list">
              {formData.achievements.map(
                (achievement, index) =>
                  achievement && <li key={index}>{achievement}</li>
              )}
            </ul>
          </div>
        )}

        {/* Certifications Section */}
        {formData.certifications.some((cert) => cert) && (
          <div className="lfr-res-preview-section">
            <h2 className="lfr-res-section-heading">Certifications</h2>
            <ul className="lfr-res-certifications-list">
              {formData.certifications.map(
                (cert, index) => cert && <li key={index}>{cert}</li>
              )}
            </ul>
          </div>
        )}

        {/* Volunteering Experience Section */}
        {formData.volunteering.some((vol) => vol) && (
          <div className="lfr-res-preview-section">
            <h2 className="lfr-res-section-heading">Volunteering Experience</h2>
            <div className="lfr-res-volunteering-list">
              {formData.volunteering.map(
                (vol, index) => vol && <li key={index}>{vol}</li>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Resume;
