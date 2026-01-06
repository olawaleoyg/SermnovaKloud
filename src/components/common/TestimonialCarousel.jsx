import React, { useState, useEffect } from 'react';
import './TestimonialCarousel.css';

const testimonials = [
    {
        id: 1,
        quote: "The async reviews allowed me to keep my full-time job while preparing for interviews. I landed a senior role at Stripe thanks to the systematic feedback.",
        author: "Sarah Chen",
        role: "Senior Frontend Engineer",
        company: "Stripe"
    },
    {
        id: 2,
        quote: "Sermnova's mentors don't just clear code; they teach you how to think about system design. The mock interview sessions were indistinguishable from the real thing.",
        author: "David Okonjo",
        role: "Backend Developer",
        company: "Spotify"
    },
    {
        id: 3,
        quote: "I was stuck at mid-level for 3 years. The curated path forced me to fill gaps in my knowledge I didn't even know I had. Best investment in my career.",
        author: "Elena Rodriguez",
        role: "Full Stack Engineer",
        company: "Airbnb"
    },
    {
        id: 4,
        quote: "The project-based learning approach is superior to LeetCode grinding. You actually build things, which gives you so much more to talk about during interviews.",
        author: "James Wilson",
        role: "Software Engineer II",
        company: "Uber"
    }
];

const TestimonialCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="testimonial-carousel-container glass-panel">
            <div className="testimonial-track" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {testimonials.map((t) => (
                    <div className="testimonial-slide" key={t.id}>
                        <div className="testimonial-content">
                            <p className="testimonial-quote">"{t.quote}"</p>
                            <div className="testimonial-author">
                                <div className="author-avatar">{t.author.charAt(0)}</div>
                                <div className="author-info">
                                    <h4 className="author-name">{t.author}</h4>
                                    <p className="author-role">{t.role} at {t.company}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Optional Progress Bar/Dots - keeping it minimal as requested "no slider controls" */}
            <div className="carousel-indicators">
                {testimonials.map((_, idx) => (
                    <div
                        key={idx}
                        className={`indicator-dot ${idx === currentIndex ? 'active' : ''}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default TestimonialCarousel;
