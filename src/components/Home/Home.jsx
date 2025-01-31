// Home.jsx
import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";

const IconPlaceholder = ({ children }) => (
  <div className="icon-placeholder">{children}</div>
);

const FeatureCard = ({ icon, title, description }) => (
  <div className="feature-card">
    {icon}
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);

const Home = () => {
  return (
    <div className="home">
      <header className="hero">
        <div className="hero-content">
          <h1 className="animate-fade-in-down">
            Track, Improve, and Succeed with LearnFree
          </h1>
          <p className="animate-fade-in-up">
            Monitor academic progress, analyze performance trends, and identify
            at-risk students in real-time. LearnFree empowers educators and
            students with data-driven insights to enhance learning outcomes and
            ensure academic success.
          </p>

          <Link to="/courses" className="cta-button">
            Select Department
            <span className="arrow-icon">→</span>
          </Link>
        </div>
      </header>
    </div>
  );
};

export default Home;
