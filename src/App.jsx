import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import LearnerDashboard from './pages/LearnerDashboard';
import MentorDashboard from './pages/MentorDashboard';
import SubmissionView from './pages/SubmissionView';
import Tracks from './pages/Tracks';
import TrackDetail from './pages/TrackDetail';
import AdminDashboard from './pages/AdminDashboard';
import Pricing from './pages/Pricing';
import RoleSwitcher from './components/common/RoleSwitcher';
import Signup from './pages/Signup';
import Login from './pages/Login';
import ProtectedRoute from './components/auth/ProtectedRoute';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route path="/learner" element={<ProtectedRoute><LearnerDashboard /></ProtectedRoute>} />
        <Route path="/submission/:id" element={<ProtectedRoute><SubmissionView /></ProtectedRoute>} />
        <Route path="/tracks" element={<ProtectedRoute><Tracks /></ProtectedRoute>} />
        <Route path="/tracks/:id" element={<ProtectedRoute><TrackDetail /></ProtectedRoute>} />
        <Route path="/mentor" element={<ProtectedRoute><MentorDashboard /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
      </Routes>
      <RoleSwitcher />
    </>
  );
};

export default App;
