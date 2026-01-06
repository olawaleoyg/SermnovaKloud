import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockAuthService } from '../services/mockAuthService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({ role: 'guest' });
    const [loading, setLoading] = useState(false);

    // Load session from localStorage on mount
    useEffect(() => {
        const storedUser = localStorage.getItem('sermnova_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const loginWithOtp = async (email, code) => {
        setLoading(true);
        try {
            const userData = await mockAuthService.verifyOtp(email, code);
            // Determine role string based on subscription for compatibility with existing components
            const role = userData.role === 'admin' ? 'admin' : (userData.isSubscriber ? 'subscriber' : 'free');

            const finalUser = { ...userData, role };
            setUser(finalUser);
            localStorage.setItem('sermnova_user', JSON.stringify(finalUser));
            return true;
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const requestOtp = async (email) => {
        await mockAuthService.sendOtp(email);
    };

    // Deprecated simulations (kept for compatibility if needed, but Login UI is preferred)
    const loginAsFree = () => {
        const u = { email: 'demo@free.com', role: 'free', isSubscriber: false };
        setUser(u);
        localStorage.setItem('sermnova_user', JSON.stringify(u));
    };
    const loginAsSubscriber = () => {
        const u = { email: 'demo@pro.com', role: 'subscriber', isSubscriber: true };
        setUser(u);
        localStorage.setItem('sermnova_user', JSON.stringify(u));
    };
    const loginAsAdmin = () => {
        const u = { email: 'admin@sermnova.com', role: 'admin', isSubscriber: true };
        setUser(u);
        localStorage.setItem('sermnova_user', JSON.stringify(u));
    };

    const logout = () => {
        setUser({ role: 'guest' });
        localStorage.removeItem('sermnova_user');
    };

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            loginWithOtp,
            requestOtp,
            loginAsFree,
            loginAsSubscriber,
            loginAsAdmin,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
