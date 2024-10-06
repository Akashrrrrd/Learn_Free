import React, { useState, useEffect } from "react";
import "./Courses.css";
import courses_img_1 from "../../assets/courses_img_1.png";
import courses_img_2 from "../../assets/courses_img_2.png";
import courses_img_3 from "../../assets/courses_img_3.png";
import courses_img_4 from "../../assets/courses_img_4.png";
import courses_img_5 from "../../assets/courses_img_5.png";
import courses_img_6 from "../../assets/courses_img_6.png";
import courses_img_7 from "../../assets/courses_img_7.png";
import courses_img_8 from "../../assets/courses_img_8.png";
import courses_img_9 from "../../assets/courses_img_9.png";
import courses_img_10 from "../../assets/courses_img_10.png";
import courses_img_11 from "../../assets/courses_img_11.png";
import courses_img_12 from "../../assets/courses_img_12.png";
import courses_img_13 from "../../assets/courses_img_13.png";
import courses_img_14 from "../../assets/courses_img_14.png";
import courses_img_15 from "../../assets/courses_img_15.png";
import courses_img_16 from "../../assets/courses_img_16.png";
import courses_img_17 from "../../assets/courses_img_17.png";
import courses_img_18 from "../../assets/courses_img_18.png";
import courses_img_19 from "../../assets/courses_img_19.png";
import courses_img_20 from "../../assets/courses_img_20.png";
import courses_img_21 from "../../assets/courses_img_21.png";
import courses_img_22 from "../../assets/courses_img_22.png";
import courses_img_23 from "../../assets/courses_img_23.png";
import courses_img_24 from "../../assets/courses_img_24.png";
import { useNavigate } from "react-router-dom";

