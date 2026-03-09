import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Pause, RotateCcw, Volume2, Settings, Maximize, MessageCircle, FileText, CheckCircle2, ChevronRight, Clock, Plus } from 'lucide-react';
import './VideoPlayer.css';

const MOCK_VIDEO = {
    id: 1,
    title: 'Introduction to Digital Signal Processing',
    src: 'https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4', // Safe open source video
    duration: 596, // seconds
    chapters: [
        { time: 0, title: 'Introduction' },
        { time: 125, title: 'What is a Signal?' },
        { time: 340, title: 'Analog vs Digital' },
        { time: 480, title: 'Applications of DSP' },
    ],
    notes: [
        { time: 45, text: 'Remember: Sampling theorem requires fs > 2*fmax' },
        { time: 210, text: 'Quantization noise is modeled as uniform random variable' },
    ]
};

export default function VideoPlayerPage() {
    const navigate = useNavigate();
    const videoRef = useRef<HTMLVideoElement>(null);
    const [playing, setPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [volume, setVolume] = useState(1);
    const [activeTab, setActiveTab] = useState<'notes' | 'discussion'>('notes');
    const [notes, setNotes] = useState(MOCK_VIDEO.notes);
    const [newNote, setNewNote] = useState('');

    const togglePlay = () => {
        if (videoRef.current) {
            if (playing) videoRef.current.pause();
            else videoRef.current.play();
            setPlaying(!playing);
        }
    };

    const handleTimeUpdate = () => {
        if (videoRef.current) setCurrentTime(videoRef.current.currentTime);
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const seekTo = (time: number) => {
        if (videoRef.current) {
            videoRef.current.currentTime = time;
            setCurrentTime(time);
        }
    };

    const addNote = () => {
        if (!newNote.trim()) return;
        const note = { time: Math.floor(currentTime), text: newNote };
        setNotes([...notes, note].sort((a, b) => a.time - b.time));
        setNewNote('');
    };

    return (
        <div className="video-player-page">
            <div className="video-main-area">
                {/* Header */}
                <div className="video-header">
                    <button className="btn btn-ghost btn-sm" onClick={() => navigate('/videos')}>
                        ← Back to Library
                    </button>
                    <h1>{MOCK_VIDEO.title}</h1>
                </div>

                {/* Player Container */}
                <div className="video-container">
                    <video
                        ref={videoRef}
                        src={MOCK_VIDEO.src}
                        className="video-element"
                        onTimeUpdate={handleTimeUpdate}
                        onClick={togglePlay}
                    />

                    {/* Overlay Controls */}
                    <div className="video-controls-overlay">
                        {/* Progress Bar */}
                        <div className="video-progress-container" onClick={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect();
                            const pos = (e.clientX - rect.left) / rect.width;
                            seekTo(pos * MOCK_VIDEO.duration);
                        }}>
                            <div className="video-progress-bg">
                                <div className="video-progress-fill" style={{ width: `${(currentTime / MOCK_VIDEO.duration) * 100}%` }} />
                            </div>
                            {/* Chapter Markers */}
                            {MOCK_VIDEO.chapters.map((chap, i) => (
                                <div
                                    key={i}
                                    className="chapter-marker"
                                    style={{ left: `${(chap.time / MOCK_VIDEO.duration) * 100}%` }}
                                    title={chap.title}
                                />
                            ))}
                        </div>

                        <div className="video-controls-row">
                            <div className="controls-left">
                                <button onClick={togglePlay} className="control-btn">
                                    {playing ? <Pause size={20} /> : <Play size={20} />}
                                </button>
                                <button className="control-btn" onClick={() => seekTo(currentTime - 10)}>
                                    <RotateCcw size={18} />
                                </button>
                                <div className="volume-control">
                                    <Volume2 size={18} />
                                    <input
                                        type="range"
                                        min="0" max="1" step="0.1"
                                        value={volume}
                                        onChange={(e) => {
                                            setVolume(parseFloat(e.target.value));
                                            if (videoRef.current) videoRef.current.volume = parseFloat(e.target.value);
                                        }}
                                        className="volume-slider"
                                    />
                                </div>
                                <span className="time-display">
                                    {formatTime(currentTime)} / {formatTime(MOCK_VIDEO.duration)}
                                </span>
                            </div>
                            <div className="controls-right">
                                <button className="control-btn"><Settings size={18} /></button>
                                <button className="control-btn"><Maximize size={18} /></button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs & Content */}
                <div className="video-content-tabs">
                    <div className="tabs-header">
                        <button
                            className={`tab-btn ${activeTab === 'notes' ? 'active' : ''}`}
                            onClick={() => setActiveTab('notes')}
                        >
                            <FileText size={16} /> My Notes
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'discussion' ? 'active' : ''}`}
                            onClick={() => setActiveTab('discussion')}
                        >
                            <MessageCircle size={16} /> Discussion (24)
                        </button>
                    </div>

                    <div className="tab-content">
                        {activeTab === 'notes' && (
                            <div className="notes-section">
                                <div className="add-note-box">
                                    <span className="timestamp-badge"><Clock size={12} /> {formatTime(currentTime)}</span>
                                    <input
                                        type="text"
                                        placeholder="Add a timestamped note..."
                                        value={newNote}
                                        onChange={(e) => setNewNote(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && addNote()}
                                    />
                                    <button className="btn btn-primary btn-sm" onClick={addNote}>
                                        <Plus size={14} /> Add
                                    </button>
                                </div>
                                <div className="notes-list">
                                    {notes.map((note, i) => (
                                        <div key={i} className="note-item" onClick={() => seekTo(note.time)}>
                                            <span className="note-time">{formatTime(note.time)}</span>
                                            <p className="note-text">{note.text}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        {activeTab === 'discussion' && (
                            <div className="discussion-placeholder">
                                <p>Join the conversation with other students...</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Sidebar (Curriculum/Chapters) */}
            <div className="video-sidebar">
                <div className="sidebar-header">
                    <h3>Course Content</h3>
                </div>
                <div className="chapters-list">
                    {MOCK_VIDEO.chapters.map((chap, i) => {
                        const isActive = currentTime >= chap.time && (i === MOCK_VIDEO.chapters.length - 1 || currentTime < MOCK_VIDEO.chapters[i + 1].time);
                        return (
                            <button
                                key={i}
                                className={`chapter-item ${isActive ? 'active' : ''}`}
                                onClick={() => seekTo(chap.time)}
                            >
                                <div className="chapter-status">
                                    {currentTime > chap.time + 30 ? <CheckCircle2 size={16} className="text-success" /> : <div className="chapter-dot" />}
                                </div>
                                <div className="chapter-info">
                                    <span className="chapter-title">{chap.title}</span>
                                    <span className="chapter-time">{formatTime(chap.time)}</span>
                                </div>
                                {isActive && <ChevronRight size={16} className="chapter-active-icon" />}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
