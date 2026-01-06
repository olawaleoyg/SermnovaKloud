import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import TestimonialCarousel from '../components/common/TestimonialCarousel';
import { ArrowRight, CheckCircle2, User, BookOpen, Layers } from 'lucide-react';
import './Landing.css';

const Landing = () => {
    return (
        <div className="landing-page">
            <Navbar />

            {/* Hero Section */}
            <section className="hero-section">
                <div className="container hero-container">
                    <div className="hero-content-left">
                        <Badge className="mb-4">Internal Beta v1.0</Badge>
                        <h1 className="hero-title">
                            Build Real-World <br />
                            <span className="text-serif text-italic">DevOps Systems.</span>
                        </h1>
                        <p className="hero-subtitle">
                            Stop grinding LeetCode. Build production-grade cloud infrastructure and get async code reviews from senior engineers.
                        </p>
                        <div className="hero-actions">
                            <Link to="/signup">
                                <Button variant="primary" size="lg">Start Your Journey <ArrowRight size={18} /></Button>
                            </Link>
                            <Link to="/tracks">
                                <Button variant="outline" size="lg">Explore Tracks</Button>
                            </Link>
                        </div>

                        <div className="hero-stats">
                            <div className="stat-item">
                                <span className="stat-value">500+</span>
                                <span className="stat-label">Active Mentors</span>
                            </div>
                            <div className="stat-divider"></div>
                            <div className="stat-item">
                                <span className="stat-value">12k</span>
                                <span className="stat-label">Code Reviews</span>
                            </div>
                            <div className="stat-divider"></div>
                            <div className="stat-item">
                                <span className="stat-value">98%</span>
                                <span className="stat-label">Success Rate</span>
                            </div>
                        </div>
                    </div>

                    <div className="hero-content-right">
                        <div className="hero-image-wrapper glass-panel">
                            <img src="/images/hero-image.png" alt="Mentorship Visualization" className="hero-img" />
                        </div>
                    </div>
                </div>

                {/* Simple decorative background elements */}
                <div className="hero-blob blob-1"></div>
                <div className="hero-blob blob-2"></div>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">The Sermnova Method</h2>
                        <p className="section-subtitle">A calm, structured approach to leveling up your skills.</p>
                    </div>

                    <div className="features-grid">
                        <Card className="feature-card">
                            <div className="icon-wrapper">
                                <Layers color="var(--color-primary)" size={24} />
                            </div>
                            <h3>Project-Based Learning</h3>
                            <p>Forget rote memorization. Build real-world projects that matter and get them reviewed by seniors.</p>
                        </Card>

                        <Card className="feature-card">
                            <div className="icon-wrapper">
                                <User color="var(--color-primary)" size={24} />
                            </div>
                            <h3>Async Mentorship</h3>
                            <p>Submit your questions or code anytime. Receive detailed video and text feedback within 24 hours.</p>
                        </Card>

                        <Card className="feature-card">
                            <div className="icon-wrapper">
                                <BookOpen color="var(--color-primary)" size={24} />
                            </div>
                            <h3>Curated Paths</h3>
                            <p>Follow structured learning paths designed by engineers from top tech companies.</p>
                        </Card>
                    </div>

                    <div className="mt-16">
                        <TestimonialCarousel />
                    </div>
                </div>
            </section>

            {/* Pricing Teaser */}
            <section className="pricing-section">
                <div className="container">
                    <div className="pricing-cta glass-panel">
                        <div className="pricing-content">
                            <h2>Master Technical Interviews<br /><span className="text-primary text-serif italic">Without the Noise.</span></h2>
                            <p>Join thousands of engineers accelerating their careers.</p>
                            <div className="check-list">
                                <div className="check-item"><CheckCircle2 size={16} className="text-primary" /> Unlimited Reviews</div>
                                <div className="check-item"><CheckCircle2 size={16} className="text-primary" /> Mock Interviews</div>
                                <div className="check-item"><CheckCircle2 size={16} className="text-primary" /> Career Coaching</div>
                            </div>
                        </div>
                        <div className="pricing-action">
                            <Link to="/pricing">
                                <Button variant="primary" size="xl">Get Membership</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="footer">
                <div className="container footer-content">
                    <div className="footer-brand">
                        Sermnova<span className="text-primary">Kloud</span>
                        <p className="copyright">© 2026 Sermnova Inc.</p>
                    </div>
                    <div className="footer-links">
                        <a href="#">Privacy</a>
                        <a href="#">Terms</a>
                        <a href="#">Twitter</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

const Badge = ({ children, className }) => (
    <span className={`inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wider uppercase mb-4 ${className}`} style={{ backgroundColor: 'rgba(107, 142, 120, 0.1)', color: 'var(--color-primary)' }}>
        {children}
    </span>
);

export default Landing;
