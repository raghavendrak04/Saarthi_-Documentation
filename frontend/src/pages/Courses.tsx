import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Search, Filter, Grid3X3, List, BookOpen, Clock, Users, Star,
    ChevronDown, Plus, Edit3, Trash2, X, Save, BarChart3
} from 'lucide-react';
import { useAuthStore } from '../stores/auth.store';
import './Courses.css';

interface CourseItem {
    id: string;
    title: string;
    code: string;
    instructor: string;
    category: string;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    duration: string;
    lessons: number;
    rating: number;
    students: number;
    progress: number;
    thumbnail: string;
    description: string;
}

const defaultCourses: CourseItem[] = [
    { id: '1', title: 'Digital Signal Processing', code: 'EC301', instructor: 'Dr. Sharma', category: 'Electronics', difficulty: 'Advanced', duration: '16 weeks', lessons: 48, rating: 4.8, students: 245, progress: 65, thumbnail: '📡', description: 'Complete DSP course covering sampling, transforms, and filter design.' },
    { id: '2', title: 'Machine Learning Fundamentals', code: 'CS401', instructor: 'Prof. Kumar', category: 'Computer Science', difficulty: 'Intermediate', duration: '14 weeks', lessons: 42, rating: 4.9, students: 320, progress: 40, thumbnail: '🤖', description: 'Introduction to ML algorithms, neural networks, and practical applications.' },
    { id: '3', title: 'Data Structures & Algorithms', code: 'CS201', instructor: 'Dr. Patel', category: 'Computer Science', difficulty: 'Intermediate', duration: '12 weeks', lessons: 36, rating: 4.7, students: 410, progress: 80, thumbnail: '🌳', description: 'Master fundamental data structures and algorithm design techniques.' },
    { id: '4', title: 'Web Development Bootcamp', code: 'CS301', instructor: 'Prof. Singh', category: 'Computer Science', difficulty: 'Beginner', duration: '10 weeks', lessons: 30, rating: 4.6, students: 520, progress: 25, thumbnail: '🌐', description: 'Full-stack web development with HTML, CSS, JavaScript, React, and Node.js.' },
    { id: '5', title: 'Control Systems', code: 'EC302', instructor: 'Dr. Gupta', category: 'Electronics', difficulty: 'Advanced', duration: '14 weeks', lessons: 40, rating: 4.5, students: 180, progress: 0, thumbnail: '⚙️', description: 'Classical and modern control system theory with MATLAB simulations.' },
    { id: '6', title: 'Linear Algebra', code: 'MA201', instructor: 'Prof. Joshi', category: 'Mathematics', difficulty: 'Beginner', duration: '8 weeks', lessons: 24, rating: 4.4, students: 380, progress: 100, thumbnail: '📐', description: 'Vectors, matrices, eigenvalues, and applications to engineering problems.' },
];

const categories = ['All', 'Computer Science', 'Electronics', 'Mathematics'];
const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

