
import React, { useState } from 'react';
import axios from 'axios';

function VideoUpload({ courseId, onUpload }) {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('courseId', courseId);
    formData.append('title', title);

    const res = await axios.post('https://localhost:8000/api/upload', formData);
    if (onUpload) onUpload(res.data.filename);
  };

  return (
    <div>
      <input type="text" placeholder="Video Title" onChange={e => setTitle(e.target.value)} />
      <input type="file" accept="video/mp4" onChange={e => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload Video</button>
    </div>
  );
}

export default VideoUpload;
