import { BarChart3, TrendingUp, Target, Clock, Award, BookOpen, Flame, Calendar } from 'lucide-react';
import './Progress.css';

const weeklyData = [
    { day: 'Mon', hours: 2.5 }, { day: 'Tue', hours: 3.0 }, { day: 'Wed', hours: 1.5 },
    { day: 'Thu', hours: 4.0 }, { day: 'Fri', hours: 2.0 }, { day: 'Sat', hours: 5.5 }, { day: 'Sun', hours: 3.5 },
];

const subjectMastery = [
    { subject: 'Digital Signal Processing', progress: 72, color: '#4F46E5', quizAvg: 78, time: '18h' },
    { subject: 'Machine Learning', progress: 55, color: '#10B981', quizAvg: 82, time: '14h' },
    { subject: 'Data Structures', progress: 88, color: '#F59E0B', quizAvg: 91, time: '24h' },
    { subject: 'Pattern Recognition', progress: 35, color: '#8B5CF6', quizAvg: 65, time: '8h' },
    { subject: 'Signals & Systems', progress: 60, color: '#3B82F6', quizAvg: 74, time: '12h' },
];

const recentActivity = [
    { type: 'quiz', title: 'Scored 92% on ML Quiz #4', time: '2 hours ago', icon: '🏆' },
    { type: 'video', title: 'Watched: Fourier Transform Deep Dive', time: '5 hours ago', icon: '📺' },
    { type: 'course', title: 'Completed DSP Module 4', time: 'Yesterday', icon: '✅' },
    { type: 'code', title: 'Solved: Binary Search Problem', time: 'Yesterday', icon: '💻' },
    { type: 'streak', title: '5-Day Study Streak!', time: '2 days ago', icon: '🔥' },
];

const maxHours = Math.max(...weeklyData.map((d) => d.hours));

export default function ProgressPage() {
    return (
        <div className="progress-page">
            <div className="progress-header animate-fade-in">
                <h1>Learning Analytics</h1>
                <p>Track your progress across all subjects</p>
            </div>

            {/* Stats Row */}
            <div className="progress-stats animate-fade-in delay-100">
                <div className="progress-stat-card"><div className="progress-stat-icon" style={{ background: '#EEF2FF', color: '#4F46E5' }}><BookOpen size={22} /></div><div><span className="progress-stat-val">5</span><span className="progress-stat-lbl">Courses</span></div></div>
                <div className="progress-stat-card"><div className="progress-stat-icon" style={{ background: '#D1FAE5', color: '#10B981' }}><Award size={22} /></div><div><span className="progress-stat-val">18</span><span className="progress-stat-lbl">Quizzes</span></div></div>
                <div className="progress-stat-card"><div className="progress-stat-icon" style={{ background: '#FEF3C7', color: '#F59E0B' }}><Target size={22} /></div><div><span className="progress-stat-val">82%</span><span className="progress-stat-lbl">Avg Score</span></div></div>
                <div className="progress-stat-card"><div className="progress-stat-icon" style={{ background: '#DBEAFE', color: '#3B82F6' }}><Clock size={22} /></div><div><span className="progress-stat-val">76h</span><span className="progress-stat-lbl">Study Time</span></div></div>
                <div className="progress-stat-card"><div className="progress-stat-icon" style={{ background: '#FEE2E2', color: '#EF4444' }}><Flame size={22} /></div><div><span className="progress-stat-val">5</span><span className="progress-stat-lbl">Day Streak</span></div></div>
            </div>

            <div className="progress-grid">
                {/* Weekly Study Chart */}
                <div className="progress-section animate-fade-in delay-200">
                    <h3><BarChart3 size={18} /> Weekly Study Hours</h3>
                    <div className="progress-chart">
                        {weeklyData.map((d, i) => (
                            <div key={i} className="progress-chart-col">
                                <div className="progress-chart-bar-wrapper">
                                    <div className="progress-chart-bar" style={{ height: `${(d.hours / maxHours) * 100}%` }}>
                                        <span className="progress-chart-value">{d.hours}h</span>
                                    </div>
                                </div>
                                <span className="progress-chart-label">{d.day}</span>
                            </div>
                        ))}
                    </div>
                    <div className="progress-chart-summary">
                        <span><TrendingUp size={14} /> Total: {weeklyData.reduce((s, d) => s + d.hours, 0)}h this week</span>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="progress-section animate-fade-in delay-300">
                    <h3><Calendar size={18} /> Recent Activity</h3>
                    <div className="progress-activity-list">
                        {recentActivity.map((a, i) => (
                            <div key={i} className="progress-activity-item">
                                <span className="progress-activity-icon">{a.icon}</span>
                                <div className="progress-activity-info">
                                    <span className="progress-activity-title">{a.title}</span>
                                    <span className="progress-activity-time">{a.time}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Subject Mastery */}
            <div className="progress-section animate-fade-in delay-400">
                <h3><Target size={18} /> Subject Mastery</h3>
                <div className="progress-mastery-list">
                    {subjectMastery.map((s, i) => (
                        <div key={i} className="progress-mastery-item">
                            <div className="progress-mastery-info">
                                <div className="progress-mastery-color" style={{ background: s.color }} />
                                <span className="progress-mastery-name">{s.subject}</span>
                            </div>
                            <div className="progress-mastery-bar-wrapper">
                                <div className="progress-bar" style={{ flex: 1 }}>
                                    <div className="progress-bar-fill" style={{ width: `${s.progress}%`, background: s.color }} />
                                </div>
                                <span className="progress-mastery-pct">{s.progress}%</span>
                            </div>
                            <div className="progress-mastery-stats">
                                <span>Quiz Avg: {s.quizAvg}%</span>
                                <span>Time: {s.time}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
