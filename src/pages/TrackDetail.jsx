import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { TRACKS } from '../data/mockData';
import { useAuth } from '../context/AuthContext';
import { Lock, Unlock, ArrowLeft, CheckCircle } from 'lucide-react';
import './TrackDetail.css';

const TrackDetail = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const track = TRACKS.find(t => t.id === id);

    if (!track) return <div>Track not found</div>;

    const isLocked = (project) => {
        if (user.role === 'admin') return false;
        if (user.role === 'subscriber') return false;
        if (user.role === 'free' && project.access_level === 'free') return false;
        return true;
    };

    return (
        <div className="track-detail-page">
            <Navbar />
            <div className="container track-detail-container">
                <Link to="/tracks" className="back-link">
                    <ArrowLeft size={16} /> Back to Tracks
                </Link>

                <div
                    className="track-hero rounded-xl p-8 mb-8 text-white relative overflow-hidden"
                    style={{ background: track.color }}
                >
                    <div className="relative z-10">
                        <Badge className="bg-white/20 text-white border-0 mb-4">{track.level}</Badge>
                        <h1 className="text-3xl font-serif font-bold mb-2">{track.title}</h1>
                        <p className="opacity-90 max-w-2xl">{track.description}</p>
                    </div>
                </div>

                <div className="projects-list">
                    <h2 className="text-xl font-bold mb-4">Project Roadmap</h2>

                    {user.role === 'guest' && (
                        <Card className="mb-6 bg-blue-50 border-blue-100">
                            <p className="text-sm text-blue-800">
                                You are viewing this as a <strong>Guest</strong>. <br />
                                Log in to access the free starter projects for this track.
                            </p>
                        </Card>
                    )}

                    {track.projects?.map((project, index) => {
                        const locked = isLocked(project);

                        return (
                            <Card key={project.id} className={`project-item-card ${locked ? 'opacity-70' : ''}`} glass={!locked}>
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex gap-4">
                                        <div className={`status-icon ${locked ? 'bg-gray-100' : 'bg-green-100 text-green-700'}`}>
                                            {locked ? <Lock size={20} /> : <Unlock size={20} />}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="font-bold">{project.title}</h3>
                                                {project.access_level === 'free' && <Badge variant="success" className="text-[10px] py-0 px-2">FREE</Badge>}
                                                {project.access_level === 'paid' && <Badge variant="default" className="text-[10px] py-0 px-2">PRO</Badge>}
                                            </div>
                                            <p className="text-sm text-muted">{project.outcome}</p>
                                        </div>
                                    </div>

                                    <div>
                                        {!locked ? (
                                            <Button size="sm" variant="outline">Start Project</Button>
                                        ) : (
                                            user.role === 'guest' ? (
                                                <span className="text-xs text-muted font-medium">Login to View</span>
                                            ) : (
                                                <Link to="/pricing">
                                                    <Button size="sm" variant="primary">Unlock</Button>
                                                </Link>
                                            )
                                        )}
                                    </div>
                                </div>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default TrackDetail;
