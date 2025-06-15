import React from "react";
import homeImg from './home_img.jpg';
import home1Img from './home1_img.jpg';
import home2Img from './home2_img.jpeg';
import home3Img from './home3_img.jpg';
import './content.css';

const teacherAvatars = [
  homeImg,
  home1Img,
  home2Img,
  home3Img,
  
];

function Content() {
  return (
    <div className="content-wrapper">
      <div className="top-row">
        <div>
          <h1 className="heading">
            Find the right <span className="orange">course</span> for you
          </h1>
          <p className="subheading">
            See your personalised recommendations<br />
            based on your interests and goals
          </p>
        </div>
        <div className="teacher-section">
          <div className="certified-text">Certified teachers only</div>
          <div className="avatar-group">
            {teacherAvatars.map((src, i) => (
              <img
                key={i}
                src={src}
                alt="Teacher"
                className="avatar"
                style={{ left: `${i * 28}px`, zIndex: teacherAvatars.length - i, position: 'absolute' }}
              />
            ))}
            <div className="avatar-count">135+</div>
          </div>
        </div>
      </div>
      <div className="illustration-row">
        <div className="stats-row">
          <div className="stat-box-purple">
            <div className="stat-label">Education</div>
            <div className="stat-value">+40</div>
            <div className="stat-desc">subjects</div>
          </div>
          <div className="stat-box-yellow">
            <div className="stat-label">Online</div>
            <div className="stat-value">+120</div>
            <div className="stat-desc">courses</div>
          </div>
          <div className="stat-box-yellow-alt">
            <div className="stars">★★★★★<span className="rating">5.0</span></div>
            <div className="stat-value">+180k</div>
            <div className="stat-desc">learner reviews</div>
          </div>
        </div>
        <div className="illustration">
          <svg width="280" height="140" viewBox="0 0 280 140">
            <rect x="60" y="100" width="180" height="28" rx="12" fill="#b89cff" />
            <polygon points="60,100 48,120 60,128" fill="#222" />
            <circle cx="170" cy="80" r="18" fill="#fff" stroke="#222" strokeWidth="3" />
            <path d="M170 98 Q180 115 200 110" stroke="#222" strokeWidth="3" fill="none" />
            <path d="M170 98 Q160 115 140 110" stroke="#222" strokeWidth="3" fill="none" />
            <path d="M170 80 Q180 90 170 98" stroke="#222" strokeWidth="3" fill="none" />
            <path d="M170 80 Q160 90 170 98" stroke="#222" strokeWidth="3" fill="none" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default Content;
