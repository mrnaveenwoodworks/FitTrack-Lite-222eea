import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFitness, workoutTypes, intensityLevels } from "../context/FitnessContext";
import { format } from "date-fns";

const WorkoutLogger = () => {
  const navigate = useNavigate();
  const { workoutId } = useParams();
  const { workouts, addWorkout, editWorkout } = useFitness();

  // Initial state for a new workout
  const initialWorkout = {
    type: "running",
    duration: 30,
    intensity: "medium",
    date: format(new Date(), "yyyy-MM-dd"),
    notes: "",
  };

  const [workout, setWorkout] = useState(initialWorkout);
  const [errors, setErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  // Check if we're editing an existing workout
  useEffect(() => {
    if (workoutId) {
      const existingWorkout = workouts.find((w) => w.id === workoutId);
      if (existingWorkout) {
        setWorkout(existingWorkout);
        setIsEditing(true);
      } else {
        // Handle invalid workout ID
        navigate("/workout/new");
      }
    }
  }, [workoutId, workouts, navigate]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setWorkout((prev) => ({ ...prev, [name]: value }));
    
    // Clear validation error when field is updated
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    
    if (!workout.type) {
      newErrors.type = "Please select a workout type";
    }
    
    if (!workout.duration || workout.duration <= 0) {
      newErrors.duration = "Duration must be greater than 0";
    }
    
    if (!workout.intensity) {
      newErrors.intensity = "Please select an intensity level";
    }
    
    if (!workout.date) {
      newErrors.date = "Please select a date";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    if (isEditing) {
      editWorkout(workout);
    } else {
      addWorkout(workout);
    }
    
    // Navigate back to activities or dashboard
    navigate("/activities");
  };

  // Get workout type icon
  const getWorkoutTypeIcon = (typeId) => {
    const foundType = workoutTypes.find((w) => w.id === typeId);
    return foundType ? foundType.icon : null;
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          {isEditing ? "Edit Workout" : "Log New Workout"}
        </h1>
        <p className="text-gray-600 mt-2">
          {isEditing ? "Update your workout details below" : "Track your fitness activity by logging your workout below"}
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit}>
          {/* Workout Type */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Workout Type
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {workoutTypes.map((type) => (
                <div
                  key={type.id}
                  onClick={() => setWorkout((prev) => ({ ...prev, type: type.id }))}
                  className={`border rounded-lg p-4 cursor-pointer transition-colors flex flex-col items-center ${
                    workout.type === type.id
                      ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <div className="text-center mb-2">
                    {type.icon}
                  </div>
                  <span className={workout.type === type.id ? "font-medium" : ""}>
                    {type.label}
                  </span>
                </div>
              ))}
            </div>
            {errors.type && (
              <p className="mt-1 text-sm text-red-600">{errors.type}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Duration */}
            <div>
              <label
                htmlFor="duration"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Duration (minutes)
              </label>
              <div className="relative rounded-md shadow-sm">
                <input
                  type="number"
                  name="duration"
                  id="duration"
                  value={workout.duration}
                  onChange={handleChange}
                  min="1"
                  max="1440"
                  className={`block w-full pr-10 focus:outline-none sm:text-sm rounded-md py-2 px-3 ${
                    errors.duration
                      ? "border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                  }`}
                  placeholder="30"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="18" height="18"><rect width="256" height="256" fill="none"/><circle cx="128" cy="140" r="84" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="128" y1="136" x2="156" y2="108" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="104" y1="16" x2="152" y2="16" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
                </div>
              </div>
              {errors.duration && (
                <p className="mt-1 text-sm text-red-600">{errors.duration}</p>
              )}
            </div>

            {/* Date */}
            <div>
              <label
                htmlFor="date"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Date
              </label>
              <div className="relative rounded-md shadow-sm">
                <input
                  type="date"
                  name="date"
                  id="date"
                  value={workout.date}
                  onChange={handleChange}
                  max={format(new Date(), "yyyy-MM-dd")}
                  className={`block w-full focus:outline-none sm:text-sm rounded-md py-2 px-3 ${
                    errors.date
                      ? "border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                  }`}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="18" height="18"><rect width="256" height="256" fill="none"/><rect x="40" y="40" width="176" height="176" rx="8" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="176" y1="24" x2="176" y2="52" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="80" y1="24" x2="80" y2="52" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="40" y1="88" x2="216" y2="88" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><polyline points="84 132 100 124 100 180" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M138.14,132a16,16,0,1,1,26.64,17.63L136,180h32" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
                </div>
              </div>
              {errors.date && (
                <p className="mt-1 text-sm text-red-600">{errors.date}</p>
              )}
            </div>
          </div>

          {/* Intensity */}
          <div className="mt-6 mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Intensity Level
            </label>
            <div className="flex flex-wrap gap-4">
              {intensityLevels.map((level) => (
                <div
                  key={level.id}
                  onClick={() => setWorkout((prev) => ({ ...prev, intensity: level.id }))}
                  className={`border rounded-full py-2 px-4 cursor-pointer transition-colors ${
                    workout.intensity === level.id
                      ? level.color
                      : "border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    {workout.intensity === level.id && (
                      <span className="text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="16" height="16"><rect width="256" height="256" fill="none"/><polyline points="88 136 112 160 168 104" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
                      </span>
                    )}
                    <span className={workout.intensity === level.id ? "font-medium" : ""}>
                      {level.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            {errors.intensity && (
              <p className="mt-1 text-sm text-red-600">{errors.intensity}</p>
            )}
          </div>

          {/* Notes */}
          <div className="mb-6">
            <label
              htmlFor="notes"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Notes (Optional)
            </label>
            <textarea
              id="notes"
              name="notes"
              rows="3"
              value={workout.notes}
              onChange={handleChange}
              className="shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
              placeholder="Add any additional details about your workout..."
            ></textarea>
          </div>

          {/* Preview Card */}
          <div className="mb-6 p-4 border border-dashed border-gray-300 rounded-lg bg-gray-50">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Workout Summary</h3>
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 flex-shrink-0 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mr-3">
                {getWorkoutTypeIcon(workout.type)}
              </div>
              <div>
                <h4 className="font-medium text-gray-900 capitalize">
                  {workoutTypes.find((w) => w.id === workout.type)?.label || workout.type}
                </h4>
                <p className="text-sm text-gray-500">
                  {workout.date ? format(new Date(workout.date), "MMMM d, yyyy") : "Today"}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-2 bg-white rounded shadow-sm">
                <p className="text-xs text-gray-500 mb-1">Duration</p>
                <p className="font-medium">{workout.duration} min</p>
              </div>
              <div className="text-center p-2 bg-white rounded shadow-sm">
                <p className="text-xs text-gray-500 mb-1">Intensity</p>
                <p className={`inline-block px-2 py-1 text-xs rounded-full font-medium ${
                  intensityLevels.find((i) => i.id === workout.intensity)?.color || ""
                }`}>
                  {intensityLevels.find((i) => i.id === workout.intensity)?.label || workout.intensity}
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent text-white font-medium rounded-md bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isEditing ? "Update Workout" : "Log Workout"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WorkoutLogger;