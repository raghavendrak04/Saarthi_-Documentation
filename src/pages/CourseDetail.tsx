import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    ArrowLeft, Plus, FileText, Video, BookOpen, Trash2, X, Save, Paperclip,
    Link as LinkIcon, Heading, Pencil, ExternalLink, Send, Sparkles, Users
} from 'lucide-react';
import { useAuthStore } from '../stores/auth.store';
import { api, uploadFile, getUploadFullUrl, getMaterialFileUrl, type CourseResponse, type PaginatedResponse, type AssignmentResponse, type MaterialResponse, type StreamItemResponse, type CoursePersonResponse } from '../lib/api';
import Pagination from '../components/Pagination';
import FileDropzone from '../components/FileDropzone';
import ConfirmModal from '../components/ConfirmModal';
import EmptyState from '../components/EmptyState';
import { useToast } from '../components/Toast';
import './CourseDetail.css';

const PAGE_SIZE = 20;

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

type DocChatMessage = { role: 'user' | 'assistant'; content: string };

const tabs = [
    { id: 'stream', label: 'Stream' },
    { id: 'classwork', label: 'Classwork' },
    { id: 'people', label: 'People' },
];

type ModalType = 'assignment' | 'material' | 'video' | 'topic' | null;

function mapAssignment(a: AssignmentResponse): Assignment {
    return {
        id: a.id,
        title: a.title,
        description: a.description ?? '',
        dueDate: a.dueDate,
        points: a.points,
        status: 'pending',
        attachments: a.attachments ? [a.attachments] : [],
        createdAt: a.createdAt,
        topic: a.topic ?? 'No topic',
    };
}

function mapMaterial(m: MaterialResponse): Material {
    return {
        id: m.id,
        title: m.title,
        description: m.description ?? '',
        type: m.type as Material['type'],
        url: m.url,
        createdAt: m.createdAt,
        topic: m.topic ?? 'No topic',
    };
}

function mapStreamItem(s: StreamItemResponse): StreamItem {
    return {
        id: s.id,
        type: (s.type as StreamItem['type']) || 'announcement',
        title: s.title ?? '',
        description: s.description,
        createdAt: s.createdAt,
        author: s.author,
    };
}

