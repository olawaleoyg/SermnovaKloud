import React from 'react';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';

const RoleSwitcher = () => {
    const { user, loginAsFree, loginAsSubscriber, loginAsAdmin, logout } = useAuth();

    return (
        <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-xl border border-gray-200 z-50 flex flex-col gap-2 max-w-xs">
            <div className="text-xs font-bold uppercase text-gray-500 mb-1">Simulate Role</div>
            <div className="text-sm font-semibold mb-2">Current: <span className="text-primary">{user.role}</span></div>
            <div className="flex flex-wrap gap-2">
                <Button size="sm" variant={user.role === 'guest' ? 'primary' : 'outline'} onClick={logout}>Guest</Button>
                <Button size="sm" variant={user.role === 'free' ? 'primary' : 'outline'} onClick={loginAsFree}>Free User</Button>
                <Button size="sm" variant={user.role === 'subscriber' ? 'primary' : 'outline'} onClick={loginAsSubscriber}>Subscriber</Button>
                <Button size="sm" variant={user.role === 'admin' ? 'primary' : 'outline'} onClick={loginAsAdmin}>Admin</Button>
            </div>
        </div>
    );
};

export default RoleSwitcher;
