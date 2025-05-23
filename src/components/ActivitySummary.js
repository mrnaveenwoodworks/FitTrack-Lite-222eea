import React, { useState } from "react";
import { format, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from "date-fns";
import { useFitness, workoutTypes, intensityLevels } from "../context/FitnessContext";
import ActivityCard from "./ActivityCard";

const ActivitySummary = () => {
  const { workouts, filterWorkouts } = useFitness();
  
  // Filter state
  const [filters, setFilters] = useState({
    dateRange: "all",
    startDate: "",
    endDate: "",
    type: "",
    intensity: "",
    sortBy: "date-desc"
  });

  // Get date range options
  const getDateRange = (range) => {
    const today = new Date();
    switch (range) {
      case "week":
        return {
          startDate: format(startOfWeek(today), "yyyy-MM-dd"),
          endDate: format(endOfWeek(today), "yyyy-MM-dd")
        };
      case "month":
        return {
          startDate: format(startOfMonth(today), "yyyy-MM-dd"),
          endDate: format(endOfMonth(today), "yyyy-MM-dd")
        };
      default:
        return {
          startDate: "",
          endDate: ""
        };
    }
  };

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    
    if (name === "dateRange") {
      const { startDate, endDate } = getDateRange(value);
      setFilters(prev => ({
        ...prev,
        dateRange: value,
        startDate,
        endDate
      }));
    } else {
      setFilters(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Apply filters and sorting
  const filteredWorkouts = filterWorkouts(filters).sort((a, b) => {
    switch (filters.sortBy) {
      case "date-asc":
        return new Date(a.date) - new Date(b.date);
      case "duration-desc":
        return b.duration - a.duration;
      case "duration-asc":
        return a.duration - b.duration;
      case "calories-desc":
        return b.calories - a.calories;
      case "calories-asc":
        return a.calories - b.calories;
      default: // date-desc
        return new Date(b.date) - new Date(a.date);
    }
  });

  // Calculate summary statistics
  const summaryStats = filteredWorkouts.reduce((stats, workout) => {
    stats.totalWorkouts++;
    stats.totalDuration += workout.duration;
    stats.totalCalories += workout.calories;
    stats.byType[workout.type] = (stats.byType[workout.type] || 0) + 1;
    return stats;
  }, { totalWorkouts: 0, totalDuration: 0, totalCalories: 0, byType: {} });

  const StatCard = ({ icon, label, value }) => (
    <div className="bg-white rounded-lg p-4 shadow-sm flex items-center">
      <div className="p-3 rounded-full bg-indigo-100 text-indigo-600 mr-4">
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-xl font-semibold">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Activity Summary</h1>
        <p className="mt-2 text-gray-600">View and analyze your workout history</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Date Range Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date Range
            </label>
            <select
              name="dateRange"
              value={filters.dateRange}
              onChange={handleFilterChange}
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="all">All Time</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>

          {/* Custom Date Range */}
          {filters.dateRange === "custom" && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={filters.startDate}
                  onChange={handleFilterChange}
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={filters.endDate}
                  onChange={handleFilterChange}
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </>
          )}

          {/* Workout Type Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Workout Type
            </label>
            <select
              name="type"
              value={filters.type}
              onChange={handleFilterChange}
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">All Types</option>
              {workoutTypes.map(type => (
                <option key={type.id} value={type.id}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          {/* Intensity Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Intensity
            </label>
            <select
              name="intensity"
              value={filters.intensity}
              onChange={handleFilterChange}
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">All Intensities</option>
              {intensityLevels.map(level => (
                <option key={level.id} value={level.id}>
                  {level.label}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sort By
            </label>
            <select
              name="sortBy"
              value={filters.sortBy}
              onChange={handleFilterChange}
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="date-desc">Date (Newest)</option>
              <option value="date-asc">Date (Oldest)</option>
              <option value="duration-desc">Duration (Highest)</option>
              <option value="duration-asc">Duration (Lowest)</option>
              <option value="calories-desc">Calories (Highest)</option>
              <option value="calories-asc">Calories (Lowest)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24" height="24"><rect width="256" height="256" fill="none"/><path d="M160,40h40a8,8,0,0,1,8,8V216a8,8,0,0,1-8,8H56a8,8,0,0,1-8-8V48a8,8,0,0,1,8-8H96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M88,72V64a40,40,0,0,1,80,0v8Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>}
          label="Total Workouts"
          value={summaryStats.totalWorkouts}
        />
        <StatCard
          icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24" height="24"><rect width="256" height="256" fill="none"/><circle cx="128" cy="140" r="84" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="128" y1="136" x2="156" y2="108" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="104" y1="16" x2="152" y2="16" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>}
          label="Total Duration"
          value={`${summaryStats.totalDuration} min`}
        />
        <StatCard
          icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24" height="24"><rect width="256" height="256" fill="none"/><path d="M112,96l26.27-72C159.86,41.92,208,88.15,208,144a80,80,0,0,1-160,0c0-30.57,14.42-58.26,31-80Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>}
          label="Total Calories"
          value={`${summaryStats.totalCalories} cal`}
        />
        <StatCard
          icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24" height="24"><rect width="256" height="256" fill="none"/><line x1="96" y1="224" x2="160" y2="224" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="128" y1="184" x2="128" y2="224" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M58,128H48A32,32,0,0,1,16,96V80a8,8,0,0,1,8-8H56" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M198,128h10a32,32,0,0,0,32-32V80a8,8,0,0,0-8-8H200" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M56,48H200v63.1c0,39.7-31.75,72.6-71.45,72.9A72,72,0,0,1,56,112Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>}
          label="Most Common"
          value={Object.entries(summaryStats.byType).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A"}
        />
      </div>

      {/* Results Count */}
      <div className="flex justify-between items-center mb-4">
        <p className="text-gray-600">
          Showing {filteredWorkouts.length} {filteredWorkouts.length === 1 ? "workout" : "workouts"}
        </p>
        
        {Object.values(filters).some(value => value !== "") && (
          <button
            onClick={() => setFilters({
              dateRange: "all",
              startDate: "",
              endDate: "",
              type: "",
              intensity: "",
              sortBy: "date-desc"
            })}
            className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* Workouts List */}
      {filteredWorkouts.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <div className="text-gray-400 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="48" height="48"><rect width="256" height="256" fill="none"/><path d="M160,40h40a8,8,0,0,1,8,8V216a8,8,0,0,1-8,8H56a8,8,0,0,1-8-8V48a8,8,0,0,1,8-8H96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M88,72V64a40,40,0,0,1,80,0v8Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No workouts found</h3>
          <p className="text-gray-500">
            {Object.values(filters).some(value => value !== "") 
              ? "Try adjusting your filters to see more results"
              : "Start logging your workouts to see them here"}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredWorkouts.map(workout => (
            <ActivityCard
              key={workout.id}
              workout={workout}
              showActions={true}
              onEdit={() => {/* Handle edit */}}
              onDelete={() => {/* Handle delete */}}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ActivitySummary;