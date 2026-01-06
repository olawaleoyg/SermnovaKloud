import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Check, ArrowRight, Eye, EyeOff, Wand2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Signup.css';

const Signup = () => {
    const navigate = useNavigate();
    const { signup } = useAuth();

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    // Form States
    const [email, setEmail] = useState('');
    const [fullname, setFullname] = useState('');
    const [password, setPassword] = useState('');

    // UI States
    const [showPassword, setShowPassword] = useState(false);
    const [touched, setTouched] = useState(false);

    // Password Validation
    const validations = [
        { label: 'At least 6 characters', valid: password?.length >= 6 },
        { label: 'One lowercase letter', valid: /[a-z]/.test(password || '') },
        { label: 'One uppercase letter', valid: /[A-Z]/.test(password || '') },
        { label: 'One number', valid: /[0-9]/.test(password || '') },
        { label: 'One special character', valid: /[^a-zA-Z0-9]/.test(password || '') },
    ];
    const passwordValid = validations.every(v => v.valid);

    const handleSignup = async (e) => {
        e.preventDefault();
        if (!email || !fullname || !passwordValid) return;

        setIsLoading(true);
        setError('');
        try {
            await signup(email, password, { full_name: fullname });
            navigate('/learner');
        } catch (err) {
            setError(err.message || 'Signup failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const generatePassword = () => {
        const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
        let pass = "Aa1!"; // Ensure requirements
        for (let i = 0; i < 8; i++) {
            pass += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        pass = pass.split('').sort(() => 0.5 - Math.random()).join('');
        setPassword(pass);
        setShowPassword(true);
        setTouched(true);
    };

    // Components
    return (
        <div className="signup-page">
            <Navbar />
            <div className="signup-container">
                <Card className="signup-card" glass>
                    <div className="signup-header">
                        <h1 className="text-serif text-2xl font-bold mb-2">Create Account</h1>
                        <p className="text-muted">Sign up to start building your portfolio</p>
                    </div>

                    <form onSubmit={handleSignup} className="signup-form">
                        <div className="form-group mb-4">
                            <label htmlFor="email" className="block text-sm font-medium mb-1">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="name@example.com"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                className="styled-input"
                                required
                                autoFocus
                            />
                        </div>

                        <div className="form-group mb-4">
                            <label htmlFor="fullname" className="block text-sm font-medium mb-1">Full Name</label>
                            <input
                                type="text"
                                id="fullname"
                                placeholder="Jane Doe"
                                value={fullname}
                                onChange={e => setFullname(e.target.value)}
                                className="styled-input"
                                required
                            />
                        </div>

                        <div className="form-group mb-4">
                            <div className="flex justify-between items-center mb-1">
                                <label htmlFor="password">Password</label>
                                <button type="button" onClick={generatePassword} className="text-xs text-primary flex items-center gap-1 hover:underline">
                                    <Wand2 size={12} /> Generate
                                </button>
                            </div>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    onFocus={() => setTouched(true)}
                                    className="styled-input pr-10"
                                />
                                <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                            {touched && (
                                <div className="password-hints mt-2 p-2 bg-gray-50 rounded border border-gray-100 text-xs">
                                    {validations.map((v, idx) => (
                                        <div key={idx} className={`flex items-center gap-1 mb-1 ${v.valid ? 'text-green-600' : 'text-gray-400'}`}>
                                            {v.valid ? <Check size={12} /> : <div className="w-1.5 h-1.5 rounded-full bg-gray-200" />}
                                            <span>{v.label}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {error && <div className="p-3 mb-4 text-sm text-red-600 bg-red-50 rounded border border-red-100">{error}</div>}

                        <Button variant="primary" size="lg" className="w-full" disabled={isLoading || !passwordValid || !fullname || !email}>
                            {isLoading ? 'Creating Account...' : 'Create Account'} <ArrowRight size={16} className="ml-2" />
                        </Button>

                        <p className="text-center text-sm text-muted mt-4">
                            Already have an account? <Link to="/login" className="text-primary font-medium hover:underline">Log in</Link>
                        </p>
                    </form>
                </Card>
            </div>
        </div>
    );
};

export default Signup;
