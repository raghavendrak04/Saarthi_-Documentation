import {
    BookOpen, ClipboardList, BarChart3, Clock, Flame,
    ArrowRight, ChevronRight, Sparkles, Play, FileText, Award
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/auth.store';
import './Dashboard.css';

const statsCards = [
    { label: 'Courses Enrolled', value: '5', icon: BookOpen, color: '#4F46E5', bg: '#EEF2FF', change: '+1 this week' },
    { label: 'Pending Assignments', value: '3', icon: ClipboardList, color: '#F59E0B', bg: '#FEF3C7', change: 'Due this week' },
    { label: 'Avg Quiz Score', value: '85%', icon: BarChart3, color: '#10B981', bg: '#D1FAE5', change: '+5% from last' },
    { label: 'Study Time', value: '12h', icon: Clock, color: '#3B82F6', bg: '#DBEAFE', change: 'This week' },
];

const continueCourses = [
    { id: 1, title: 'Digital Signal Processing', code: 'EC301', progress: 65, lesson: 'Lesson 5 of 12', thumbnail: '📡' },
    { id: 2, title: 'Machine Learning Fundamentals', code: 'CS501', progress: 42, lesson: 'Lesson 3 of 10', thumbnail: '🤖' },
    { id: 3, title: 'Data Structures & Algorithms', code: 'CS201', progress: 88, lesson: 'Lesson 14 of 16', thumbnail: '🌲' },
];

const deadlines = [
    { id: 1, title: 'DSP Assignment #3 - FFT Implementation', course: 'Digital Signal Processing', due: '2026-02-14', urgency: 'high' as const, type: 'assignment' as const },
    { id: 2, title: 'ML Quiz - Neural Networks', course: 'Machine Learning', due: '2026-02-15', urgency: 'high' as const, type: 'quiz' as const },
    { id: 3, title: 'Binary Tree Problems Set', course: 'Data Structures', due: '2026-02-18', urgency: 'medium' as const, type: 'assignment' as const },
    { id: 4, title: 'Pattern Recognition Report', course: 'Pattern Recognition', due: '2026-02-22', urgency: 'low' as const, type: 'assignment' as const },
];

const recommended = [
    { id: 1, title: 'Fourier Transform Deep Dive', type: 'video', icon: Play, duration: '25 min' },
    { id: 2, title: 'Gradient Descent Explained', type: 'note', icon: FileText, duration: '10 min read' },
    { id: 3, title: 'Graph Algorithms Quiz', type: 'quiz', icon: Award, duration: '15 questions' },
    { id: 4, title: 'Convolution Neural Networks', type: 'video', icon: Play, duration: '32 min' },
];

function getUrgencyInfo(urgency: string) {
    switch (urgency) {
        case 'high': return { color: '#EF4444', bg: '#FEE2E2', label: 'Due Soon' };
        case 'medium': return { color: '#F59E0B', bg: '#FEF3C7', label: 'This Week' };
        case 'low': return { color: '#10B981', bg: '#D1FAE5', label: 'Upcoming' };
        default: return { color: '#6B7280', bg: '#F3F4F6', label: '' };
    }
}

export default function DashboardPage() {
    const { user } = useAuthStore();
    const navigate = useNavigate();

    return (
        <div className="dashboard">
            {/* Welcome Header */}
            <div className="dash-welcome animate-fade-in">
                <div>
                    <h1 className="dash-welcome-title">Welcome back, {user?.name || 'Student'}! 👋</h1>
                    <p className="dash-welcome-sub">Let's continue your learning journey today</p>
                </div>
                <div className="dash-streak-card">
                    <Flame size={24} color="#F59E0B" />
                    <div>
                        <span className="dash-streak-value">5 Day Streak</span>
                        <span className="dash-streak-label">Keep it up! 🔥</span>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="dash-stats animate-fade-in delay-100">
                {statsCards.map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                        <div key={i} className="dash-stat-card">
                            <div className="dash-stat-icon" style={{ background: stat.bg, color: stat.color }}>
                                <Icon size={24} />
                            </div>
                            <div className="dash-stat-info">
                                <span className="dash-stat-value">{stat.value}</span>
                                <span className="dash-stat-label">{stat.label}</span>
                                <span className="dash-stat-change">{stat.change}</span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Content Grid */}
            <div className="dash-grid">
                {/* Continue Learning */}
                <div className="dash-section animate-fade-in delay-200">
                    <div className="dash-section-header">
                        <h2>Continue Learning</h2>
                        <button className="btn btn-ghost btn-sm" onClick={() => navigate('/courses')}>
                            View All <ChevronRight size={14} />
                        </button>
                    </div>
                    <div className="dash-courses">
                        {continueCourses.map((course) => (
                            <div key={course.id} className="dash-course-card" onClick={() => navigate('/courses')}>
                                <div className="dash-course-thumb">{course.thumbnail}</div>
                                <div className="dash-course-info">
                                    <h4>{course.title}</h4>
                                    <span className="dash-course-code">{course.code}</span>
                                    <div className="progress-bar" style={{ marginTop: '0.5rem' }}>
                                        <div className="progress-bar-fill" style={{ width: `${course.progress}%` }} />
                                    </div>
                                    <div className="dash-course-meta">
                                        <span>{course.progress}% complete</span>
                                        <span>{course.lesson}</span>
                                    </div>
                                </div>
                                <button className="btn btn-primary btn-sm">Resume</button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Deadlines */}
                <div className="dash-section animate-fade-in delay-300">
                    <div className="dash-section-header">
                        <h2>Upcoming Deadlines</h2>
                    </div>
                    <div className="dash-deadlines">
                        {deadlines.map((dl) => {
                            const info = getUrgencyInfo(dl.urgency);
                            return (
                                <div key={dl.id} className="dash-deadline-item">
                                    <div className="dash-deadline-icon" style={{ background: info.bg, color: info.color }}>
                                        {dl.type === 'quiz' ? <Award size={18} /> : <ClipboardList size={18} />}
                                    </div>
                                    <div className="dash-deadline-info">
                                        <h4>{dl.title}</h4>
                                        <span>{dl.course}</span>
                                    </div>
                                    <div className="dash-deadline-due">
                                        <span className="badge" style={{ background: info.bg, color: info.color }}>{info.label}</span>
                                        <span className="dash-deadline-date">{new Date(dl.due).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Recommended */}
            <div className="dash-section animate-fade-in delay-400">
                <div className="dash-section-header">
                    <h2><Sparkles size={20} style={{ color: 'var(--accent)' }} /> Recommended for You</h2>
                    <button className="btn btn-ghost btn-sm">View All <ChevronRight size={14} /></button>
                </div>
                <div className="dash-recommended">
                    {recommended.map((item) => {
                        const Icon = item.icon;
                        return (
                            <div key={item.id} className="dash-rec-card">
                                <div className="dash-rec-icon"><Icon size={20} /></div>
                                <h4>{item.title}</h4>
                                <span className="dash-rec-meta">{item.duration}</span>
                                <button className="btn btn-sm btn-secondary" style={{ marginTop: 'auto' }}>
                                    Start <ArrowRight size={14} />
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