const coursesData = [
  {
    id: 1,
    title: "Introduction to Blockchain",
    description:
      "Learn the fundamentals of blockchain technology and its applications.",
    category: "Technology",
    duration: "6 weeks",
    level: "Beginner",
    image: courses_img_1,
    videoLink: "https://www.youtube.com/embed/SSo_EIwHSd4?si=Ha0w-C6u0v87gcIA",
  },
  {
    id: 2,
    title: "Web Development Basics",
    description:
      "Get started with HTML, CSS, and JavaScript to build dynamic websites.",
    category: "Programming",
    duration: "8 weeks",
    level: "Beginner",
    image: courses_img_2,
    videoLink: "https://www.youtube.com/embed/Q33KBiDriJY?si=vhy_rX7F4N7DE6Ga",
  },
  {
    id: 3,
    title: "Data Science Essentials",
    description:
      "Explore the basics of data science, including data analysis and visualization.",
    category: "Data",
    duration: "10 weeks",
    level: "Intermediate",
    image: courses_img_3,
    videoLink: "https://www.youtube.com/embed/ua-CiDNNj30?si=Sw6JZxWKAAEpnwEm",
  },
  {
    id: 4,
    title: "Machine Learning 101",
    description:
      "An introductory course on machine learning concepts and algorithms.",
    category: "AI",
    duration: "12 weeks",
    level: "Intermediate",
    image: courses_img_4,
    videoLink: "https://www.youtube.com/embed/GwIo3gDZCVQ?si=rQVgdtTVCD97hohA",
  },
  {
    id: 5,
    title: "Cybersecurity Fundamentals",
    description:
      "Understand the basics of cybersecurity, including threats and protection methods.",
    category: "Security",
    duration: "8 weeks",
    level: "Beginner",
    image: courses_img_5,
    videoLink: "https://www.youtube.com/embed/lpa8uy4DyMo?si=rUS0Gs-Rjif7lXyY",
  },
  {
    id: 6,
    title: "Digital Marketing Strategies",
    description:
      "Learn how to effectively market products and services online.",
    category: "Marketing",
    duration: "6 weeks",
    level: "Beginner",
    image: courses_img_6,
    videoLink: "https://www.youtube.com/embed/rXtaM3x7kHA?si=ZI_j8b3nivpZv6qP",
  },
  {
    id: 7,
    title: "User Experience Design",
    description:
      "Discover the principles of UX design and how to create user-friendly interfaces.",
    category: "Design",
    duration: "10 weeks",
    level: "Intermediate",
    image: courses_img_7,
    videoLink: "https://www.youtube.com/embed/BU_afT-aIn0?si=ZWyWaW2vMR__Kuy-",
  },
  {
    id: 8,
    title: "Introduction to Cloud Computing",
    description:
      "Get familiar with cloud concepts, services, and deployment models.",
    category: "Cloud",
    duration: "8 weeks",
    level: "Beginner",
    image: courses_img_8,
    videoLink: "https://www.youtube.com/embed/EN4fEbcFZ_E?si=35fzWyPKb6bY-zqo",
  },
  {
    id: 9,
    title: "Full Stack Web Development",
    description:
      "Become proficient in both front-end and back-end web development technologies.",
    category: "Programming",
    duration: "12 weeks",
    level: "Advanced",
    image: courses_img_9,
    videoLink: "https://www.youtube.com/embed/YLpCPo0FDtE?si=ENKI06djMXP1CRnH",
  },
  {
    id: 10,
    title: "Introduction to Artificial Intelligence",
    description:
      "Learn the basics of AI, including its history, applications, and future trends.",
    category: "AI",
    duration: "10 weeks",
    level: "Intermediate",
    image: courses_img_10,
    videoLink: "https://www.youtube.com/embed/MqffbpjhriQ?si=Wo_29O_4a14ojJeZ",
  },
  {
    id: 11,
    title: "React.js for Beginners",
    description:
      "Master the fundamentals of React.js for building dynamic user interfaces.",
    category: "Programming",
    duration: "8 weeks",
    level: "Beginner",
    image: courses_img_11,
    videoLink: "https://www.youtube.com/embed/bMknfKXIFA8?si=teVlhqfA74-ObOh9",
  },
  {
    id: 12,
    title: "Introduction to SQL Databases",
    description: "Learn how to manage and query databases using SQL.",
    category: "Data",
    duration: "6 weeks",
    level: "Beginner",
    image: courses_img_12,
    videoLink: "https://www.youtube.com/embed/5OdVJbNCSso?si=ox6PY20Rl9z1VVzb",
  },
  {
    id: 13,
    title: "Data Structures & Algorithms",
    description:
      "Master data structures and algorithms to solve complex programming problems efficiently.",
    category: "Programming",
    duration: "10 weeks",
    level: "Intermediate",
    image: courses_img_21,
    videoLink: "https://www.youtube.com/embed/xWLxhF3b5P8?si=iwMXDMHX2EQv_PBH",
  },
  {
    id: 14,
    title: "Deep Learning with TensorFlow",
    description:
      "Learn deep learning fundamentals and how to implement neural networks using TensorFlow.",
    category: "AI",
    duration: "12 weeks",
    level: "Advanced",
    image: courses_img_22,
    videoLink: "https://www.youtube.com/embed/DooxDIRAkPA?si=obwAND3duTYLM5lR",
  },
  {
    id: 15,
    title: "Advanced Python Programming",
    description:
      "Enhance your Python skills with advanced concepts, including multithreading, OOP, and more.",
    category: "Programming",
    duration: "8 weeks",
    level: "Advanced",
    image: courses_img_23,
    videoLink: "https://www.youtube.com/embed/UrsmFxEIp5k?si=P7NmvEd8HYAKKiUu",
  },
  {
    id: 16,
    title: "Natural Language Processing (NLP)",
    description:
      "Explore NLP techniques for processing and understanding human language using Python.",
    category: "AI",
    duration: "10 weeks",
    level: "Intermediate",
    image: courses_img_24,
    videoLink: "https://www.youtube.com/embed/68lIfswwG2A?si=XGzUZLXpDCfYihX4",
  },
  {
    id: 17,
    title: "Embedded Systems Programming",
    description:
      "Learn to program microcontrollers and design embedded systems using C/C++.",
    category: "Electronics",
    duration: "10 weeks",
    level: "Intermediate",
    image: courses_img_13,
    videoLink: "https://www.youtube.com/embed/t-832_RIJ-Y?si=IiPdlg3U1Jhrjfmf",
  },
  {
    id: 18,
    title: "Introduction to VLSI Design",
    description:
      "Understand the fundamentals of VLSI design and how integrated circuits are developed.",
    category: "Electronics",
    duration: "12 weeks",
    level: "Advanced",
    image: courses_img_14,
    videoLink: "https://www.youtube.com/embed/t-832_RIJ-Y?si=IiPdlg3U1Jhrjfmf",
  },
  {
    id: 19,
    title: "Real-Time Operating Systems (RTOS)",
    description:
      "Learn how to design and implement real-time operating systems for embedded systems.",
    category: "Electronics",
    duration: "8 weeks",
    level: "Advanced",
    image: courses_img_15,
    videoLink: "https://www.youtube.com/embed/t-832_RIJ-Y?si=IiPdlg3U1Jhrjfmf",
  },
  {
    id: 20,
    title: "Signal Processing Basics",
    description:
      "Explore digital signal processing techniques for communication systems.",
    category: "Electronics",
    duration: "10 weeks",
    level: "Intermediate",
    image: courses_img_16,
    videoLink: "https://www.youtube.com/embed/t-832_RIJ-Y?si=IiPdlg3U1Jhrjfmf",
  },
  {
    id: 21,
    title: "Power Electronics Fundamentals",
    description:
      "Learn about the principles and applications of power electronics in modern devices.",
    category: "Electrical",
    duration: "8 weeks",
    level: "Intermediate",
    image: courses_img_17,
    videoLink: "https://www.youtube.com/embed/t-832_RIJ-Y?si=IiPdlg3U1Jhrjfmf",
  },
  {
    id: 22,
    title: "Control Systems Engineering",
    description:
      "Understand the basics of control systems and how they are applied in automation.",
    category: "Electrical",
    duration: "10 weeks",
    level: "Intermediate",
    image: courses_img_18,
    videoLink: "https://www.youtube.com/embed/t-832_RIJ-Y?si=IiPdlg3U1Jhrjfmf",
  },
  {
    id: 23,
    title: "System Design with FPGA",
    description:
      "Learn how to design and implement hardware systems using FPGA technology.",
    category: "Electronics",
    duration: "12 weeks",
    level: "Advanced",
    image: courses_img_19,
    videoLink: "https://www.youtube.com/embed/t-832_RIJ-Y?si=IiPdlg3U1Jhrjfmf",
  },
  {
    id: 24,
    title: "Electric Vehicle Technology",
    description:
      "Understand the working principles behind electric vehicles and their components.",
    category: "Electrical",
    duration: "8 weeks",
    level: "Intermediate",
    image: courses_img_20,
    videoLink: "https://www.youtube.com/embed/t-832_RIJ-Y?si=IiPdlg3U1Jhrjfmf",
  },
];

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");
  const [filteredCourses, setFilteredCourses] = useState(coursesData);
  const navigate = useNavigate();

  useEffect(() => {
    const filtered = coursesData.filter((course) => {
      return (
        (filter === "All" || course.category === filter) &&
        course.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    setFilteredCourses(filtered);
  }, [searchTerm, filter]);

  const categories = [
    "All",
    ...new Set(coursesData.map((course) => course.category)),
  ];

  const handleEnroll = (course) => {
    navigate("/enroll", { state: { course } });
  };

  return (
    <div className="courses">
      <div className="courses-header">
        <h1>Ignite Your Curiosity</h1>
        <p>
          Dive into our rich selection of courses and kick-start your path to
          success today.
        </p>
      </div>
      <div className="courses-controls">
        <input
          type="text"
          placeholder="Search courses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <div className="category-filters">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`category-button ${
                filter === category ? "active" : ""
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      <div className="courses-list">
        {filteredCourses.map((course) => (
          <div key={course.id} className="course-card">
            <img
              src={course.image}
              alt={course.title}
              className="course-image"
            />
            <div className="course-content">
              <h2>{course.title}</h2>
              <p className="course-description">{course.description}</p>
              <div className="course-details">
                <span className="course-category">{course.category}</span>
                <span className="course-duration">{course.duration}</span>
                <span className="course-level">{course.level}</span>
              </div>
              <button
                className="enroll-button"
                onClick={() => handleEnroll(course)}
              >
                Enroll Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
