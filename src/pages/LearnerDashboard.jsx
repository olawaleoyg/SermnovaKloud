import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { TRACKS } from '../data/mockData';
import { FileCode, Clock, BookOpen, ChevronRight, Lock, Unlock } from 'lucide-react';
import './LearnerDashboard.css';

const LearnerDashboard = () => {
    return (
        <div className="dashboard-page">
            <Navbar />
            <div className="container dashboard-container">
                <header className="dashboard-header mb-8">
                    <div>
                        <h1 className="text-3xl font-serif font-bold text-gray-900">My Projects</h1>
                        <p className="text-muted mt-2">Select a project to start building your portfolio.</p>
                    </div>
                </header>

                <div className="tracks-container flex flex-col gap-8">
                    {TRACKS.map((track) => (
                        <div key={track.id} className="track-section">
                            <div className="track-header mb-4 flex items-center justify-between">
                                <div>
                                    <h2 className="text-xl font-bold flex items-center gap-2">
                                        <div className="w-2 h-8 rounded-full" style={{ background: track.color }}></div>
                                        {track.title}
                                    </h2>
                                    <p className="text-sm text-muted mt-1 ml-4">{track.description}</p>
                                </div>
                                <Badge variant="outline">{track.level}</Badge>
                            </div>

                            <div className="projects-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {track.projects.map((project) => (
                                    <Card key={project.id} className="project-card relative group hover:-translate-y-1 transition-transform duration-300" glass>
                                        <div className="card-header flex justify-between items-start mb-4">
                                            <div className="icon-box p-2 rounded-lg bg-primary/5">
                                                <FileCode size={20} className="text-primary" />
                                            </div>
                                            {project.access_level === 'free' ? (
                                                <Badge variant="success" className="flex items-center gap-1"><Unlock size={10} /> Free</Badge>
                                            ) : (
                                                <Badge variant="secondary" className="flex items-center gap-1"><Lock size={10} /> Pro</Badge>
                                            )}
                                        </div>

                                        <h3 className="project-title font-bold text-lg mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
                                        <p className="text-sm text-muted mb-4 line-clamp-2">{project.outcome}</p>

                                        <div className="project-meta text-xs text-muted mb-4 space-y-1">
                                            {project.notes && (
                                                <div className="flex items-start gap-1.5 p-2 bg-gray-50 rounded italic border border-gray-100">
                                                    <BookOpen size={12} className="mt-0.5 shrink-0" />
                                                    <span>{project.notes}</span>
                                                </div>
                                            )}
                                        </div>

                                        <div className="card-footer mt-auto pt-4 border-t border-gray-100">
                                            <Link to={`/tracks/${track.id}`} className="w-full">
                                                <Button variant={project.access_level === 'free' ? 'primary' : 'outline'} size="sm" className="w-full justify-between group-hover:shadow-md">
                                                    {project.access_level === 'free' ? 'Start Building' : 'Unlock Project'}
                                                    <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                                </Button>
                                            </Link>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LearnerDashboard;
