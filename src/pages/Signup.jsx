import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Check, ArrowRight, Eye, EyeOff, Wand2, ArrowLeft, Lock } from 'lucide-react';
import { mockAuthService } from '../services/mockAuthService';
import { useAuth } from '../context/AuthContext';
import './Signup.css';

const Signup = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    // const plan = searchParams.get('plan'); // Could use this to pre-select plan context

    const [step, setStep] = useState(1); // 1: Check Email, 2: Create Account, 3: Login (Welcome Back)
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    // Form States
    const [email, setEmail] = useState('');
    const [fullname, setFullname] = useState('');
    const [password, setPassword] = useState('');

    // UI States
    const [showPassword, setShowPassword] = useState(false);
    const [touched, setTouched] = useState(false);

    // Password Validation (Only for Step 2)
    const validations = [
        { label: 'At least 6 characters', valid: password?.length >= 6 },
        { label: 'One lowercase letter', valid: /[a-z]/.test(password || '') },
        { label: 'One uppercase letter', valid: /[A-Z]/.test(password || '') },
        { label: 'One number', valid: /[0-9]/.test(password || '') },
        { label: 'One special character', valid: /[^a-zA-Z0-9]/.test(password || '') },
    ];
    const passwordValid = validations.every(v => v.valid);

    // Handlers
    const handleEmailCheck = async (e) => {
        e.preventDefault();
        setError('');
        if (!email) return;

        setIsLoading(true);
        try {
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 600));
            const exists = await mockAuthService.checkUserExists(email);
            if (exists) {
                setStep(3); // Go to Login
            } else {
                setStep(2); // Go to Signup
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        if (!fullname || !passwordValid) return;

        setIsLoading(true);
        // Simulate Register
        try {
            await mockAuthService.register(email, password, fullname);
            // Auto login or redirect to generic login? 
            // For this flow, let's redirect to pricing as "authorized" or just pricing
            navigate('/pricing');
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const user = await mockAuthService.loginWithPassword(email, password);
            // Note: In a real app we'd update AuthContext here. 
            // Since AuthContext uses its own state, we might need a method there, 
            // but for visual flow verification, we'll assume success and redirect.
            // If we want strict context update, we'd need to expose a method in AuthContext.
            // For now, let's just redirect to Pricing/Dashboard.
            navigate('/pricing');
        } catch (err) {
            setError('Invalid password. Please try again.');
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
                    {/* Header Changes dynamic based on step */}
                    <div className="signup-header">
                        {step === 1 && (
                            <>
                                <h1 className="text-serif text-2xl font-bold mb-2">Sign up</h1>
                            </>
                        )}
                        {step === 2 && (
                            <>
                                <h1 className="text-serif text-2xl font-bold mb-2">Create Account</h1>
                                <p className="text-muted">Looks like you're new here! Set up your profile.</p>
                            </>
                        )}
                        {step === 3 && (
                            <>
                                <div className="flex justify-center mb-2">
                                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                                        <Lock size={20} />
                                    </div>
                                </div>
                                <h1 className="text-serif text-2xl font-bold mb-2">Welcome Back</h1>
                                <p className="text-muted">Please enter your password for <strong>{email}</strong></p>
                            </>
                        )}
                    </div>

                    {/* Step 1: Email Check */}
                    {step === 1 && (
                        <form onSubmit={handleEmailCheck} className="signup-form">
                            <div className="form-group">
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
                            <Button variant="primary" size="lg" className="w-full mt-2" disabled={isLoading}>
                                {isLoading ? 'Checking...' : 'Continue'} <ArrowRight size={16} className="ml-2" />
                            </Button>
                        </form>
                    )}

                    {/* Step 2: Signup (Name + Password) */}
                    {step === 2 && (
                        <form onSubmit={handleSignup} className="signup-form">
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
                                    autoFocus
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

                            <Button variant="primary" size="lg" className="w-full" disabled={isLoading || !passwordValid || !fullname}>
                                {isLoading ? 'Creating...' : 'Create Account'}
                            </Button>

                            <button type="button" onClick={() => setStep(1)} className="mt-4 text-sm text-muted hover:text-primary flex items-center justify-center gap-1 w-full">
                                <ArrowLeft size={14} /> Change Email
                            </button>
                        </form>
                    )}

                    {/* Step 3: Login (Password) */}
                    {step === 3 && (
                        <form onSubmit={handleLogin} className="signup-form">
                            <div className="form-group mb-4">
                                <label htmlFor="password-login" className="block text-sm font-medium mb-1">Password</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        id="password-login"
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        className="styled-input pr-10"
                                        autoFocus
                                    />
                                    <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                                <div className="text-right mt-1">
                                    <Link to="#" className="text-xs text-primary hover:underline">Forgot your password?</Link>
                                </div>
                            </div>

                            {error && <div className="p-3 mb-4 text-sm text-red-600 bg-red-50 rounded border border-red-100">{error}</div>}

                            <Button variant="primary" size="lg" className="w-full" disabled={isLoading}>
                                {isLoading ? 'Logging in...' : 'Log In'}
                            </Button>

                            <button type="button" onClick={() => setStep(1)} className="mt-4 text-sm text-muted hover:text-primary flex items-center justify-center gap-1 w-full">
                                <ArrowLeft size={14} /> Use a different email
                            </button>
                        </form>
                    )}
                </Card>
            </div>
        </div>
    );
};

export default Signup;
