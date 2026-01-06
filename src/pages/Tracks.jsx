import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { TRACKS } from '../data/mockData';
import { GitBranch, Layers, ArrowRight } from 'lucide-react';
import './Tracks.css';

const Tracks = () => {
    return (
        <div className="tracks-page">
            <Navbar />
            <div className="container tracks-container">
                <header className="tracks-header">
                    <h1>Project Tracks</h1>
                    <p className="text-muted">Build real-world systems. Get async feedback. Master your craft.</p>
                </header>

                <div className="tracks-grid">
                    {TRACKS.map((track) => (
                        <Card key={track.id} className="track-card" glass>
                            <div
                                className="track-banner"
                                style={{ background: track.color }}
                            >
                                <div className="track-level-badge">{track.level}</div>
                            </div>
                            <div className="track-content">
                                <h3 className="track-title">{track.title}</h3>
                                <p className="track-description">{track.description}</p>

                                <div className="track-meta">
                                    <div className="meta-row">
                                        <Layers size={16} className="text-primary" />
                                        <span className="text-sm font-medium">{track.projectCount} Projects</span>
                                    </div>
                                    <div className="tags-row">
                                        {track.tags.slice(0, 3).map(tag => (
                                            <span key={tag} className="mini-tag">{tag}</span>
                                        ))}
                                    </div>
                                </div>

                                <div className="track-action">
                                    <Link to={`/tracks/${track.id}`} className="w-full group">
                                        <Button variant="outline" size="sm" className="w-full group">
                                            View Roadmap <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Tracks;
