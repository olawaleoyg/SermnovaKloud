import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();

    const from = location.state?.from?.pathname || '/learner';

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        if (!email || !password) return setError('Please fill in all fields');

        setIsLoading(true);
        try {
            await login(email, password);
            navigate(from, { replace: true });
        } catch (err) {
            setError(err.message || 'Invalid credentials');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-page-split">
            <Navbar />

            <div className="login-split-container">
                {/* Left Side: Image */}
                <div className="login-image-section">
                    <img src="/images/login-sidebar.png" alt="Community" className="login-sidebar-img" />
                    <div className="login-image-overlay">
                        <h2>Build together. Grow faster.</h2>
                        <p>Join a community of engineers mastering their craft.</p>
                    </div>
                </div>

                {/* Right Side: Form */}
                <div className="login-form-section">
                    <div className="login-form-wrapper">
                        <div className="login-header">
                            <h1 className="text-serif font-bold text-3xl mb-2">Welcome back</h1>
                            <p className="text-muted">Enter your details to access your dashboard.</p>
                        </div>

                        {error && (
                            <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm mb-6 border border-red-100">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleLogin}>
                            <div className="form-group mb-4">
                                <label className="block text-sm font-medium mb-1">Email Address</label>
                                <div className="input-with-icon">
                                    <Mail size={18} className="input-icon" />
                                    <input
                                        type="email"
                                        className="styled-input pl-10"
                                        placeholder="name@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group mb-6">
                                <label className="block text-sm font-medium mb-1">Password</label>
                                <div className="input-with-icon relative">
                                    <Lock size={18} className="input-icon" />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        className="styled-input pl-10 pr-10"
                                        placeholder="Start typing..."
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-primary"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                            </div>

                            <Button variant="primary" size="lg" className="w-full mb-4" disabled={isLoading}>
                                {isLoading ? 'Logging in...' : 'Sign In'} <ArrowRight size={18} className="ml-2" />
                            </Button>

                            <p className="text-center text-sm text-muted">
                                Don't have an account? <Link to="/signup" className="text-primary font-medium hover:underline">Sign up for free</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
