import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    ArrowLeft, Plus, FileText, Video, BookOpen, Trash2, X, Save, Paperclip,
    Link as LinkIcon, Heading
} from 'lucide-react';
import { useAuthStore } from '../stores/auth.store';
import './CourseDetail.css';

/* ── Types ── */
interface Assignment {
    id: string;
    title: string;
    description: string;
    dueDate: string;
    points: number;
    status: 'pending' | 'submitted' | 'graded';
    grade?: number;
    attachments: string[];
    createdAt: string;
    topic: string;
}

interface Material {
    id: string;
    title: string;
    description: string;
    type: 'pdf' | 'doc' | 'link' | 'slide';
    url: string;
    createdAt: string;
    topic: string;
}

interface VideoLecture {
    id: string;
    title: string;
    description: string;
    duration: string;
    thumbnail: string;
    url: string;
    watched: boolean;
    createdAt: string;
    topic: string;
}

interface StreamItem {
    id: string;
    type: 'assignment' | 'material' | 'video' | 'announcement';
    title: string;
    description: string;
    createdAt: string;
    author: string;
}

/* ── Mock Data ── */
const courseInfo: Record<string, { title: string; code: string; instructor: string; emoji: string; color: string }> = {
    '1': { title: 'Digital Signal Processing', code: 'EC301', instructor: 'Dr. Sharma', emoji: '📡', color: '#3f4244' },
    '2': { title: 'Machine Learning Fundamentals', code: 'CS401', instructor: 'Prof. Kumar', emoji: '🤖', color: '#2f3b49' },
    '3': { title: 'Data Structures & Algorithms', code: 'CS201', instructor: 'Dr. Patel', emoji: '🌳', color: '#2a4d3e' },
    '4': { title: 'Web Development Bootcamp', code: 'CS301', instructor: 'Prof. Singh', emoji: '🌐', color: '#4d3a2a' },
};

const initialAssignments: Assignment[] = [
    { id: 'a1', title: 'FFT Implementation', description: 'Implement the Fast Fourier Transform algorithm in Python.', dueDate: '2026-02-20', points: 100, status: 'pending', attachments: ['FFT_Guide.pdf'], createdAt: '2026-02-10', topic: 'Projects' },
    { id: 'a2', title: 'Filter Design Project', description: 'Design a low-pass Butterworth filter.', dueDate: '2026-02-15', points: 50, status: 'submitted', attachments: ['Filter_Specs.pdf'], createdAt: '2026-02-05', topic: 'Projects' },
    { id: 'a3', title: 'Mid-term Quiz', description: 'Online quiz covering Chapters 1-5.', dueDate: '2026-02-12', points: 200, status: 'graded', grade: 85, attachments: [], createdAt: '2026-02-01', topic: 'Class Work' },
];

const initialMaterials: Material[] = [
    { id: 'm1', title: 'Chapter 1 - Introduction to DSP', description: 'Overview of digital signal processing', type: 'pdf', url: '#', createdAt: '2026-01-15', topic: 'Course Materials' },
    { id: 'm2', title: 'Fourier Transform Reference', description: 'Quick reference', type: 'pdf', url: '#', createdAt: '2026-01-20', topic: 'Course Materials' },
    { id: 'm3', title: 'END Exam solutions', description: 'Solutions for final paper', type: 'doc', url: '#', createdAt: '2026-05-07', topic: 'Post Exam - Solutions' },
];

const initialVideos: VideoLecture[] = [
    { id: 'v1', title: 'Lecture 1: Signals & Systems Review', description: 'Review of continuous signals.', duration: '45:20', thumbnail: '🎬', url: '#', watched: true, createdAt: '2026-01-15', topic: 'Video Lectures' },
    { id: 'v2', title: 'Lecture 2: Sampling Theorem', description: 'Nyquist sampling theorem.', duration: '52:10', thumbnail: '🎬', url: '#', watched: true, createdAt: '2026-01-17', topic: 'Video Lectures' },
];