export default function CoursesPage() {
    const { user } = useAuthStore();
    const isAdmin = user?.role === 'admin';

    const [courses, setCourses] = useState<CourseItem[]>(defaultCourses);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('All');
    const [difficulty, setDifficulty] = useState('All');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [showFilters, setShowFilters] = useState(false);
    const navigate = useNavigate();

    // Modal state
    const [showModal, setShowModal] = useState(false);
    const [editingCourse, setEditingCourse] = useState<CourseItem | null>(null);
    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

    // Form state
    const [formData, setFormData] = useState<Partial<CourseItem>>({});

    const filtered = courses.filter((c) => {
        const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) || c.code.toLowerCase().includes(search.toLowerCase());
        const matchCat = category === 'All' || c.category === category;
        const matchDiff = difficulty === 'All' || c.difficulty === difficulty;
        return matchSearch && matchCat && matchDiff;
    });

    const diffColor = (d: string) => {
        if (d === 'Beginner') return 'var(--success)';
        if (d === 'Intermediate') return 'var(--warning)';
        return 'var(--error)';
    };

    // Admin CRUD
    const openCreate = () => {
        setEditingCourse(null);
        setFormData({ title: '', code: '', instructor: '', category: 'Computer Science', difficulty: 'Beginner', duration: '', lessons: 0, description: '', thumbnail: '📚' });
        setShowModal(true);
    };

    const openEdit = (course: CourseItem) => {
        setEditingCourse(course);
        setFormData({ ...course });
        setShowModal(true);
    };

    const handleSave = () => {
        if (editingCourse) {
            setCourses((prev) => prev.map((c) => (c.id === editingCourse.id ? { ...c, ...formData } as CourseItem : c)));
        } else {
            const newCourse: CourseItem = {
                id: Date.now().toString(),
                title: formData.title || 'New Course',
                code: formData.code || 'NEW101',
                instructor: formData.instructor || user?.name || 'Instructor',
                category: formData.category || 'Computer Science',
                difficulty: (formData.difficulty as CourseItem['difficulty']) || 'Beginner',
                duration: formData.duration || '12 weeks',
                lessons: formData.lessons || 0,
                rating: 0,
                students: 0,
                progress: 0,
                thumbnail: formData.thumbnail || '📚',
                description: formData.description || '',
            };
            setCourses((prev) => [newCourse, ...prev]);
        }
        setShowModal(false);
    };

    const handleDelete = (id: string) => {
        setCourses((prev) => prev.filter((c) => c.id !== id));
        setDeleteConfirm(null);
    };

    return (
        <div className="courses-page">
            {/* Header */}
            <div className="courses-header">
                <div>
                    <h1>Courses</h1>
                    <p>{isAdmin ? 'Manage and create courses' : 'Browse and enroll in courses'}</p>
                </div>
                {isAdmin && (
                    <button className="btn btn-primary" onClick={openCreate}>
                        <Plus size={18} /> Create Course
                    </button>
                )}
            </div>

            {/* Toolbar */}
            <div className="courses-toolbar">
                <div className="courses-search">
                    <Search size={18} />
                    <input placeholder="Search courses..." value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
                <div className="courses-toolbar-right">
                    <button className={`courses-filter-toggle ${showFilters ? 'active' : ''}`} onClick={() => setShowFilters(!showFilters)}>
                        <Filter size={16} /> Filters <ChevronDown size={14} />
                    </button>
                    <div className="courses-view-toggle">
                        <button className={viewMode === 'grid' ? 'active' : ''} onClick={() => setViewMode('grid')}><Grid3X3 size={16} /></button>
                        <button className={viewMode === 'list' ? 'active' : ''} onClick={() => setViewMode('list')}><List size={16} /></button>
                    </div>
                </div>
            </div>

            {/* Filters */}
            {showFilters && (
                <div className="courses-filters animate-fade-in">
                    <div className="courses-filter-group">
                        <label>Category</label>
                        <select value={category} onChange={(e) => setCategory(e.target.value)}>
                            {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>
                    <div className="courses-filter-group">
                        <label>Difficulty</label>
                        <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                            {difficulties.map((d) => <option key={d} value={d}>{d}</option>)}
                        </select>
                    </div>
                    <span className="courses-result-count">{filtered.length} courses found</span>
                </div>
            )}

            {/* Grid / List */}
            <div className={`courses-grid ${viewMode}`}>
                {filtered.map((course) => (
                    <div key={course.id} className={`course-card ${viewMode}`} onClick={() => navigate(`/courses/${course.id}`)} style={{ cursor: 'pointer' }}>
                        <div className="course-card-thumb">
                            <span className="course-card-emoji">{course.thumbnail}</span>
                            <span className="course-card-badge" style={{ background: diffColor(course.difficulty) }}>{course.difficulty}</span>
                        </div>
                        <div className="course-card-body">
                            <div className="course-card-top">
                                <span className="course-card-code">{course.code}</span>
                                <div className="course-card-rating"><Star size={12} fill="var(--warning)" stroke="var(--warning)" /> {course.rating}</div>
                            </div>
                            <h3 className="course-card-title">{course.title}</h3>
                            <p className="course-card-instructor">{course.instructor}</p>
                            {viewMode === 'list' && <p className="course-card-desc">{course.description}</p>}
                            <div className="course-card-meta">
                                <span><BookOpen size={14} /> {course.lessons} lessons</span>
                                <span><Clock size={14} /> {course.duration}</span>
                                <span><Users size={14} /> {course.students}</span>
                            </div>
                            {/* Progress bar for students */}
                            {!isAdmin && course.progress > 0 && (
                                <div className="course-card-progress">
                                    <div className="course-card-progress-bar">
                                        <div className="course-card-progress-fill" style={{ width: `${course.progress}%` }} />
                                    </div>
                                    <span>{course.progress}%</span>
                                </div>
                            )}
                            {/* Student stats for admin */}
                            {isAdmin && (
                                <div className="course-card-admin-stats">
                                    <span><BarChart3 size={14} /> {course.students} enrolled</span>
                                    <span>⭐ {course.rating}/5</span>
                                </div>
                            )}
                            <div className="course-card-footer">
                                {isAdmin ? (
                                    <div className="course-card-admin-actions">
                                        <button className="btn btn-outline btn-sm" onClick={() => openEdit(course)}><Edit3 size={14} /> Edit</button>
                                        {deleteConfirm === course.id ? (
                                            <div className="course-card-delete-confirm">
                                                <span>Delete?</span>
                                                <button className="btn btn-sm" style={{ background: 'var(--error)', color: 'white' }} onClick={() => handleDelete(course.id)}>Yes</button>
                                                <button className="btn btn-outline btn-sm" onClick={() => setDeleteConfirm(null)}>No</button>
                                            </div>
                                        ) : (
                                            <button className="btn btn-outline btn-sm" style={{ borderColor: 'var(--error)', color: 'var(--error)' }} onClick={() => setDeleteConfirm(course.id)}><Trash2 size={14} /> Delete</button>
                                        )}
                                    </div>
                                ) : (
                                    <button className="btn btn-primary btn-sm">
                                        {course.progress > 0 ? 'Continue' : 'Enroll'}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filtered.length === 0 && (
                <div className="courses-empty">
                    <BookOpen size={48} />
                    <h3>No courses found</h3>
                    <p>Try adjusting your search or filters</p>
                </div>
            )}

            {/* Create / Edit Modal */}
            {showModal && (
                <div className="course-modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="course-modal animate-scale-in" onClick={(e) => e.stopPropagation()}>
                        <div className="course-modal-header">
                            <h2>{editingCourse ? 'Edit Course' : 'Create New Course'}</h2>
                            <button className="course-modal-close" onClick={() => setShowModal(false)}><X size={20} /></button>
                        </div>
                        <div className="course-modal-body">
                            <div className="course-modal-field">
                                <label>Course Title *</label>
                                <input className="input" placeholder="e.g. Machine Learning Fundamentals" value={formData.title || ''} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
                            </div>
                            <div className="course-modal-row">
                                <div className="course-modal-field">
                                    <label>Course Code *</label>
                                    <input className="input" placeholder="e.g. CS401" value={formData.code || ''} onChange={(e) => setFormData({ ...formData, code: e.target.value })} />
                                </div>
                                <div className="course-modal-field">
                                    <label>Emoji Icon</label>
                                    <input className="input" value={formData.thumbnail || ''} onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })} />
                                </div>
                            </div>
                            <div className="course-modal-row">
                                <div className="course-modal-field">
                                    <label>Category</label>
                                    <select className="input" value={formData.category || ''} onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
                                        {categories.filter(c => c !== 'All').map((c) => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>
                                <div className="course-modal-field">
                                    <label>Difficulty</label>
                                    <select className="input" value={formData.difficulty || ''} onChange={(e) => setFormData({ ...formData, difficulty: e.target.value as CourseItem['difficulty'] })}>
                                        {difficulties.filter(d => d !== 'All').map((d) => <option key={d} value={d}>{d}</option>)}
                                    </select>
                                </div>
                            </div>
                            <div className="course-modal-row">
                                <div className="course-modal-field">
                                    <label>Instructor</label>
                                    <input className="input" placeholder="e.g. Dr. Sharma" value={formData.instructor || ''} onChange={(e) => setFormData({ ...formData, instructor: e.target.value })} />
                                </div>
                                <div className="course-modal-field">
                                    <label>Duration</label>
                                    <input className="input" placeholder="e.g. 12 weeks" value={formData.duration || ''} onChange={(e) => setFormData({ ...formData, duration: e.target.value })} />
                                </div>
                            </div>
                            <div className="course-modal-field">
                                <label>Number of Lessons</label>
                                <input className="input" type="number" value={formData.lessons || 0} onChange={(e) => setFormData({ ...formData, lessons: parseInt(e.target.value) || 0 })} />
                            </div>
                            <div className="course-modal-field">
                                <label>Description</label>
                                <textarea className="input" rows={3} placeholder="Course description..." value={formData.description || ''} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
                            </div>
                        </div>
                        <div className="course-modal-footer">
                            <button className="btn btn-outline" onClick={() => setShowModal(false)}>Cancel</button>
                            <button className="btn btn-primary" onClick={handleSave}>
                                <Save size={16} /> {editingCourse ? 'Update Course' : 'Create Course'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
