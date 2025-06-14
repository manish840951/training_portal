import React from 'react';
import './aboutus.css';

function About() {
  return (
    <div className="about-container">
      <h1>About Our Training Portal</h1>
      <p>
        Welcome to our <strong>Training Portal</strong>—your one-stop destination for comprehensive learning and skill development.
        Our platform offers a wide range of courses designed to help you advance your career and achieve your personal goals.
      </p>
      <h2>Our Mission</h2>
      <p>
        We aim to provide accessible, high-quality education to learners worldwide, empowering them with the knowledge and tools
        needed to succeed in today's competitive job market.
      </p>
      <h2>Features</h2>
      <ul>
        <li>Interactive video lessons and tutorials</li>
        <li>Progress tracking and personalized learning paths</li>
        <li>Expert instructors and community support</li>
        <li>Flexible learning schedule to fit your lifestyle</li>
      </ul>
      <h2>Contact Us</h2>
      <p>
        Have questions or need assistance? Reach out to our support team anytime at <a href="mailto:support@trainingportal.com">support@trainingportal.com</a>.
      </p>
    </div>
  );
}

export default About;
