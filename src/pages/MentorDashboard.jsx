import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { MENTOR_QUEUE } from '../data/mockData';
import { Clock, User, Code, MessageSquare } from 'lucide-react';
import './MentorDashboard.css';

const MentorDashboard = () => {
    return (
        <div className="dashboard-page mentor-page">
            <Navbar />
            <div className="container dashboard-container">
                <header className="dashboard-header">
                    <div>
                        <h1>Review Queue</h1>
                        <p className="text-muted">Help learners by providing high-quality feedback.</p>
                    </div>
                    <div className="stats-box">
                        <span className="text-muted text-sm">This Week</span>
                        <span className="font-bold">12 Reviews</span>
                    </div>
                </header>

                <div className="queue-list">
                    {MENTOR_QUEUE.map((item) => (
                        <Card key={item.id} className="queue-item" glass>
                            <div className="queue-content">
                                <div className="queue-main">
                                    <div className="queue-header">
                                        <h3 className="queue-title">{item.projectTitle}</h3>
                                        <Badge variant="info">New</Badge>
                                    </div>

                                    <div className="queue-meta">
                                        <div className="meta-item">
                                            <User size={14} /> {item.studentName}
                                        </div>
                                        <div className="meta-item">
                                            <Clock size={14} /> {item.submittedTime}
                                        </div>
                                    </div>

                                    <div className="tags-list">
                                        {item.tags.map(tag => (
                                            <span key={tag} className="tag">{tag}</span>
                                        ))}
                                    </div>
                                </div>

                                <div className="queue-actions">
                                    <Link to={`/submission/${item.id}`} className="w-full">
                                        <Button variant="primary" size="md" className="w-full">Start Review</Button>
                                    </Link>
                                    <Button variant="ghost" size="sm">Skip</Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MentorDashboard;
