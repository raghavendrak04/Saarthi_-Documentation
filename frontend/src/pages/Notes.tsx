import { useState } from 'react';
import { Search, Plus, FileText, Clock, Tag, BookOpen, Star, MoreVertical, Grid, List } from 'lucide-react';
import './Notes.css';

const notes = [
    { id: 1, title: 'Fourier Transform Summary', course: 'Digital Signal Processing', content: 'The Fourier Transform decomposes a signal into its frequency components. Key properties include linearity, time shifting, frequency shifting, and convolution theorem...', tags: ['DSP', 'Fourier', 'Transforms'], updated: '2 hours ago', starred: true },
    { id: 2, title: 'Neural Network Architecture', course: 'Machine Learning', content: 'A neural network consists of input layer, hidden layers, and output layer. Each neuron applies activation function like ReLU, Sigmoid, or Tanh...', tags: ['ML', 'Neural Networks', 'Deep Learning'], updated: '5 hours ago', starred: false },
    { id: 3, title: 'Binary Tree Operations', course: 'Data Structures', content: 'Common operations: Insert O(log n), Delete O(log n), Search O(log n). Traversals: Inorder, Preorder, Postorder, Level-order...', tags: ['Trees', 'BST', 'Algorithms'], updated: 'Yesterday', starred: true },
    { id: 4, title: 'Z-Transform Properties', course: 'Digital Signal Processing', content: 'Z-Transform is used for analysis of discrete-time LTI systems. ROC determines system stability. Key properties include linearity, time delay...', tags: ['DSP', 'Z-Transform'], updated: 'Yesterday', starred: false },
    { id: 5, title: 'Gradient Descent Variants', course: 'Machine Learning', content: 'Batch GD, Stochastic GD, Mini-batch GD. Advanced optimizers: Adam, RMSprop, Adagrad. Learning rate scheduling strategies...', tags: ['ML', 'Optimization'], updated: '2 days ago', starred: false },
    { id: 6, title: 'Graph Algorithms Cheatsheet', course: 'Data Structures', content: 'BFS: O(V+E) uses queue. DFS: O(V+E) uses stack. Dijkstra: O(V²) or O(E log V) with heap. Bellman-Ford: O(VE)...', tags: ['Graphs', 'Algorithms'], updated: '3 days ago', starred: true },
];

export default function NotesPage() {
    const [search, setSearch] = useState('');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    const filtered = notes.filter((n) =>
        n.title.toLowerCase().includes(search.toLowerCase()) ||
        n.course.toLowerCase().includes(search.toLowerCase()) ||
        n.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
    );

    return (
        <div className="notes-page">
            <div className="notes-header animate-fade-in">
                <div>
                    <h1>Study Notes</h1>
                    <p>Your organized collection of study materials</p>
                </div>
                <div className="notes-header-actions">
                    <div className="courses-view-toggle">
                        <button className={`btn btn-icon ${viewMode === 'grid' ? 'active' : ''}`} onClick={() => setViewMode('grid')}><Grid size={18} /></button>
                        <button className={`btn btn-icon ${viewMode === 'list' ? 'active' : ''}`} onClick={() => setViewMode('list')}><List size={18} /></button>
                    </div>
                    <button className="btn btn-primary"><Plus size={16} /> New Note</button>
                </div>
            </div>

            <div className="notes-search animate-fade-in delay-100">
                <div className="courses-search" style={{ maxWidth: '400px' }}>
                    <Search size={18} />
                    <input type="text" placeholder="Search notes by title, course, or tag..." value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
            </div>

            <div className={`notes-grid ${viewMode === 'list' ? 'notes-list-view' : ''} animate-fade-in delay-200`}>
                {filtered.map((note) => (
                    <div key={note.id} className="note-card">
                        <div className="note-card-header">
                            <FileText size={18} style={{ color: 'var(--primary)' }} />
                            <button className="note-star-btn">
                                <Star size={16} fill={note.starred ? '#F59E0B' : 'none'} color={note.starred ? '#F59E0B' : 'var(--gray-400)'} />
                            </button>
                        </div>
                        <h3 className="note-card-title">{note.title}</h3>
                        <p className="note-card-course"><BookOpen size={13} /> {note.course}</p>
                        <p className="note-card-preview">{note.content}</p>
                        <div className="note-card-tags">
                            {note.tags.map((tag) => (
                                <span key={tag} className="note-tag"><Tag size={10} /> {tag}</span>
                            ))}
                        </div>
                        <div className="note-card-footer">
                            <span><Clock size={12} /> {note.updated}</span>
                            <button className="note-more-btn"><MoreVertical size={14} /></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
