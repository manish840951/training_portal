import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { useEffect, useState } from 'react';

function ProgressPage() {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const [watchedVideos, setWatchedVideos] = useState([]);

  useEffect(() => {
    const fetchWatched = async () => {
      if (isAuthenticated) {
        const token = await getAccessTokenSilently();
        const res = await axios.get('http://localhost:8000/api/progress/watched', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setWatchedVideos(res.data.watchedVideos);
      }
    };
    fetchWatched();
  }, [isAuthenticated, getAccessTokenSilently]);

  return (
    <div>
      <h1>Your Progress</h1>
      <ul>
        {watchedVideos.map(video => (
          <li key={video._id}>{video.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default ProgressPage;
