import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';
import './Navbar.css';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <nav className={clsx('navbar', { 'navbar-scrolled': scrolled })}>
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    Sermnova<span className="text-primary">Kloud</span>
                </Link>

                <div className="navbar-links">
                    <Link to="/" className={clsx('nav-link', { active: location.pathname === '/' })}>Home</Link>
                    <Link to="/tracks" className={clsx('nav-link', { active: location.pathname.startsWith('/tracks') })}>Projects</Link>

                    {user && (
                        <Link to="/learner" className={clsx('nav-link', { active: location.pathname === '/learner' })}>Dashboard</Link>
                    )}
                </div>

                <div className="navbar-actions">
                    {!user ? (
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
                                {user.email}
                            </span>
                            <Button variant="ghost" size="sm" onClick={handleLogout}>Logout</Button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
