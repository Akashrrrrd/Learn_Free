import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column">
          <h2 className="footer-logo">LearnFree</h2>
          <p className="footer-description">
            Empowering your learning journey with flexible and industry-relevant courses.
          </p>
          <div className="social-links">
            <a href="https://facebook.com/learnfree" target="_blank" rel="noreferrer" aria-label="Facebook">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com/learnfree" target="_blank" rel="noreferrer" aria-label="Twitter">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://linkedin.com/company/learnfree" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="https://instagram.com/learnfree" target="_blank" rel="noreferrer" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>

        <div className="footer-column">
          <h3>Courses</h3>
          <ul className="footer-links">
            <li><a href="/courses/web-development">Web Development</a></li>
            <li><a href="/courses/data-science">Data Science</a></li>
            <li><a href="/courses/ai-ml">AI & Machine Learning</a></li>
            <li><a href="/courses/design">UX/UI Design</a></li>
            <li><a href="/courses/cybersecurity">Cybersecurity</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Company</h3>
          <ul className="footer-links">
            <li><a href="/about">About Us</a></li>
            <li><a href="/careers">Careers</a></li>
            <li><a href="/blog">Blog</a></li>
            <li><a href="/partnerships">Partnerships</a></li>
            <li><a href="/press">Press</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Support</h3>
          <ul className="footer-links">
            <li><a href="/help">Help Center</a></li>
            <li><a href="/contact">Contact Us</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
            <li><a href="/terms">Terms of Service</a></li>
            <li><a href="/accessibility">Accessibility</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Contact</h3>
          <p><i className="fas fa-envelope"></i> support@learnfree.com</p>
          <p><i className="fas fa-phone"></i> +1 (800) 123-4567</p>
          <p><i className="fas fa-map-marker-alt"></i> 123 Learning St, Education City, 12345</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} LearnFree. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;