const initialStream: StreamItem[] = [
    { id: 's1', type: 'announcement', title: 'Welcome to the course!', description: 'Please review the syllabus and course policies.', createdAt: '2026-01-14', author: 'Dr. Sharma' },
    { id: 's2', type: 'material', title: 'Dr. Sharma posted a new material:', description: 'Chapter 1 - Introduction to DSP', createdAt: '2026-01-15', author: 'Dr. Sharma' },
    { id: 's3', type: 'video', title: 'Dr. Sharma posted a new video:', description: 'Lecture 1: Signals & Systems Review', createdAt: '2026-01-15', author: 'Dr. Sharma' },
    { id: 's4', type: 'announcement', title: '', description: 'Project marks are shared with the team members. Please check.', createdAt: '2026-02-15', author: 'Prof. Kumar' },
];

const tabs = [
    { id: 'stream', label: 'Stream' },
    { id: 'classwork', label: 'Classwork' },
    { id: 'people', label: 'People' },
];

type ModalType = 'assignment' | 'material' | 'video' | 'topic' | null;

export default function CourseDetailPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { user } = useAuthStore();
    const isAdmin = user?.role === 'admin';
    const course = courseInfo[id || '1'] || courseInfo['1'];
    const userName = user?.name || (isAdmin ? course.instructor : 'Demo Student');

    const [activeTab, setActiveTab] = useState('stream');
    const [assignments, setAssignments] = useState<Assignment[]>(initialAssignments);
    const [materials, setMaterials] = useState<Material[]>(initialMaterials);
    const [videos, setVideos] = useState<VideoLecture[]>(initialVideos);
    const [stream, setStream] = useState<StreamItem[]>(initialStream);
    const [topics, setTopics] = useState<string[]>(['Course Materials', 'Class Work', 'Projects', 'Video Lectures', 'Post Exam - Solutions']);

    // Compose Annoucnement
    const [isComposing, setIsComposing] = useState(false);
    const [announcementText, setAnnouncementText] = useState('');

    // Modal
    const [modalType, setModalType] = useState<ModalType>(null);
    const [editItem, setEditItem] = useState<any>(null);
    const [formData, setFormData] = useState<any>({});
    const [createMenuOpen, setCreateMenuOpen] = useState(false);

    const handlePostAnnouncement = () => {
        if (!announcementText.trim()) return;
        const now = new Date().toISOString().split('T')[0];
        const newPost: StreamItem = {
            id: Date.now().toString(),
            type: 'announcement',
            title: '',
            description: announcementText.trim(),
            createdAt: now,
            author: userName
        };
        setStream(prev => [newPost, ...prev]);
        setAnnouncementText('');
        setIsComposing(false);
    };

    const openModal = (type: ModalType, item?: any) => {
        setCreateMenuOpen(false);
        setModalType(type);
        setEditItem(item || null);
        if (item) {
            setFormData({ ...item });
        } else {
            if (type === 'assignment') setFormData({ title: '', description: '', dueDate: '', points: 100, attachments: [], topic: topics[0] || '' });
            if (type === 'material') setFormData({ title: '', description: '', type: 'pdf', url: '', topic: topics[0] || '' });
            if (type === 'video') setFormData({ title: '', description: '', duration: '', url: '', topic: topics[0] || '' });
            if (type === 'topic') setFormData({ title: '' });
        }
    };

    const handleSave = () => {
        const now = new Date().toISOString().split('T')[0];
        if (modalType === 'topic') {
            if (formData.title && !topics.includes(formData.title)) {
                setTopics([...topics, formData.title]);
            }
        }
        else if (modalType === 'assignment') {
            if (editItem) {
                setAssignments((prev) => prev.map((a) => (a.id === editItem.id ? { ...a, ...formData } : a)));
            } else {
                const newA: Assignment = { id: Date.now().toString(), ...formData, status: 'pending', createdAt: now };
                setAssignments((prev) => [newA, ...prev]);
                setStream((prev) => [{ id: Date.now().toString(), type: 'assignment', title: `${userName} posted a new assignment:`, description: formData.title, createdAt: now, author: userName }, ...prev]);
            }
        }
        else if (modalType === 'material') {
            if (editItem) {
                setMaterials((prev) => prev.map((m) => (m.id === editItem.id ? { ...m, ...formData } : m)));
            } else {
                const newM: Material = { id: Date.now().toString(), ...formData, createdAt: now };
                setMaterials((prev) => [newM, ...prev]);
                setStream((prev) => [{ id: Date.now().toString(), type: 'material', title: `${userName} posted a new material:`, description: formData.title, createdAt: now, author: userName }, ...prev]);
            }
        }
        else if (modalType === 'video') {
            if (editItem) {
                setVideos((prev) => prev.map((v) => (v.id === editItem.id ? { ...v, ...formData } : v)));
            } else {
                const newV: VideoLecture = { id: Date.now().toString(), ...formData, thumbnail: '🎬', watched: false, createdAt: now };
                setVideos((prev) => [newV, ...prev]);
                setStream((prev) => [{ id: Date.now().toString(), type: 'video', title: `${userName} posted a new video lecture:`, description: formData.title, createdAt: now, author: userName }, ...prev]);
            }
        }
        setModalType(null);
    };


    // Calculate Items by Topic
    const itemsByTopic: Record<string, any[]> = {};
    topics.forEach(t => itemsByTopic[t] = []);
    itemsByTopic['No topic'] = [];

    assignments.forEach(a => {
        const topic = a.topic && topics.includes(a.topic) ? a.topic : 'No topic';
        itemsByTopic[topic].push({ ...a, itemType: 'assignment' });
    });
    materials.forEach(m => {
        const topic = m.topic && topics.includes(m.topic) ? m.topic : 'No topic';
        itemsByTopic[topic].push({ ...m, itemType: 'material' });
    });
    videos.forEach(v => {
        const topic = v.topic && topics.includes(v.topic) ? v.topic : 'No topic';
        itemsByTopic[topic].push({ ...v, itemType: 'video' });
    });

    return (
        <div className="cd-page">
            {/* Tabs matching Classroom look */}
            <div className="cd-tabs-wrapper">
                <button className="cd-back-btn" onClick={() => navigate('/courses')}>
                    <ArrowLeft size={20} />
                </button>
                <div className="cd-cr-tabs">
                    {tabs.filter(t => isAdmin || t.id !== 'people').map((tab) => (
                        <button key={tab.id} className={`cd-cr-tab ${activeTab === tab.id ? 'active' : ''}`} onClick={() => setActiveTab(tab.id)}>
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* ── Stream Tab ── */}
            {activeTab === 'stream' && (
                <div className="cd-stream-container">
                    <div className="cd-stream-sidebar">
                        <div className="cd-upcoming-box">
                            <h4>Upcoming</h4>
                            <p>Woohoo, no work due in soon!</p>
                            <a href="#" className="cd-upcoming-link">View all</a>
                        </div>
                    </div>

                    <div className="cd-stream-main">
                        {/* Banner inside stream */}
                        <div className="cd-cr-banner" style={{ backgroundColor: course.color }}>
                            <div className="cd-cr-banner-content">
                                <h1>{course.title}</h1>
                                <p>{course.code}</p>
                            </div>
                        </div>

                        {/* Compose Post */}
                        <div className="cd-compose-card">
                            {!isComposing ? (
                                <div className="cd-compose-trigger" onClick={() => setIsComposing(true)}>
                                    <div className="cd-avatar">{userName.charAt(0)}</div>
                                    <span style={{ color: 'var(--primary)' }}>Announce something to your class</span>
                                </div>
                            ) : (
                                <div className="cd-compose-editor animate-fade-in">
                                    <div className="cd-editor-top">
                                        <textarea
                                            placeholder="Announce something to your class"
                                            value={announcementText}
                                            onChange={(e) => setAnnouncementText(e.target.value)}
                                            autoFocus
                                        />
                                    </div>
                                    <div className="cd-editor-tools">
                                        <div className="cd-editor-icons">
                                            <button className="btn-icon"><Heading size={16} /></button>
                                            <button className="btn-icon"><LinkIcon size={16} /></button>
                                            <button className="btn-icon"><Video size={16} /></button>
                                            <button className="btn-icon"><Paperclip size={16} /></button>
                                        </div>
                                        <div className="cd-editor-actions">
                                            <button className="btn btn-ghost" onClick={() => setIsComposing(false)}>Cancel</button>
                                            <button className="btn btn-primary" onClick={handlePostAnnouncement} disabled={!announcementText.trim()}>Post</button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Stream Feed */}
                        <div className="cd-feed">
                            {[...stream].reverse().map((item) => (
                                <div key={item.id} className="cd-feed-item">
                                    <div className="cd-feed-header">
                                        <div className="cd-feed-icon">
                                            {item.type === 'announcement' ? (
                                                <div className="cd-avatar">{item.author.charAt(0)}</div>
                                            ) : (
                                                <div className="cd-icon-badge" style={{ backgroundColor: item.type === 'assignment' ? 'var(--primary)' : 'var(--gray-500)' }}>
                                                    {item.type === 'assignment' && <FileText size={16} color="white" />}
                                                    {item.type === 'material' && <BookOpen size={16} color="white" />}
                                                    {item.type === 'video' && <Video size={16} color="white" />}
                                                </div>
                                            )}
                                        </div>
                                        <div className="cd-feed-meta">
                                            <p className="cd-feed-author">
                                                {item.type === 'announcement' ? item.author : item.title}
                                            </p>
                                            <p className="cd-feed-date">{item.createdAt}</p>
                                        </div>
                                    </div>
                                    <div className="cd-feed-body">
                                        {item.type === 'announcement' && item.title && <h4>{item.title}</h4>}
                                        <p>{item.description}</p>
                                    </div>
                                    <div className="cd-feed-footer">
                                        <button className="btn btn-ghost btn-sm">Add class comment</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* ── Classwork Tab ── */}
            {activeTab === 'classwork' && (
                <div className="cd-classwork-container">
                    <div className="cd-cw-actions">
                        {isAdmin && (
                            <div className="cd-create-dropdown">
                                <button className="btn btn-primary" onClick={() => setCreateMenuOpen(!createMenuOpen)}>
                                    <Plus size={18} /> Create
                                </button>
                                {createMenuOpen && (
                                    <div className="cd-dropdown-menu">
                                        <button onClick={() => openModal('assignment')}><FileText size={16} /> Assignment</button>
                                        <button onClick={() => openModal('material')}><BookOpen size={16} /> Material</button>
                                        <button onClick={() => openModal('video')}><Video size={16} /> Video Lecture</button>
                                        <div className="cd-divider"></div>
                                        <button onClick={() => openModal('topic')}><Heading size={16} /> Topic</button>
                                    </div>
                                )}
                            </div>
                        )}
                        <button className="btn btn-outline" style={{ marginLeft: isAdmin ? '1rem' : '0' }}><FileText size={16} /> View your work</button>
                    </div>

                    <div className="cd-topics-view">
                        {topics.concat('No topic').map(topic => {
                            const items = itemsByTopic[topic];
                            if (!isAdmin && items.length === 0 && topic !== 'No topic') return null; // hide empty topics for students
                            if (topic === 'No topic' && items.length === 0) return null;

                            return (
                                <div key={topic} className="cd-topic-group">
                                    <h2 className="cd-topic-title">{topic}</h2>
                                    <div className="cd-topic-items">
                                        {items.map(item => (
                                            <div key={item.id} className="cd-cw-item">
                                                <div className="cd-cw-item-left">
                                                    <div className="cd-cw-icon" style={{ backgroundColor: item.itemType === 'assignment' ? 'var(--primary)' : 'var(--gray-500)' }}>
                                                        {item.itemType === 'assignment' && <FileText size={18} color="white" />}
                                                        {item.itemType === 'material' && <BookOpen size={18} color="white" />}
                                                        {item.itemType === 'video' && <Video size={18} color="white" />}
                                                    </div>
                                                    <span className="cd-cw-title">{item.title}</span>
                                                </div>
                                                <div className="cd-cw-item-right">
                                                    {item.itemType === 'assignment' && <span className="cd-cw-due">Due {item.dueDate}</span>}
                                                    {item.itemType === 'material' && <span className="cd-cw-due">Posted {item.createdAt}</span>}
                                                    {isAdmin && <button className="btn-icon"><Trash2 size={16} /></button>}
                                                </div>
                                            </div>
                                        ))}
                                        {isAdmin && items.length === 0 && (
                                            <div className="cd-cw-empty">Students will see this topic once work is added to it</div>
                                        )}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )}

            {/* ── People Tab ── */}
            {activeTab === 'people' && isAdmin && (
                <div className="cd-people-container">
                    <div className="cd-people-section">
                        <h2>Teachers</h2>
                        <div className="cd-person">
                            <div className="cd-avatar">{course.instructor.charAt(0)}</div>
                            <span>{course.instructor}</span>
                        </div>
                    </div>
                    <div className="cd-people-section">
                        <h2>Classmates</h2>
                        <div className="cd-person">
                            <div className="cd-avatar" style={{ backgroundColor: 'var(--accent)' }}>S</div>
                            <span>Student Demo</span>
                        </div>
                        <div className="cd-person">
                            <div className="cd-avatar" style={{ backgroundColor: 'var(--success)' }}>M</div>
                            <span>Manikanta</span>
                        </div>
                    </div>
                </div>
            )}

            {/* ── Modals ── */}
            {modalType && (
                <div className="cd-modal-overlay" onClick={() => setModalType(null)}>
                    <div className="cd-modal animate-scale-in" onClick={(e) => e.stopPropagation()}>
                        <div className="cd-modal-header">
                            <h2>{editItem ? 'Edit' : 'Add'} {modalType.charAt(0).toUpperCase() + modalType.slice(1)}</h2>
                            <button className="cd-modal-close" onClick={() => setModalType(null)}><X size={20} /></button>
                        </div>
                        <div className="cd-modal-body">
                            <div className="cd-modal-field">
                                <label>{modalType === 'topic' ? 'Topic Name' : 'Title *'}</label>
                                <input className="input" placeholder="Enter title..." value={formData.title || ''} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
                            </div>

                            {modalType !== 'topic' && (
                                <>
                                    <div className="cd-modal-field">
                                        <label>Description</label>
                                        <textarea className="input" rows={3} placeholder="Enter description..." value={formData.description || ''} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
                                    </div>
                                    <div className="cd-modal-field">
                                        <label>Topic</label>
                                        <select className="input" value={formData.topic || 'No topic'} onChange={(e) => setFormData({ ...formData, topic: e.target.value })}>
                                            <option value="No topic">No topic</option>
                                            {topics.map(t => <option key={t} value={t}>{t}</option>)}
                                        </select>
                                    </div>
                                </>
                            )}

                            {modalType === 'assignment' && (
                                <div className="cd-modal-row">
                                    <div className="cd-modal-field">
                                        <label>Due Date *</label>
                                        <input className="input" type="date" value={formData.dueDate || ''} onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })} />
                                    </div>
                                    <div className="cd-modal-field">
                                        <label>Points</label>
                                        <input className="input" type="number" value={formData.points || 100} onChange={(e) => setFormData({ ...formData, points: parseInt(e.target.value) || 0 })} />
                                    </div>
                                </div>
                            )}

                            {modalType === 'material' && (
                                <div className="cd-modal-row">
                                    <div className="cd-modal-field">
                                        <label>Type</label>
                                        <select className="input" value={formData.type || 'pdf'} onChange={(e) => setFormData({ ...formData, type: e.target.value })}>
                                            <option value="pdf">PDF</option>
                                            <option value="doc">Document</option>
                                            <option value="slide">Slides</option>
                                        </select>
                                    </div>
                                    <div className="cd-modal-field">
                                        <label>File URL</label>
                                        <input className="input" placeholder="https://..." value={formData.url || ''} onChange={(e) => setFormData({ ...formData, url: e.target.value })} />
                                    </div>
                                </div>
                            )}

                            {modalType === 'video' && (
                                <div className="cd-modal-row">
                                    <div className="cd-modal-field">
                                        <label>Video URL</label>
                                        <input className="input" placeholder="https://youtube.com/..." value={formData.url || ''} onChange={(e) => setFormData({ ...formData, url: e.target.value })} />
                                    </div>
                                    <div className="cd-modal-field">
                                        <label>Duration</label>
                                        <input className="input" placeholder="e.g. 45:20" value={formData.duration || ''} onChange={(e) => setFormData({ ...formData, duration: e.target.value })} />
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="cd-modal-footer">
                            <button className="btn btn-outline" onClick={() => setModalType(null)}>Cancel</button>
                            <button className="btn btn-primary" onClick={handleSave}>
                                <Save size={16} /> {editItem ? 'Update' : 'Create'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
