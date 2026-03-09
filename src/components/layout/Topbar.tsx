import { useState } from 'react';
import { Search, Bell, ChevronDown, Menu, LogOut, User, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/auth.store';
import { getInitials } from '../../lib/utils';
import './Topbar.css';

export default function Topbar() {
    const [showProfile, setShowProfile] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const { user, logout } = useAuthStore();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header className="topbar">
            <div className="topbar-left">
                <button className="topbar-menu-btn" aria-label="Menu">
                    <Menu size={20} />
                </button>
            </div>

            {/* Search */}
            <div className="topbar-search">
                <Search size={18} className="topbar-search-icon" />
                <input
                    type="text"
                    placeholder="Search courses, topics, questions... (Ctrl+K)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="topbar-search-input"
                />
                <kbd className="topbar-search-kbd">⌘K</kbd>
            </div>

            {/* Right Actions */}
            <div className="topbar-actions">
                {/* Notifications */}
                <button className="topbar-icon-btn" aria-label="Notifications">
                    <Bell size={20} />
                    <span className="topbar-notif-badge">3</span>
                </button>

                {/* Profile Dropdown */}
                <div className="topbar-profile-wrapper">
                    <button
                        className="topbar-profile"
                        onClick={() => setShowProfile(!showProfile)}
                    >
                        <div className="avatar avatar-md">
                            {user?.avatar ? (
                                <img src={user.avatar} alt={user.name} />
                            ) : (
                                getInitials(user?.name || 'Student')
                            )}
                        </div>
                        <div className="topbar-profile-info">
                            <span className="topbar-profile-name">{user?.name || 'Student'}</span>
                            <span className="topbar-profile-role">{user?.role || 'Student'}</span>
                        </div>
                        <ChevronDown size={16} />
                    </button>

                    {showProfile && (
                        <div className="topbar-dropdown animate-scale-in">
                            <div className="topbar-dropdown-header">
                                <div className="avatar avatar-lg">
                                    {getInitials(user?.name || 'Student')}
                                </div>
                                <div>
                                    <p className="topbar-dropdown-name">{user?.name || 'Student'}</p>
                                    <p className="topbar-dropdown-email">{user?.email || 'student@university.edu'}</p>
                                </div>
                            </div>
                            <div className="topbar-dropdown-divider" />
                            <button className="topbar-dropdown-item" onClick={() => { navigate('/settings'); setShowProfile(false); }}>
                                <User size={16} /> Profile
                            </button>
                            <button className="topbar-dropdown-item" onClick={() => { navigate('/settings'); setShowProfile(false); }}>
                                <Settings size={16} /> Settings
                            </button>
                            <div className="topbar-dropdown-divider" />
                            <button className="topbar-dropdown-item topbar-dropdown-danger" onClick={handleLogout}>
                                <LogOut size={16} /> Sign Out
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
