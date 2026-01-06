import React from 'react';
import Navbar from '../components/common/Navbar';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { ChevronLeft, MessageCircle, FileText, Send } from 'lucide-react';
import './SubmissionView.css';

const SubmissionView = () => {
    // Mock Data for a specific submission
    const submission = {
        title: "E-commerce API with Node.js",
        learner: "Jane Doe",
        submitted: "Oct 15, 2023",
        description: "I've implemented the auth middleware and the product routes.",
        files: ["server.js", "authMiddleware.js", "routes/products.js"],
        feedback: [
            { id: 1, author: "Sarah Lin", role: "Mentor", text: "Great work on the middleware! One tip: use constant time comparison for passwords.", time: "2h ago" },
            { id: 2, author: "Jane Doe", role: "Learner", text: "Thanks Sarah, good catch. I'll update that.", time: "1h ago" }
        ]
    };

    return (
        <div className="submission-page">
            <Navbar />
            <div className="container submission-container">
                <Button variant="ghost" className="mb-4 text-muted"><ChevronLeft size={16} /> Back to Dashboard</Button>

                <div className="submission-layout">
                    {/* Left: Project Context */}
                    <div className="submission-content">
                        <header className="submission-header">
                            <div>
                                <h1 className="text-2xl font-serif font-bold mb-2">{submission.title}</h1>
                                <div className="submission-meta">
                                    <span className="text-muted">by {submission.learner}</span>
                                    <Badge variant="success">In Review</Badge>
                                </div>
                            </div>
                            <Button variant="secondary">View Code Repository</Button>
                        </header>

                        <Card className="mb-6">
                            <h3 className="font-bold mb-2">Learner Notes</h3>
                            <p className="text-muted">{submission.description}</p>
                        </Card>

                        <div className="file-list">
                            <h3 className="font-bold mb-3">Submitted Files</h3>
                            {submission.files.map(file => (
                                <div key={file} className="file-item">
                                    <FileText size={16} className="text-primary" />
                                    <span>{file}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Feedback & Discussion */}
                    <div className="submission-sidebar">
                        <Card className="feedback-panel" glass>
                            <h3 className="font-bold mb-4 flex items-center gap-2">
                                <MessageCircle size={18} /> Feedback Thread
                            </h3>

                            <div className="feedback-list">
                                {submission.feedback.map(item => (
                                    <div key={item.id} className={`feedback-item ${item.role === 'Mentor' ? 'mentor-msg' : 'learner-msg'}`}>
                                        <div className="feedback-header">
                                            <span className="font-bold text-sm">{item.author}</span>
                                            <span className="text-xs text-muted">{item.time}</span>
                                        </div>
                                        <div className="feedback-bubble">
                                            {item.text}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="feedback-input">
                                <textarea placeholder="Write your feedback..." rows="3"></textarea>
                                <Button variant="primary" size="sm" className="w-full mt-2"><Send size={14} /> Post Reply</Button>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubmissionView;
