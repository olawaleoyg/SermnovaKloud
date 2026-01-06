import React from 'react';
import clsx from 'clsx';
import './Card.css';

const Card = ({ children, className, glass = false, ...props }) => {
    return (
        <div
            className={clsx('card', { 'glass-panel': glass }, className)}
            {...props}
        >
            {children}
        </div>
    );
};

export default Card;
