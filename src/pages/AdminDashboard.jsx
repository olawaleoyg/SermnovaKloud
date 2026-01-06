import React, { useState } from 'react';
import Navbar from '../components/common/Navbar';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { TRACKS } from '../data/mockData';
import { useAuth } from '../context/AuthContext';
import { Edit2, Save, X } from 'lucide-react';

const AdminDashboard = () => {
    const { user } = useAuth();
    // In a real app, this state would come from the backend. 
    // Here we initialize with mock data, but changes won't persist on refresh.
    const [tracks, setTracks] = useState(TRACKS);

    if (user.role !== 'admin') {
        return (
            <div className="pt-32 text-center">
                <h1 className="text-2xl font-bold text-red-600">Access Denied</h1>
                <p>You need Admin privileges to view this page.</p>
            </div>
        );
    }

    const toggleAccess = (trackId, projectId) => {
        setTracks(prevTracks => prevTracks.map(track => {
            if (track.id !== trackId) return track;
            return {
                ...track,
                projects: track.projects.map(proj => {
                    if (proj.id !== projectId) return proj;
                    return {
                        ...proj,
                        access_level: proj.access_level === 'free' ? 'paid' : 'free'
                    };
                })
            };
        }));
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4">
            <Navbar />
            <div className="max-w-5xl mx-auto">
                <header className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-serif font-bold">Curriculum Manager</h1>
                        <p className="text-muted">Manage Full/Paid access for projects.</p>
                    </div>
                    <Button variant="primary">Save Changes</Button>
                </header>

                <div className="space-y-8">
                    {tracks.map(track => (
                        <div key={track.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                            <div className="p-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
                                <h2 className="font-bold text-lg">{track.title}</h2>
                                <Badge>{track.level}</Badge>
                            </div>
                            <div className="p-4">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="border-b border-gray-100 text-sm text-gray-500">
                                            <th className="pb-2">Project</th>
                                            <th className="pb-2">Outcome</th>
                                            <th className="pb-2">Access Level</th>
                                            <th className="pb-2">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {track.projects?.map(proj => (
                                            <tr key={proj.id} className="group hover:bg-gray-50">
                                                <td className="py-3 pr-4 font-medium">{proj.title}</td>
                                                <td className="py-3 pr-4 text-sm text-gray-500 truncate max-w-xs">{proj.outcome}</td>
                                                <td className="py-3 pr-4">
                                                    <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${proj.access_level === 'free'
                                                            ? 'bg-green-100 text-green-700'
                                                            : 'bg-purple-100 text-purple-700'
                                                        }`}>
                                                        {proj.access_level.toUpperCase()}
                                                    </span>
                                                </td>
                                                <td className="py-3">
                                                    <button
                                                        onClick={() => toggleAccess(track.id, proj.id)}
                                                        className="text-sm text-blue-600 hover:text-blue-800 font-medium underline"
                                                    >
                                                        Toggle
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
