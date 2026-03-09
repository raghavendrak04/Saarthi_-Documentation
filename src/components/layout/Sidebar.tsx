import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
    LayoutDashboard, BookOpen, MessageSquare, Code2, FlaskConical,
    BarChart3, Settings, ChevronLeft, ChevronRight,
    GraduationCap, Eye
} from 'lucide-react';
import './Sidebar.css';
import { LogoIcon } from '../LogoIcon';

const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/courses', label: 'My Courses', icon: BookOpen },
    { path: '/chat', label: 'AI Tutor Chat', icon: MessageSquare, badge: 'AI' },
    { path: '/quiz', label: 'Exam Practice', icon: GraduationCap },
    { path: '/code-lab', label: 'Coding Lab', icon: Code2 },
    { path: '/videos', label: 'Video Library', icon: Eye },
    { path: '/progress', label: 'Analytics', icon: BarChart3 },
    { path: '/notes', label: 'Study Notes', icon: FlaskConical },
];

const bottomItems = [
    { path: '/settings', label: 'Settings', icon: Settings },
];

export default function Sidebar() {
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();

    return (
        <aside className={`sidebar ${collapsed ? 'sidebar-collapsed' : ''}`}>
            {/* Brand */}
            <div className="sidebar-brand">
                <div className="sidebar-logo">
                    <LogoIcon size={24} />
                </div>
                {!collapsed && <span className="sidebar-brand-text">Saarthi.ai</span>}
                <button
                    className="sidebar-toggle"
                    onClick={() => setCollapsed(!collapsed)}
                    aria-label="Toggle sidebar"
                >
                    {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
                </button>
            </div>

            {/* Navigation */}
            <nav className="sidebar-nav">
                <div className="sidebar-nav-group">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname.startsWith(item.path);
                        return (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={`sidebar-link ${isActive ? 'active' : ''}`}
                                title={collapsed ? item.label : undefined}
                            >
                                <Icon size={20} />
                                {!collapsed && <span>{item.label}</span>}
                                {!collapsed && item.badge && (
                                    <span className="sidebar-badge">{item.badge}</span>
                                )}
                            </NavLink>
                        );
                    })}
                </div>

                {/* Bottom nav */}
                <div className="sidebar-nav-bottom">
                    {!collapsed && (
                        <div className="sidebar-study-card">
                            <div className="sidebar-study-icon">🔥</div>
                            <div>
                                <p className="sidebar-study-title">5 Day Streak!</p>
                                <p className="sidebar-study-sub">Keep learning daily</p>
                            </div>
                        </div>
                    )}
                    {bottomItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname.startsWith(item.path);
                        return (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={`sidebar-link ${isActive ? 'active' : ''}`}
                                title={collapsed ? item.label : undefined}
                            >
                                <Icon size={20} />
                                {!collapsed && <span>{item.label}</span>}
                            </NavLink>
                        );
                    })}
                </div>
            </nav>
        </aside>
    );
}
