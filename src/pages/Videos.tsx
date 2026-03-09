import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Clock, Eye, BookOpen, Search } from 'lucide-react';
import './Videos.css';

const videos = [
    { id: 1, title: 'Introduction to Fourier Transform', course: 'Digital Signal Processing', duration: '24:30', views: '2.4K', progress: 85, thumbnail: '📡' },
    { id: 2, title: 'Linear Regression from Scratch', course: 'Machine Learning', duration: '32:15', views: '3.1K', progress: 100, thumbnail: '📈' },
    { id: 3, title: 'Binary Search Trees Explained', course: 'Data Structures', duration: '28:45', views: '4.2K', progress: 60, thumbnail: '🌲' },
    { id: 4, title: 'Convolution Operation in Signals', course: 'Signals & Systems', duration: '35:00', views: '1.8K', progress: 0, thumbnail: '📊' },
    { id: 5, title: 'Backpropagation Algorithm', course: 'Machine Learning', duration: '40:10', views: '5.6K', progress: 30, thumbnail: '🧠' },
    { id: 6, title: 'Graph Algorithms - BFS & DFS', course: 'Data Structures', duration: '38:20', views: '3.8K', progress: 0, thumbnail: '🔗' },
    { id: 7, title: 'Z-Transform & Applications', course: 'Digital Signal Processing', duration: '30:15', views: '2.1K', progress: 45, thumbnail: '🔢' },
    { id: 8, title: 'Feature Extraction Techniques', course: 'Pattern Recognition', duration: '26:40', views: '1.5K', progress: 0, thumbnail: '🔍' },
];

export default function VideosPage() {
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    const filtered = videos.filter((v) =>
        v.title.toLowerCase().includes(search.toLowerCase()) ||
        v.course.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="videos-page">
            <div className="videos-header animate-fade-in">
                <div>
                    <h1>Video Library</h1>
                    <p>Watch annotated lectures with integrated quizzes</p>
                </div>
            </div>

            <div className="videos-filters animate-fade-in delay-100">
                <div className="courses-search">
                    <Search size={18} />
                    <input type="text" placeholder="Search videos..." value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
            </div>

            <div className="videos-grid animate-fade-in delay-200">
                {filtered.map((video) => (
                    <div key={video.id} className="video-card" onClick={() => navigate(`/videos/${video.id}`)}>
                        <div className="video-card-thumb">
                            <span className="video-card-emoji">{video.thumbnail}</span>
                            <div className="video-card-overlay">
                                <Play size={32} fill="white" />
                            </div>
                            <span className="video-card-duration"><Clock size={12} /> {video.duration}</span>
                            {video.progress > 0 && video.progress < 100 && (
                                <div className="video-progress-bar">
                                    <div className="video-progress-fill" style={{ width: `${video.progress}%` }} />
                                </div>
                            )}
                            {video.progress === 100 && <span className="video-watched-badge">✓ Watched</span>}
                        </div>
                        <div className="video-card-body">
                            <h3>{video.title}</h3>
                            <div className="video-card-meta">
                                <span><BookOpen size={13} /> {video.course}</span>
                                <span><Eye size={13} /> {video.views}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
