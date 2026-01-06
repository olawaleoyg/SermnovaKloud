import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';
import './Navbar.css';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const { user, logout } = useAuth();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={clsx('navbar', { 'navbar-scrolled': scrolled })}>
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    Sermnova<span className="text-primary">Kloud</span>
                </Link>

                <div className="navbar-links">
                    <Link to="/" className={clsx('nav-link', { active: location.pathname === '/' })}>Home</Link>

                    {/* Common Links */}
                    {/* Common Links */}
                    <Link to="/tracks" className={clsx('nav-link', { active: location.pathname.startsWith('/tracks') })}>Projects</Link>

                    {/* Learner Links (Free/Subscriber Only) */}
                    {(user.role === 'free' || user.role === 'subscriber') && (
                        <>
                            <Link to="/learner" className={clsx('nav-link', { active: location.pathname === '/learner' })}>My Submissions</Link>
                            <Link to="/learner" className={clsx('nav-link', { active: location.pathname === '/learner/feedback' })}>Feedback</Link>
                        </>
                    )}

                    {/* Mentor Links */}
                    {user.role === 'mentor' && (
                        <>
                            <Link to="/mentor" className={clsx('nav-link', { active: location.pathname.startsWith('/mentor') })}>Review Queue</Link>
                            <Link to="/mentor" className={clsx('nav-link', { active: location.pathname === '/mentor/feedback' })}>Feedback</Link>
                        </>
                    )}

                    {/* Admin Links */}
                    {user.role === 'admin' && (
                        <>
                            <Link to="/mentor" className={clsx('nav-link', { active: location.pathname.startsWith('/mentor') })}>Review Queue</Link>
                            <Link to="/admin" className={clsx('nav-link', { active: location.pathname === '/admin' })}>Users</Link>
                            <Link to="/admin" className={clsx('nav-link', { active: location.pathname === '/admin/settings' })}>Settings</Link>
                        </>
                    )}
                </div>

                <div className="navbar-actions">
                    {user.role === 'guest' ? (
                        <>
                            <Link to="/login">
                                <Button variant="ghost" size="sm">Login</Button>
                            </Link>
                            <Link to="/signup">
                                <Button variant="primary" size="sm">Start for Free</Button>
                            </Link>
                        </>
                    ) : (
                        <div className="flex items-center gap-4">
                            <span className="text-sm font-medium">
                                {user.role === 'free' && 'Free Plan'}
                                {user.role === 'subscriber' && 'Pro Plan'}
                                {user.role === 'admin' && 'Admin'}
                            </span>
                            <Button variant="ghost" size="sm" onClick={logout}>Logout</Button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
