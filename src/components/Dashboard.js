import React from "react";
import { useNavigate } from "react-router-dom";
import { useFitness } from "../context/FitnessContext";
import ActivityCard from "./ActivityCard";
import GoalProgressCard from "./GoalProgressCard";

const Dashboard = () => {
  const navigate = useNavigate();
  const { workouts, goals, getStats } = useFitness();
  
  const stats = getStats();
  const recentWorkouts = workouts.slice(0, 3);
  const activeGoals = goals.filter(goal => new Date(goal.deadline) >= new Date()).slice(0, 3);

  const StatCard = ({ title, value, icon }) => (
    <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
        <div className="text-indigo-600">
          {icon}
        </div>
      </div>
      <p className="text-2xl font-semibold text-gray-900">{value}</p>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Welcome to FitTrack Lite</h1>
        <p className="text-gray-600">Track your fitness journey and achieve your goals.</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Workouts"
          value={stats.totalWorkouts}
          icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24" height="24"><rect width="256" height="256" fill="none"/><path d="M160,40h40a8,8,0,0,1,8,8V216a8,8,0,0,1-8,8H56a8,8,0,0,1-8-8V48a8,8,0,0,1,8-8H96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M88,72V64a40,40,0,0,1,80,0v8Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>}
        />
        <StatCard
          title="This Week"
          value={stats.workoutsThisWeek}
          icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24" height="24"><rect width="256" height="256" fill="none"/><rect x="40" y="40" width="176" height="176" rx="8" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="176" y1="24" x2="176" y2="52" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="80" y1="24" x2="80" y2="52" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="40" y1="88" x2="216" y2="88" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><polyline points="92 152 116 176 164 128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>}
        />
        <StatCard
          title="Total Minutes"
          value={`${stats.totalDuration || 0} min`}
          icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24" height="24"><rect width="256" height="256" fill="none"/><circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><polyline points="128 72 128 128 184 128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>}
        />
        <StatCard
          title="Calories Burned"
          value={`${stats.totalCalories || 0} cal`}
          icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24" height="24"><rect width="256" height="256" fill="none"/><path d="M208,144c0-72-80-120-80-120S48,72,48,144a80,80,0,0,0,160,0Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M88,184a40,40,0,0,0,80,0c0-40-40-64-40-64S88,144,88,184Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>}
        />
      </div>

      {/* Active Goals Section */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">Active Goals</h2>
          <button
            onClick={() => navigate("/goals")}
            className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center"
          >
            View All
            {<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20" height="20"><rect width="256" height="256" fill="none"/><rect x="40" y="40" width="176" height="176" rx="8" transform="translate(0 256) rotate(-90)" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><polyline points="96 112 96 160 144 160" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="160" y1="96" x2="96" y2="160" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>}
          </button>
        </div>
        
        {activeGoals.length === 0 ? (
          <div className="text-center py-8 bg-white rounded-lg shadow-sm">
            <div className="text-gray-400 mb-3">
              {<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="48" height="48"><rect width="256" height="256" fill="none"/><line x1="128" y1="128" x2="224" y2="32" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M195.88,60.12A95.92,95.92,0,1,0,218,94.56" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M161.94,94.06a48,48,0,1,0,13.11,43.46" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>}
            </div>
            <h3 className="text-gray-900 font-medium mb-2">No Active Goals</h3>
            <p className="text-gray-500 mb-4">Start by setting some fitness goals for yourself</p>
            <button
              onClick={() => navigate("/goals/new")}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Set New Goal
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeGoals.map(goal => (
              <GoalProgressCard key={goal.id} goal={goal} />
            ))}
          </div>
        )}
      </section>

      {/* Recent Activities Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">Recent Activities</h2>
          <button
            onClick={() => navigate("/activities")}
            className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center"
          >
            View All
            {<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20" height="20"><rect width="256" height="256" fill="none"/><rect x="40" y="40" width="176" height="176" rx="8" transform="translate(0 256) rotate(-90)" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><polyline points="96 112 96 160 144 160" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="160" y1="96" x2="96" y2="160" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>}
          </button>
        </div>

        {recentWorkouts.length === 0 ? (
          <div className="text-center py-8 bg-white rounded-lg shadow-sm">
            <div className="text-gray-400 mb-3">
              {<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="48" height="48"><rect width="256" height="256" fill="none"/><circle cx="152" cy="56" r="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M56,109.6s32-25.67,80,7c50.47,34.3,80,20.85,80,20.85" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M110.64,161.16C128.47,165,176,180,176,232" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M133.51,114.9C125.7,141.36,95.88,206.39,32,200" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>}
            </div>
            <h3 className="text-gray-900 font-medium mb-2">No Workouts Yet</h3>
            <p className="text-gray-500 mb-4">Start tracking your fitness activities</p>
            <button
              onClick={() => navigate("/workout/new")}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Log Workout
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {recentWorkouts.map(workout => (
              <ActivityCard
                key={workout.id}
                workout={workout}
                onEdit={() => navigate(`/workout/edit/${workout.id}`)}
                onDelete={() => {/* Delete handler will be added */}}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Dashboard;