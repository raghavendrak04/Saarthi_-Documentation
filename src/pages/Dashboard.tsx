import { useEffect, useState } from 'react';
import {
    BookOpen, ClipboardList, BarChart3, Clock, Flame,
    ArrowRight, ChevronRight, Sparkles, Play, FileText, Award
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/auth.store';
import { api, type ProgressResponse, type EnrollmentWithCourseResponse, type PaginatedResponse } from '../lib/api';
import EmptyState from '../components/EmptyState';
import './Dashboard.css';

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
        case 'high': return { color: '#C86F7A', bg: 'rgba(200, 111, 122, 0.14)', label: 'Due Soon' };
        case 'medium': return { color: '#B59A63', bg: 'rgba(181, 154, 99, 0.14)', label: 'This Week' };
        case 'low': return { color: '#5FA89C', bg: 'rgba(95, 168, 156, 0.14)', label: 'Upcoming' };
        default: return { color: '#94A3B8', bg: 'rgba(148, 163, 184, 0.14)', label: '' };
    }
}

export default function DashboardPage() {
    const { user } = useAuthStore();
    const navigate = useNavigate();
    const [progress, setProgress] = useState<ProgressResponse | null>(null);
    const [continueCourses, setContinueCourses] = useState<EnrollmentWithCourseResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;
        (async () => {
            setLoading(true);
            setError(null);
            try {
                const [progressRes, enrollmentsRes] = await Promise.all([
                    api.get<ProgressResponse>('/users/me/progress'),
                    api.get<PaginatedResponse<EnrollmentWithCourseResponse>>('/courses/my/enrollments', { limit: 5, offset: 0 }),
                ]);
                if (!cancelled) {
                    setProgress(progressRes);
                    setContinueCourses(enrollmentsRes.items || []);
                }
            } catch (e) {
                if (!cancelled) setError(e instanceof Error ? e.message : 'Failed to load dashboard');
            } finally {
                if (!cancelled) setLoading(false);
            }
        })();
        return () => { cancelled = true; };
    }, []);

    const statsCards = progress
        ? [
            { label: 'Courses Enrolled', value: String(progress.coursesEnrolled), icon: BookOpen, color: '#8FA3C2', bg: 'rgba(143, 163, 194, 0.14)', change: '' },
            { label: 'Pending Assignments', value: String(progress.pendingAssignments), icon: ClipboardList, color: '#9AA8BD', bg: 'rgba(154, 168, 189, 0.14)', change: progress.pendingAssignments > 0 ? 'Due' : '' },
            { label: 'Avg Quiz Score', value: `${progress.avgQuizScorePercent}%`, icon: BarChart3, color: '#6EAFA4', bg: 'rgba(110, 175, 164, 0.14)', change: '' },
            { label: 'Study Time', value: `${progress.studyTimeHours}h`, icon: Clock, color: '#8FA3C2', bg: 'rgba(143, 163, 194, 0.14)', change: 'Total' },
        ]
        : [
            { label: 'Courses Enrolled', value: '–', icon: BookOpen, color: '#8FA3C2', bg: 'rgba(143, 163, 194, 0.14)', change: '' },
            { label: 'Pending Assignments', value: '–', icon: ClipboardList, color: '#9AA8BD', bg: 'rgba(154, 168, 189, 0.14)', change: '' },
            { label: 'Avg Quiz Score', value: '–', icon: BarChart3, color: '#6EAFA4', bg: 'rgba(110, 175, 164, 0.14)', change: '' },
            { label: 'Study Time', value: '–', icon: Clock, color: '#8FA3C2', bg: 'rgba(143, 163, 194, 0.14)', change: '' },
        ];

    return (
        <div className="dashboard">
            {error && (
                <div className="dash-error" role="alert">
                    {error}
                </div>
            )}
            {/* Welcome Header */}
            <div className="dash-welcome animate-fade-in">
                <div>
                    <h1 className="dash-welcome-title">Welcome back, {user?.name || 'Student'}! 👋</h1>
                    <p className="dash-welcome-sub">Let's continue your learning journey today</p>
                </div>
                <div className="dash-streak-card">
                    <Flame size={20} className="dash-streak-icon" />
                    <div>
                        <span className="dash-streak-value">{progress ? `${progress.streakDays} Day Streak` : '–'}</span>
                        <span className="dash-streak-label">{progress?.streakDays ? 'Keep it up! 🔥' : 'Start studying to build a streak'}</span>
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
                                {loading ? (
                                    <div className="skeleton dash-stat-skeleton-value" />
                                ) : (
                                    <span className="dash-stat-value">{stat.value}</span>
                                )}
                                <span className="dash-stat-label">{stat.label}</span>
                                {stat.change && <span className="dash-stat-change">{stat.change}</span>}
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
                        {loading ? (
                            Array.from({ length: 3 }).map((_, i) => (
                                <div key={i} className="dash-course-card dash-course-skeleton">
                                    <div className="skeleton dash-course-skeleton-thumb" />
                                    <div className="dash-course-info">
                                        <div className="skeleton dash-course-skeleton-title" />
                                        <div className="skeleton dash-course-skeleton-code" />
                                        <div className="skeleton dash-course-skeleton-bar" />
                                    </div>
                                    <div className="skeleton dash-course-skeleton-btn" />
                                </div>
                            ))
                        ) : continueCourses.length === 0 ? (
                            <EmptyState
                                icon={<BookOpen size={28} />}
                                title="No enrollments yet"
                                description="Enroll in a course to continue your learning."
                                action={
                                    <button type="button" className="btn btn-primary btn-sm" onClick={() => navigate('/courses')}>
                                        Browse courses
                                    </button>
                                }
                            />
                        ) : (
                            continueCourses.map((e) => (
                                <div key={e.id} className="dash-course-card" onClick={() => navigate(`/courses/${e.courseId}`)}>
                                    <div className="dash-course-thumb">{e.course.thumbnailEmoji || '📚'}</div>
                                    <div className="dash-course-info">
                                        <h4>{e.course.title}</h4>
                                        <span className="dash-course-code">{e.course.code}</span>
                                        <div className="progress-bar" style={{ marginTop: '0.5rem' }}>
                                            <div className="progress-bar-fill" style={{ width: `${e.progressPercent}%` }} />
                                        </div>
                                        <div className="dash-course-meta">
                                            <span>{e.progressPercent}% complete</span>
                                        </div>
                                    </div>
                                    <button className="btn btn-primary btn-sm" onClick={(ev) => { ev.stopPropagation(); navigate(`/courses/${e.courseId}`); }}>Resume</button>
                                </div>
                            ))
                        )}
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