export default function CourseDetailPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { user } = useAuthStore();
    const toast = useToast();
    const isAdmin = user?.role === 'admin';
    const isInstructor = isAdmin || user?.role === 'teacher';
    const courseId = id ?? '';

    const [course, setCourse] = useState<CourseResponse | null>(null);
    const [courseLoading, setCourseLoading] = useState(true);
    const [courseError, setCourseError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState('stream');
    const [assignments, setAssignments] = useState<Assignment[]>([]);
    const [, setAssignmentsTotal] = useState(0);
    const [assignmentsOffset] = useState(0);
    const [materials, setMaterials] = useState<Material[]>([]);
    const [, setMaterialsTotal] = useState(0);
    const [materialsOffset] = useState(0);
    const [stream, setStream] = useState<StreamItem[]>([]);
    const [streamTotal, setStreamTotal] = useState(0);
    const [streamOffset, setStreamOffset] = useState(0);
    const [people, setPeople] = useState<CoursePersonResponse[]>([]);
    const [peopleTotal, setPeopleTotal] = useState(0);
    const [peopleOffset, setPeopleOffset] = useState(0);
    const [videos, setVideos] = useState<VideoLecture[]>([]);
    const [topics, setTopics] = useState<string[]>(['Course Materials', 'Class Work', 'Projects', 'Video Lectures', 'Post Exam - Solutions']);

    const courseDisplay = course ? { title: course.title, code: course.code, instructor: course.instructor, emoji: course.thumbnailEmoji || '📚', color: course.color || '#3f4244' } : { title: '…', code: '', instructor: '', emoji: '📚', color: '#3f4244' };
    const userName = user?.name || (isInstructor ? courseDisplay.instructor : 'Student');

    useEffect(() => {
        if (!courseId) return;
        let cancelled = false;
        setCourseLoading(true);
        setCourseError(null);
        api.get<CourseResponse>(`/courses/${courseId}`)
            .then((c) => { if (!cancelled) setCourse(c); })
            .catch((e) => { if (!cancelled) setCourseError(e instanceof Error ? e.message : 'Course not found'); })
            .finally(() => { if (!cancelled) setCourseLoading(false); });
        return () => { cancelled = true; };
    }, [courseId]);

    useEffect(() => {
        if (!courseId) return;
        let cancelled = false;
        api.get<PaginatedResponse<AssignmentResponse>>(`/courses/${courseId}/assignments`, { limit: PAGE_SIZE, offset: assignmentsOffset })
            .then((r) => { if (!cancelled) { setAssignments((r.items || []).map(mapAssignment)); setAssignmentsTotal(r.total ?? 0); } })
            .catch(() => { if (!cancelled) setAssignments([]); });
        return () => { cancelled = true; };
    }, [courseId, assignmentsOffset]);

    useEffect(() => {
        if (!courseId) return;
        let cancelled = false;
        api.get<PaginatedResponse<MaterialResponse>>(`/courses/${courseId}/materials`, { limit: PAGE_SIZE, offset: materialsOffset })
            .then((r) => { if (!cancelled) { setMaterials((r.items || []).map(mapMaterial)); setMaterialsTotal(r.total ?? 0); } })
            .catch(() => { if (!cancelled) setMaterials([]); });
        return () => { cancelled = true; };
    }, [courseId, materialsOffset]);

    useEffect(() => {
        if (!courseId) return;
        let cancelled = false;
        api.get<PaginatedResponse<StreamItemResponse>>(`/courses/${courseId}/stream`, { limit: PAGE_SIZE, offset: streamOffset })
            .then((r) => { if (!cancelled) { setStream((r.items || []).map(mapStreamItem)); setStreamTotal(r.total ?? 0); } })
            .catch(() => { if (!cancelled) setStream([]); });
        return () => { cancelled = true; };
    }, [courseId, streamOffset]);

    useEffect(() => {
        if (!courseId || activeTab !== 'people') return;
        let cancelled = false;
        api.get<PaginatedResponse<CoursePersonResponse>>(`/courses/${courseId}/people`, { limit: PAGE_SIZE, offset: peopleOffset })
            .then((r) => { if (!cancelled) { setPeople(r.items || []); setPeopleTotal(r.total ?? 0); } })
            .catch(() => { if (!cancelled) setPeople([]); });
        return () => { cancelled = true; };
    }, [courseId, activeTab, peopleOffset]);

    const handleSubmitAssignment = async () => {
        if (!courseId || !submitAssignmentId) return;
        setSubmitting(true);
        try {
            let attachmentUrl: string | undefined;
            if (submitFile) {
                const { url } = await uploadFile(submitFile);
                attachmentUrl = url;
            }
            await api.post(`/courses/${courseId}/assignments/${submitAssignmentId}/submit`, { attachmentUrl });
            setAssignments((prev) => prev.map((a) => (a.id === submitAssignmentId ? { ...a, status: 'submitted' as const } : a)));
            setSubmitAssignmentId(null);
            setSubmitFile(null);
            toast.showToast('Assignment submitted');
        } catch (e) {
            toast.showToast(e instanceof Error ? e.message : 'Submit failed', 'error');
        } finally {
            setSubmitting(false);
        }
    };

    // Compose Annoucnement
    const [isComposing, setIsComposing] = useState(false);
    const [announcementText, setAnnouncementText] = useState('');

    // Modal
    const [modalType, setModalType] = useState<ModalType>(null);
    const [editItem, setEditItem] = useState<any>(null);
    const [formData, setFormData] = useState<any>({});
    const [createMenuOpen, setCreateMenuOpen] = useState(false);
    const [submitAssignmentId, setSubmitAssignmentId] = useState<string | null>(null);
    const [submitFile, setSubmitFile] = useState<File | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const [viewingMaterial, setViewingMaterial] = useState<Material | null>(null);
    const [savingMaterial, setSavingMaterial] = useState(false);
    const [deletingMaterialId, setDeletingMaterialId] = useState<string | null>(null);
    const [materialToDelete, setMaterialToDelete] = useState<Material | null>(null);
    const [materialFormError, setMaterialFormError] = useState<string | null>(null);
    const [docChatMessages, setDocChatMessages] = useState<DocChatMessage[]>([]);
    const [docChatInput, setDocChatInput] = useState('');
    const [docChatSending, setDocChatSending] = useState(false);
    const [docPdfObjectUrl, setDocPdfObjectUrl] = useState<string | null>(null);
    const [docPdfError, setDocPdfError] = useState<string | null>(null);
    const [docPdfLoading, setDocPdfLoading] = useState(false);

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
        setMaterialFormError(null);
        if (item) {
            setFormData({ ...item });
        } else {
            if (type === 'assignment') setFormData({ title: '', description: '', dueDate: '', points: 100, attachments: [], topic: topics[0] || '' });
            if (type === 'material') setFormData({ title: '', description: '', type: 'pdf', url: '', topic: topics[0] || '' });
            if (type === 'video') setFormData({ title: '', description: '', duration: '', url: '', topic: topics[0] || '' });
            if (type === 'topic') setFormData({ title: '' });
        }
    };

    const handleSave = async () => {
        const now = new Date().toISOString().split('T')[0];
        if (modalType === 'topic') {
            if (formData.title && !topics.includes(formData.title)) {
                setTopics([...topics, formData.title]);
            }
            setModalType(null);
            return;
        }
        if (modalType === 'material' && courseId) {
            setMaterialFormError(null);
            if (!formData.title?.trim()) {
                setMaterialFormError('Title is required.');
                return;
            }
            if (!formData.url?.trim()) {
                setMaterialFormError('Please upload a file or enter a URL.');
                return;
            }
            setSavingMaterial(true);
            try {
                const payload = {
                    title: formData.title.trim(),
                    description: formData.description?.trim() || undefined,
                    type: formData.type || 'pdf',
                    url: formData.url.trim(),
                    topic: formData.topic || undefined,
                };
                if (editItem) {
                    const updated = await api.patch<MaterialResponse>(`/courses/${courseId}/materials/${editItem.id}`, payload);
                    setMaterials((prev) => prev.map((m) => (m.id === editItem.id ? mapMaterial(updated) : m)));
                } else {
                    const created = await api.post<MaterialResponse>(`/courses/${courseId}/materials`, payload);
                    setMaterials((prev) => [mapMaterial(created), ...prev]);
                    setMaterialsTotal((t) => t + 1);
                    setStream((prev) => [{ id: created.id, type: 'material', title: `${userName} posted a new material:`, description: formData.title, createdAt: now, author: userName }, ...prev]);
                }
                setModalType(null);
                setMaterialFormError(null);
            } catch (e) {
                setMaterialFormError(e instanceof Error ? e.message : 'Failed to save material.');
            } finally {
                setSavingMaterial(false);
            }
            return;
        }
        if (modalType === 'assignment') {
            if (editItem) {
                setAssignments((prev) => prev.map((a) => (a.id === editItem.id ? { ...a, ...formData } : a)));
            } else {
                const newA: Assignment = { id: Date.now().toString(), ...formData, status: 'pending', createdAt: now };
                setAssignments((prev) => [newA, ...prev]);
                setStream((prev) => [{ id: Date.now().toString(), type: 'assignment', title: `${userName} posted a new assignment:`, description: formData.title, createdAt: now, author: userName }, ...prev]);
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

    useEffect(() => {
        if (viewingMaterial) {
            setDocChatMessages([]);
            setDocChatInput('');
        }
    }, [viewingMaterial?.id]);

    const isPdfMaterial = (m: Material) => m.type === 'pdf' || (m.url && /\.pdf$/i.test(m.url));

    useEffect(() => {
        if (!viewingMaterial || !courseId || !isPdfMaterial(viewingMaterial)) {
            setDocPdfObjectUrl((prev) => {
                if (prev) URL.revokeObjectURL(prev);
                return null;
            });
            setDocPdfError(null);
            setDocPdfLoading(false);
            return;
        }
        const url = getMaterialFileUrl(courseId, viewingMaterial.id);
        setDocPdfError(null);
        setDocPdfLoading(true);
        setDocPdfObjectUrl((prev) => {
            if (prev) URL.revokeObjectURL(prev);
            return null;
        });
        fetch(url, { credentials: 'include' })
            .then((res) => {
                if (!res.ok) throw new Error(res.status === 401 || res.status === 403 ? 'Please sign in again to view this file.' : `Could not load file (${res.status}).`);
                return res.blob();
            })
            .then((blob) => {
                setDocPdfObjectUrl(URL.createObjectURL(blob));
                setDocPdfError(null);
            })
            .catch((e) => {
                setDocPdfError(e instanceof Error ? e.message : 'Failed to load PDF.');
            })
            .finally(() => setDocPdfLoading(false));
        return () => {
            setDocPdfObjectUrl((prev) => {
                if (prev) URL.revokeObjectURL(prev);
                return null;
            });
        };
    }, [viewingMaterial?.id, courseId, viewingMaterial?.type, viewingMaterial?.url]);

    const sendDocChatMessage = async () => {
        if (!viewingMaterial || !docChatInput.trim() || docChatSending) return;
        const userContent = docChatInput.trim();
        setDocChatInput('');
        setDocChatMessages((prev) => [...prev, { role: 'user', content: userContent }]);
        setDocChatSending(true);
        try {
            const data = await api.post<{ response: string }>('/chat/message', {
                message: userContent,
                conversationHistory: docChatMessages,
                contextMaterialTitle: viewingMaterial.title,
            });
            setDocChatMessages((prev: DocChatMessage[]) => [...prev, { role: 'assistant', content: data.response }]);
        } catch (e) {
            setDocChatMessages((prev: DocChatMessage[]) => [...prev, { role: 'assistant', content: (e instanceof Error ? e.message : 'Something went wrong. Please try again.') }]);
        } finally {
            setDocChatSending(false);
        }
    };

    const handleDeleteMaterialClick = (material: Material) => {
        setMaterialToDelete(material);
    };

    const handleDeleteMaterialConfirm = async () => {
        if (!courseId || !materialToDelete) return;
        setDeletingMaterialId(materialToDelete.id);
        try {
            await api.delete(`/courses/${courseId}/materials/${materialToDelete.id}`);
            setMaterials((prev) => prev.filter((m) => m.id !== materialToDelete.id));
            setMaterialsTotal((t) => Math.max(0, t - 1));
            setMaterialToDelete(null);
        } catch (e) {
            setMaterialFormError(e instanceof Error ? e.message : 'Failed to delete material.');
        } finally {
            setDeletingMaterialId(null);
        }
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

    if (courseLoading && !course) {
        return <div className="cd-page"><div className="cd-loading">Loading course…</div></div>;
    }
    if (courseError || (!courseLoading && courseId && !course)) {
        return (
            <div className="cd-page">
                <div className="cd-error">
                    {courseError || 'Course not found'}
                    <button className="btn btn-outline btn-sm" onClick={() => navigate('/courses')}>Back to Courses</button>
                </div>
            </div>
        );
    }

    return (
        <div className="cd-page">
            {/* Tabs matching Classroom look */}
            <div className="cd-tabs-wrapper">
                <button className="cd-back-btn" onClick={() => navigate('/courses')}>
                    <ArrowLeft size={20} />
                </button>
                <div className="cd-cr-tabs">
                    {tabs.map((tab) => (
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
                        <div className="cd-cr-banner" style={{ backgroundColor: courseDisplay.color }}>
                            <div className="cd-cr-banner-content">
                                <h1>{courseDisplay.title}</h1>
                                <p>{courseDisplay.code}</p>
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
                            {[...stream].slice().reverse().map((item) => (
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
                        {streamTotal > PAGE_SIZE && (
                            <Pagination total={streamTotal} limit={PAGE_SIZE} offset={streamOffset} onPageChange={setStreamOffset} />
                        )}
                    </div>
                </div>
            )}

            {/* ── Classwork Tab ── */}
            {activeTab === 'classwork' && (
                <div className="cd-classwork-container">
                    <div className="cd-cw-actions">
                        {isInstructor && (
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
                        <button className="btn btn-outline" style={{ marginLeft: isInstructor ? '1rem' : '0' }}><FileText size={16} /> View your work</button>
                    </div>

                    <div className="cd-topics-view">
                        {topics.concat('No topic').map(topic => {
                            const items = itemsByTopic[topic];
                            if (!isInstructor && items.length === 0 && topic !== 'No topic') return null; // hide empty topics for students
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
                                                    {item.itemType === 'material' ? (
                                                        <button
                                                            type="button"
                                                            className="cd-cw-title cd-cw-title-link"
                                                            onClick={() => setViewingMaterial(item)}
                                                        >
                                                            {item.title}
                                                        </button>
                                                    ) : (
                                                        <span className="cd-cw-title">{item.title}</span>
                                                    )}
                                                </div>
                                                <div className="cd-cw-item-right">
                                                    {item.itemType === 'assignment' && (
                                                        <>
                                                            <span className="cd-cw-due">Due {item.dueDate}</span>
                                                            {!isInstructor && item.status !== 'submitted' && (
                                                                <button className="btn btn-outline btn-sm" onClick={() => setSubmitAssignmentId(item.id)}>
                                                                    Submit
                                                                </button>
                                                            )}
                                                        </>
                                                    )}
                                                    {item.itemType === 'material' && (
                                                        <>
                                                            <span className="cd-cw-due">Posted {item.createdAt}</span>
                                                            {isInstructor && (
                                                                <>
                                                                    <button
                                                                        type="button"
                                                                        className="btn-icon"
                                                                        onClick={() => openModal('material', item)}
                                                                        title="Edit"
                                                                    >
                                                                        <Pencil size={16} />
                                                                    </button>
                                                                    <button
                                                                        type="button"
                                                                        className="btn-icon"
                                                                        onClick={() => handleDeleteMaterialClick(item)}
                                                                        disabled={deletingMaterialId === item.id}
                                                                        title="Delete"
                                                                    >
                                                                        <Trash2 size={16} />
                                                                    </button>
                                                                </>
                                                            )}
                                                        </>
                                                    )}
                                                    {item.itemType !== 'material' && isInstructor && <button className="btn-icon"><Trash2 size={16} /></button>}
                                                </div>
                                            </div>
                                        ))}
                                        {isInstructor && items.length === 0 && (
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
            {activeTab === 'people' && (
                <div className="cd-people-container">
                    <div className="cd-people-section">
                        <h2>Classmates ({peopleTotal})</h2>
                        {people.length === 0 && peopleTotal === 0 && (
                            <EmptyState icon={<Users size={28} />} title="No one enrolled yet" description="Enrolled classmates will appear here." />
                        )}
                        {people.map((p) => (
                            <div key={p.userId} className="cd-person">
                                <div className="cd-avatar">{p.fullName.charAt(0).toUpperCase()}</div>
                                <div>
                                    <span>{p.fullName}</span>
                                    <span className="cd-person-progress">{p.progressPercent}% complete</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    {peopleTotal > PAGE_SIZE && (
                        <Pagination total={peopleTotal} limit={PAGE_SIZE} offset={peopleOffset} onPageChange={setPeopleOffset} />
                    )}
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
                                    <div className="cd-modal-field cd-modal-field-full">
                                        <label>File</label>
                                        <FileDropzone
                                            mode="upload"
                                            onUploaded={(url) => setFormData((prev: Record<string, unknown>) => ({ ...prev, url: getUploadFullUrl(url) }))}
                                            onClear={() => setFormData((prev: Record<string, unknown>) => ({ ...prev, url: '' }))}
                                            currentUrl={formData.url || null}
                                            maxSizeMB={20}
                                        />
                                        <label className="cd-modal-field-label-optional">Or paste URL</label>
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
                            {modalType === 'material' && materialFormError && (
                                <div className="cd-modal-inline-error">
                                    <span>{materialFormError}</span>
                                    <button type="button" className="btn btn-ghost btn-sm" onClick={() => setMaterialFormError(null)}>Close</button>
                                </div>
                            )}
                        </div>
                        <div className="cd-modal-footer">
                            <button className="btn btn-outline" onClick={() => setModalType(null)}>Cancel</button>
                            <button
                                className="btn btn-primary"
                                onClick={handleSave}
                                disabled={modalType === 'material' && savingMaterial}
                            >
                                <Save size={16} /> {modalType === 'material' && savingMaterial ? 'Saving…' : (editItem ? 'Update' : 'Create')}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Full-screen document view with PDF + AI sidebar (like reference) */}
            {viewingMaterial && (
                <div className="cd-doc-view-overlay">
                    <div className="cd-doc-view" onClick={(e) => e.stopPropagation()}>
                        <header className="cd-doc-view-header">
                            <div className="cd-doc-view-header-title">
                                <BookOpen size={20} className="cd-doc-view-icon" />
                                <h1 className="cd-doc-view-title">{viewingMaterial.title}</h1>
                            </div>
                            <div className="cd-doc-view-header-actions">
                                <a
                                    href={getMaterialFileUrl(courseId, viewingMaterial.id)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-outline btn-sm"
                                >
                                    <ExternalLink size={16} /> Open in new tab
                                </a>
                                <button type="button" className="btn btn-ghost" onClick={() => setViewingMaterial(null)}>
                                    <X size={20} /> Close
                                </button>
                            </div>
                        </header>
                        <div className="cd-doc-view-main">
                            <div className="cd-doc-view-pdf-wrap">
                                {!isPdfMaterial(viewingMaterial) ? (
                                    <div className="cd-doc-view-fallback">
                                        <p>Preview not available.</p>
                                        <a href={getMaterialFileUrl(courseId, viewingMaterial.id)} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm">Open in new tab</a>
                                    </div>
                                ) : docPdfLoading ? (
                                    <div className="cd-doc-view-loading">
                                        <p>Loading PDF…</p>
                                    </div>
                                ) : docPdfError ? (
                                    <div className="cd-doc-view-fallback">
                                        <p className="cd-doc-view-error">{docPdfError}</p>
                                        <a href={getMaterialFileUrl(courseId, viewingMaterial.id)} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm">Open in new tab</a>
                                    </div>
                                ) : docPdfObjectUrl ? (
                                    <iframe
                                        title={viewingMaterial.title}
                                        src={docPdfObjectUrl}
                                        className="cd-doc-view-iframe"
                                    />
                                ) : null}
                            </div>
                            <aside className="cd-doc-view-sidebar">
                                <div className="cd-doc-view-sidebar-header">
                                    <Sparkles size={18} className="cd-doc-view-sidebar-icon" />
                                    <h2 className="cd-doc-view-sidebar-title">Summary</h2>
                                </div>
                                <p className="cd-doc-view-sidebar-summary">
                                    Ask questions below to get explanations, summaries, or key points about this document. Our AI will answer in the context of &quot;{viewingMaterial.title}&quot;.
                                </p>
                                <div className="cd-doc-view-sidebar-chat">
                                    <div className="cd-doc-view-messages">
                                        {docChatMessages.length === 0 && (
                                            <p className="cd-doc-view-messages-empty">No messages yet. Ask anything about this document.</p>
                                        )}
                                        {docChatMessages.map((msg, i) => (
                                            <div key={i} className={`cd-doc-view-msg cd-doc-view-msg-${msg.role}`}>
                                                <span className="cd-doc-view-msg-role">{msg.role === 'user' ? 'You' : 'Saarthi'}</span>
                                                <div className="cd-doc-view-msg-content">{msg.content}</div>
                                            </div>
                                        ))}
                                        {docChatSending && (
                                            <div className="cd-doc-view-msg cd-doc-view-msg-assistant">
                                                <span className="cd-doc-view-msg-role">Saarthi</span>
                                                <div className="cd-doc-view-msg-content cd-doc-view-msg-loading">Thinking…</div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="cd-doc-view-input-wrap">
                                        <input
                                            type="text"
                                            className="input cd-doc-view-input"
                                            placeholder="Ask about this document…"
                                            value={docChatInput}
                                            onChange={(e) => setDocChatInput(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendDocChatMessage()}
                                            disabled={docChatSending}
                                        />
                                        <button
                                            type="button"
                                            className="btn btn-primary cd-doc-view-send"
                                            onClick={sendDocChatMessage}
                                            disabled={!docChatInput.trim() || docChatSending}
                                            title="Send"
                                        >
                                            <Send size={18} />
                                        </button>
                                    </div>
                                </div>
                            </aside>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete material confirmation (theme-matched modal) */}
            <ConfirmModal
                open={!!materialToDelete}
                title="Delete material"
                message={materialToDelete ? `Delete "${materialToDelete.title}"? This cannot be undone.` : ''}
                confirmLabel="Delete"
                variant="danger"
                onConfirm={handleDeleteMaterialConfirm}
                onCancel={() => setMaterialToDelete(null)}
                loading={!!deletingMaterialId}
            />

            {/* Submit Assignment Modal (file upload) */}
            {submitAssignmentId && (
                <div className="cd-modal-overlay" onClick={() => { if (!submitting) { setSubmitAssignmentId(null); setSubmitFile(null); } }}>
                    <div className="cd-modal animate-scale-in" onClick={(e) => e.stopPropagation()}>
                        <div className="cd-modal-header">
                            <h2>Submit Assignment</h2>
                            <button className="cd-modal-close" onClick={() => { if (!submitting) { setSubmitAssignmentId(null); setSubmitFile(null); } }} disabled={submitting}><X size={20} /></button>
                        </div>
                        <div className="cd-modal-body">
                            <div className="cd-modal-field">
                                <label>Attachment (optional)</label>
                                <FileDropzone
                                    mode="select"
                                    onFileSelected={(file) => setSubmitFile(file ?? null)}
                                    onClear={() => setSubmitFile(null)}
                                    currentFile={submitFile}
                                    maxSizeMB={20}
                                />
                            </div>
                        </div>
                        <div className="cd-modal-footer">
                            <button className="btn btn-outline" onClick={() => { setSubmitAssignmentId(null); setSubmitFile(null); }} disabled={submitting}>Cancel</button>
                            <button className="btn btn-primary" onClick={handleSubmitAssignment} disabled={submitting}>
                                {submitting ? 'Submitting…' : 'Submit'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
