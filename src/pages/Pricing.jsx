import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Check } from 'lucide-react';
import clsx from 'clsx';
import './Pricing.css';

const pricingData = {
    starter: { price: 'Free' },
    pro: {
        '1': '2,000',
        '3': '1,000',
        '6': '600'
    },
    elite: {
        '1': '3,000',
        '3': '850',
        '6': '600'
    }
};

const Pricing = () => {
    const [duration, setDuration] = useState('1'); // '1', '3', '6'
    const navigate = useNavigate();

    const handleSelectPlan = (plan) => {
        navigate(`/signup?plan=${plan}&duration=${duration}`);
    };

    return (
        <div className="pricing-page">
            <Navbar />
            <div className="container pricing-container">
                <header className="pricing-header">
                    <h1 className="text-serif">Invest in Your Career</h1>
                    <p className="text-muted">Simple, transparent pricing. No hidden fees.</p>
                </header>

                <div className="duration-toggle-container">
                    <div className="duration-toggle glass-panel">
                        {['1', '3', '6'].map((d) => (
                            <button
                                key={d}
                                className={clsx('toggle-btn', { active: duration === d })}
                                onClick={() => setDuration(d)}
                            >
                                {d} Month{d !== '1' && 's'} Access
                            </button>
                        ))}
                    </div>
                </div>

                <div className="pricing-grid">
                    {/* Starter Plan (Free) */}
                    <Card className="pricing-card">
                        <div className="plan-header">
                            <h3>Starter</h3>
                            <div className="price">Free</div>
                            <p className="plan-desc">Trust-building without consuming mentor time.</p>
                        </div>
                        <ul className="plan-features">
                            <li><Check size={16} className="feature-check" /> 1–2 Starter Project Briefs</li>
                            <li><Check size={16} className="feature-check" /> Read-only Community Access</li>
                            <li className="text-muted line-through opacity-60"><Check size={16} className="feature-check opacity-0" /> No Submissions</li>
                            <li className="text-muted line-through opacity-60"><Check size={16} className="feature-check opacity-0" /> No Mentor Reviews</li>
                        </ul>
                        <Button variant="outline" className="w-full" onClick={() => handleSelectPlan('starter')}>Current Plan</Button>
                    </Card>

                    {/* Pro Plan */}
                    <Card className="pricing-card featured" glass>
                        <div className="featured-label">Recommended</div>
                        <div className="plan-header">
                            <h3>Pro</h3>
                            <div className="price">£{pricingData.pro[duration]}<span className="period">/mo</span></div>
                            <p className="plan-desc">Core learning, troubleshooting, and portfolio building.</p>
                            {duration !== '1' && (
                                <p className="text-xs text-primary mt-1 font-medium">{duration} months access</p>
                            )}
                        </div>
                        <ul className="plan-features">
                            <li><Check size={16} className="feature-check" /> All Project Tracks Access</li>
                            <li><Check size={16} className="feature-check" /> GitHub Submissions & Reviews</li>
                            <li><Check size={16} className="feature-check" /> Standard 72h Review SLA</li>
                            <li><Check size={16} className="feature-check" /> CV Optimisation (Project-focused)</li>
                            <li><Check size={16} className="feature-check" /> Direct 1-on-1 Mentor Access (Private Channel)</li>
                            <li><Check size={16} className="feature-check" /> Full Community Access</li>
                        </ul>
                        <Button variant="primary" size="lg" className="w-full" onClick={() => handleSelectPlan('pro')}>Upgrade to Pro</Button>
                    </Card>

                    {/* Elite Plan */}
                    <Card className="pricing-card">
                        <div className="plan-header">
                            <h3>Elite</h3>
                            <div className="price">£{pricingData.elite[duration]}<span className="period">/mo</span></div>
                            <p className="plan-desc">High-touch, fast-track career transformation.</p>
                            {duration !== '1' && (
                                <p className="text-xs text-primary mt-1 font-medium">{duration} months access</p>
                            )}
                        </div>
                        <ul className="plan-features">
                            <li><Check size={16} className="feature-check" /> <strong>Priority</strong> Async Reviews (24-48h)</li>
                            <li><Check size={16} className="feature-check" /> Direct 1-on-1 Mentor Access (Private Channel)</li>
                            <li><Check size={16} className="feature-check" /> System Design Deep-Dives</li>
                            <li><Check size={16} className="feature-check" /> Interview Prep & Mock Interviews</li>
                            <li><Check size={16} className="feature-check" /> Professional References</li>
                        </ul>
                        <Button variant="outline" className="w-full" onClick={() => handleSelectPlan('elite')}>Get Elite Status</Button>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Pricing;
