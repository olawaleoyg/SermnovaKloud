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

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/learner" element={<LearnerDashboard />} />
        <Route path="/submission/:id" element={<SubmissionView />} />
        <Route path="/tracks" element={<Tracks />} />
        <Route path="/tracks/:id" element={<TrackDetail />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/mentor" element={<MentorDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
      <RoleSwitcher />
    </>
  );
};

export default App;
