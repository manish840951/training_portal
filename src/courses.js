
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './courses.css';
import { useAuth0 } from '@auth0/auth0-react';

function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [watchedVideos, setWatchedVideos] = useState([]);

  const { isAuthenticated, getAccessTokenSilently, loginWithRedirect, isLoading } = useAuth0();

  // Fetch courses (send token if authenticated)
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        let config = {};
        if (isAuthenticated) {
          const token = await getAccessTokenSilently();
          config.headers = { Authorization: `Bearer ${token}` };
        }
        const res = await axios.get('https://localhost:8000/api/courses', config);
        setCourses(res.data);
      } catch (err) {
        if (err.response?.status === 401) {
          setError('You must be logged in to view courses.');
        } else {
          setError('Failed to load courses.');
        }
      } finally {
        setLoading(false);
      }
    };
    if (!isLoading) fetchCourses();
  }, [isAuthenticated, getAccessTokenSilently, isLoading]);

  // Fetch watched videos for the logged-in user
  useEffect(() => {
    const fetchWatched = async () => {
      if (isAuthenticated) {
        try {
          const token = await getAccessTokenSilently();
          const res = await axios.get('https://localhost:8000/api/progress/watched', {
            headers: { Authorization: `Bearer ${token}` }
          });
          setWatchedVideos(res.data.watchedVideos.map(v => v._id));
        } catch (err) {
          if (err.response?.status === 401) {
            loginWithRedirect();
          }
        }
      }
    };
    fetchWatched();
  }, [isAuthenticated, getAccessTokenSilently, loginWithRedirect]);

  // Mark video as watched
  const handleVideoEnd = async (videoId) => {
    if (!isAuthenticated) return;
    try {
      const token = await getAccessTokenSilently();
      await axios.post(
        'https://localhost:8000/api/progress/watch',
        { videoId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setWatchedVideos(prev => [...prev, videoId]);
    } catch (err) {
      // Optionally handle error
    }
  };

  if (isLoading) return <div className="courses-container"><div>Loading authentication...</div></div>;
  if (loading) return <div className="courses-container"><div>Loading courses...</div></div>;
  if (error) {
    return (
      <div className="courses-container">
        <div>{error}</div>
        {!isAuthenticated && (
          <button className="login-button" onClick={() => loginWithRedirect()}>
            Log In
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="courses-container">
      <h1 className="courses-title">Courses</h1>
      {courses.length === 0 ? (
        <p>No courses available.</p>
      ) : (
        courses.map(course => (
          <div key={course._id} className="course-card">
            <h2 className="course-title">{course.title}</h2>
            <p className="course-description">{course.description}</p>
            {course.videos && course.videos.length > 0 ? (
              <div className="video-list">
                {course.videos.map((video, idx) => (
                  <div key={idx} className="video-card">
                    <h3 className="video-title">{video.title}</h3>
                    <video
                      controls
                      onEnded={() => handleVideoEnd(video._id)}
                    >
                      <source src={`https://localhost:8000/api/video/${video.filename}`} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    {isAuthenticated && watchedVideos.includes(video._id) && (
                      <span className="watched-indicator">✔ Watched</span>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p>No videos available.</p>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default CoursesPage;
