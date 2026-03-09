import { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, User, Bot, Loader2, BookOpen, Lightbulb, Code2, GraduationCap, Plus } from 'lucide-react';
import './Chat.css';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

const suggestedTopics = [
    { icon: BookOpen, label: 'Explain Fourier Transform' },
    { icon: Code2, label: 'Binary Search implementation' },
    { icon: Lightbulb, label: 'What is gradient descent?' },
    { icon: GraduationCap, label: 'DSP exam preparation tips' },
];

export default function ChatPage() {
    const [messages, setMessages] = useState<Message[]>([
        { id: '1', role: 'assistant', content: "Hello! I'm Saarthi, your AI learning companion. I specialize in:\n\n• **Digital Signal Processing** - FFT, filters, transforms\n• **Machine Learning** - Neural networks, optimization\n• **Data Structures** - Trees, graphs, algorithms\n• **Pattern Recognition** - Classification, feature extraction\n\nHow can I help you today?", timestamp: new Date() },
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const endRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

    const sendMessage = async () => {
        if (!input.trim() || isLoading) return;
        const userMsg: Message = { id: Date.now().toString(), role: 'user', content: input, timestamp: new Date() };
        setMessages((prev) => [...prev, userMsg]);
        const q = input;
        setInput('');
        setIsLoading(true);

        try {
            const res = await fetch('http://localhost:8000/api/chat/message', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: q, conversationHistory: messages.map((m) => ({ role: m.role, content: m.content })) }),
            });
            const contentType = res.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                throw new Error('Server returned non-JSON response');
            }
            const data = await res.json();
            setMessages((prev) => [...prev, { id: (Date.now() + 1).toString(), role: 'assistant', content: data.response || 'Sorry, had trouble processing that.', timestamp: new Date() }]);
        } catch {
            setMessages((prev) => [...prev, { id: (Date.now() + 1).toString(), role: 'assistant', content: 'Connection error. Ensure backend is running on port 8000.', timestamp: new Date() }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
    };

    return (
        <div className="chat-page">
            {/* Sidebar */}
            <div className="chat-sidebar">
                <button className="btn btn-primary chat-new-btn"><Plus size={16} /> New Chat</button>
                <div className="chat-history">
                    <p className="chat-history-label">Recent Conversations</p>
                    <div className="chat-history-item active">
                        <Sparkles size={14} />
                        <span>Current Chat</span>
                    </div>
                    <div className="chat-history-item">
                        <BookOpen size={14} />
                        <span>FFT Implementation Help</span>
                    </div>
                    <div className="chat-history-item">
                        <Code2 size={14} />
                        <span>Binary Tree Traversal</span>
                    </div>
                </div>
            </div>

            {/* Main Chat Area */}
            <div className="chat-main">
                <div className="chat-messages">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`chat-msg ${msg.role}`}>
                            <div className={`chat-msg-avatar ${msg.role}`}>
                                {msg.role === 'user' ? <User size={18} /> : <Bot size={18} />}
                            </div>
                            <div className="chat-msg-content">
                                <div className="chat-msg-header">
                                    <span className="chat-msg-name">{msg.role === 'user' ? 'You' : 'Saarthi AI'}</span>
                                    <span className="chat-msg-time">{msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                </div>
                                <div className="chat-msg-text">
                                    {msg.content.split(/```/).map((part, i) => {
                                        if (i % 2 === 1) {
                                            return (
                                                <pre key={i} style={{
                                                    background: '#1F2937',
                                                    color: '#E5E7EB',
                                                    padding: '0.75rem',
                                                    borderRadius: '0.5rem',
                                                    overflowX: 'auto',
                                                    fontFamily: 'monospace',
                                                    margin: '0.5rem 0'
                                                }}>
                                                    <code>{part}</code>
                                                </pre>
                                            );
                                        }
                                        return (
                                            <div key={i}>
                                                {part.split('\n').map((line, k) => (
                                                    <p key={k} style={{ margin: '0.25rem 0' }}>
                                                        {line.split(/(\[Source: .*?\]|\*\*.*?\*\*)/g).map((subPart, j) => {
                                                            if (subPart.startsWith('[Source:')) {
                                                                const source = subPart.match(/\[Source: (.*?)\]/)?.[1];
                                                                return (
                                                                    <span key={j} className="badge badge-success badge-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                                                                        📚 {source}
                                                                    </span>
                                                                );
                                                            }
                                                            if (subPart.startsWith('**') && subPart.endsWith('**')) {
                                                                return <strong key={j}>{subPart.slice(2, -2)}</strong>;
                                                            }
                                                            return subPart;
                                                        })}
                                                    </p>
                                                ))}
                                            </div>
                                        );
                                    })}
                                </div>
                                <span className="chat-msg-time">{msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="chat-msg assistant">
                            <div className="chat-msg-avatar assistant"><Bot size={18} /></div>
                            <div className="chat-msg-content">
                                <div className="chat-typing">
                                    <Loader2 size={16} className="animate-spin" />
                                    <span>Saarthi is thinking...</span>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={endRef} />
                </div>

                {/* Suggestions */}
                {messages.length <= 1 && (
                    <div className="chat-suggestions">
                        {suggestedTopics.map((topic, i) => {
                            const Icon = topic.icon;
                            return (
                                <button key={i} className="chat-suggestion-btn" onClick={() => setInput(topic.label)}>
                                    <Icon size={16} /> {topic.label}
                                </button>
                            );
                        })}
                    </div>
                )}

                {/* Input */}
                <div className="chat-input-area">
                    <div className="chat-input-wrapper">
                        <textarea
                            ref={inputRef}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Ask Saarthi anything about your subjects..."
                            rows={1}
                            disabled={isLoading}
                        />
                        <button className="chat-send-btn" onClick={sendMessage} disabled={!input.trim() || isLoading}>
                            <Send size={18} />
                        </button>
                    </div>
                    <p className="chat-input-hint">Press Enter to send • Shift+Enter for new line</p>
                </div>
            </div>
        </div>
    );
}
