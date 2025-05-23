import React from "react";
import { Routes, Route } from "react-router-dom";
import { FitnessProvider } from "./context/FitnessContext";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import WorkoutLogger from "./components/WorkoutLogger";
import ActivitySummary from "./components/ActivitySummary";
import GoalSetting from "./components/GoalSetting";
import "./styles/tailwind.css";

const App = () => {
  return (
    <FitnessProvider>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/workout/new" element={<WorkoutLogger />} />
            <Route path="/workout/edit/:workoutId" element={<WorkoutLogger />} />
            <Route path="/activities" element={<ActivitySummary />} />
            <Route path="/goals" element={<GoalSetting />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </FitnessProvider>
  );
};

// Simple footer component
const Footer = () => {
  return (
    <footer className="bg-white shadow-inner py-4 text-center text-gray-500 text-sm mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24" height="24"><rect width="256" height="256" fill="none"/><rect x="40" y="40" width="176" height="176" rx="8" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><path d="M156,180.67c0-21,32-21.34,32-42.67s-32-21.67-32-42.67c0-20.59,32-21.33,32-42.66" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><path d="M100,180.67c0-21-32-21.34-32-42.67s32-21.67,32-42.67c0-20.59-32-21.33-32-42.66" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line x1="128" y1="48" x2="128" y2="208" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/></svg>
              <span className="ml-2 font-semibold">FitTrack Lite</span>
            </span>
            <span className="ml-4">&copy; {new Date().getFullYear()} All Rights Reserved</span>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-indigo-600 transition-colors">Terms</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Privacy</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// 404 Not Found page
const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-16rem)] text-center px-4">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="96" height="96"><rect width="256" height="256" fill="none"/><circle cx="128" cy="128" r="96" fill="none" stroke="#6366F1" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line x1="160" y1="96" x2="96" y2="160" fill="none" stroke="#6366F1" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line x1="96" y1="96" x2="160" y2="160" fill="none" stroke="#6366F1" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/></svg>
      <h1 className="mt-8 text-4xl font-bold text-gray-900">Page Not Found</h1>
      <p className="mt-4 text-lg text-gray-600">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <div className="mt-8">
        <a
          href="/"
          className="inline-flex items-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20" height="20"><rect width="256" height="256" fill="none"/><line x1="216" y1="128" x2="40" y2="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><polyline points="112 56 40 128 112 200" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/></svg>
          <span className="ml-2">Back to Dashboard</span>
        </a>
      </div>
    </div>
  );
};

export default App;