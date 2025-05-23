import React, { createContext, useContext, useState, useEffect } from "react";
import { format } from "date-fns";

// Create the FitnessContext
const FitnessContext = createContext();

// Custom hook to use the fitness context
export const useFitness = () => {
  return useContext(FitnessContext);
};

// Workout types with their icons
export const workoutTypes = [
  { id: "running", label: "Running", icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24" height="24"><rect width="256" height="256" fill="none"/><path d="M40,156H76.69a8,8,0,0,1,5.65,2.34l19.32,19.32a8,8,0,0,0,5.65,2.34h41.38a8,8,0,0,0,5.65-2.34l19.32-19.32a8,8,0,0,1,5.65-2.34H216" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><rect x="40" y="40" width="176" height="176" rx="8" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="128" y1="76" x2="128" y2="140" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><polyline points="96 108 128 140 160 108" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg> },
  { id: "cycling", label: "Cycling", icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24" height="24"><rect width="256" height="256" fill="none"/><line x1="200" y1="56" x2="200" y2="36" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="200" y1="56" x2="180.98" y2="49.82" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="200" y1="56" x2="188.24" y2="72.18" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="200" y1="56" x2="211.76" y2="72.18" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="200" y1="56" x2="219.02" y2="49.82" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><circle cx="128" cy="120" r="40" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M63.8,199.37a72,72,0,0,1,128.4,0" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M222.67,112A95.92,95.92,0,1,1,144,33.33" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg> },
  { id: "swimming", label: "Swimming", icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24" height="24"><rect width="256" height="256" fill="none"/><line x1="88" y1="52" x2="168" y2="52" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="88" y1="88" x2="168" y2="88" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="88" y1="124" x2="168" y2="124" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="88" y1="32" x2="88" y2="137.39" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="168" y1="32" x2="168" y2="139.29" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M32,164c24,0,24,16,48,16s24-16,48-16,24,16,48,16,24-16,48-16" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M32,208c24,0,24,16,48,16s24-16,48-16,24,16,48,16,24-16,48-16" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg> },
  { id: "weights", label: "Weights", icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24" height="24"><rect width="256" height="256" fill="none"/><rect x="60" y="56" width="40" height="144" rx="8" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><rect x="156" y="56" width="40" height="144" rx="8" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M196,80h28a8,8,0,0,1,8,8v80a8,8,0,0,1-8,8H196" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M60,176H32a8,8,0,0,1-8-8V88a8,8,0,0,1,8-8H60" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="100" y1="128" x2="156" y2="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="232" y1="128" x2="244" y2="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="12" y1="128" x2="24" y2="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg> },
  { id: "yoga", label: "Yoga", icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24" height="24"><rect width="256" height="256" fill="none"/><path d="M80,56h24a0,0,0,0,1,0,0v72a24,24,0,0,1-24,24h0a24,24,0,0,1-24-24V80A24,24,0,0,1,80,56Z" transform="translate(184 24) rotate(90)" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M128,80H104A24,24,0,0,1,80,56h0a24,24,0,0,1,24-24h0a24,24,0,0,1,24,24Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M152,32h24a0,0,0,0,1,0,0v72a24,24,0,0,1-24,24h0a24,24,0,0,1-24-24V56a24,24,0,0,1,24-24Z" transform="translate(304 160) rotate(-180)" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M176,128V104a24,24,0,0,1,24-24h0a24,24,0,0,1,24,24h0a24,24,0,0,1-24,24Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M176,104h24a0,0,0,0,1,0,0v72a24,24,0,0,1-24,24h0a24,24,0,0,1-24-24V128a24,24,0,0,1,24-24Z" transform="translate(24 328) rotate(-90)" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M128,176h24a24,24,0,0,1,24,24h0a24,24,0,0,1-24,24h0a24,24,0,0,1-24-24Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M104,128h24a0,0,0,0,1,0,0v72a24,24,0,0,1-24,24h0a24,24,0,0,1-24-24V152A24,24,0,0,1,104,128Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M80,128v24a24,24,0,0,1-24,24h0a24,24,0,0,1-24-24h0a24,24,0,0,1,24-24Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg> },
  { id: "other", label: "Other", icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24" height="24"><rect width="256" height="256" fill="none"/><circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="88" y1="128" x2="168" y2="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><polyline points="136 96 168 128 136 160" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg> },
];

// Intensity levels
export const intensityLevels = [
  { id: "low", label: "Low", color: "bg-green-100 text-green-800" },
  { id: "medium", label: "Medium", color: "bg-yellow-100 text-yellow-800" },
  { id: "high", label: "High", color: "bg-red-100 text-red-800" },
];

// Provider component
export const FitnessProvider = ({ children }) => {
  // Initialize state from localStorage or with defaults
  const [workouts, setWorkouts] = useState(() => {
    const savedWorkouts = localStorage.getItem("fittrack_workouts");
    return savedWorkouts
      ? JSON.parse(savedWorkouts)
      : [
          {
            id: "sample-1",
            type: "running",
            date: format(new Date(), "yyyy-MM-dd"),
            duration: 30,
            intensity: "medium",
            notes: "Morning run around the neighborhood",
            calories: 250,
          },
          {
            id: "sample-2",
            type: "yoga",
            date: format(new Date(Date.now() - 86400000), "yyyy-MM-dd"),
            duration: 45,
            intensity: "low",
            notes: "Evening yoga session",
            calories: 180,
          },
        ];
  });

  const [goals, setGoals] = useState(() => {
    const savedGoals = localStorage.getItem("fittrack_goals");
    return savedGoals
      ? JSON.parse(savedGoals)
      : [
          {
            id: "goal-1",
            title: "Run 20 miles per week",
            targetType: "running",
            targetValue: 20,
            unit: "miles",
            deadline: format(new Date(Date.now() + 7 * 86400000), "yyyy-MM-dd"),
            currentProgress: 5,
          },
          {
            id: "goal-2",
            title: "Exercise 5 times per week",
            targetType: "frequency",
            targetValue: 5,
            unit: "workouts",
            deadline: format(new Date(Date.now() + 7 * 86400000), "yyyy-MM-dd"),
            currentProgress: 2,
          },
        ];
  });

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem("fittrack_workouts", JSON.stringify(workouts));
  }, [workouts]);

  useEffect(() => {
    localStorage.setItem("fittrack_goals", JSON.stringify(goals));
  }, [goals]);

  // Add a new workout
  const addWorkout = (workout) => {
    const newWorkout = {
      ...workout,
      id: `workout-${Date.now()}`,
      date: workout.date || format(new Date(), "yyyy-MM-dd"),
      calories: estimateCalories(workout.type, workout.duration, workout.intensity),
    };
    
    setWorkouts((prev) => [newWorkout, ...prev]);
    updateGoalProgress(newWorkout);
  };

  // Delete a workout
  const deleteWorkout = (workoutId) => {
    setWorkouts((prev) => prev.filter((w) => w.id !== workoutId));
    // We might need to recalculate goal progress here
    recalculateAllGoalProgress();
  };

  // Edit a workout
  const editWorkout = (updatedWorkout) => {
    setWorkouts((prev) =>
      prev.map((w) =>
        w.id === updatedWorkout.id
          ? {
              ...updatedWorkout,
              calories: estimateCalories(
                updatedWorkout.type,
                updatedWorkout.duration,
                updatedWorkout.intensity
              ),
            }
          : w
      )
    );
    // Recalculate goal progress
    recalculateAllGoalProgress();
  };

  // Add a new goal
  const addGoal = (goal) => {
    const newGoal = {
      ...goal,
      id: `goal-${Date.now()}`,
      currentProgress: 0,
    };
    setGoals((prev) => [...prev, newGoal]);
  };

  // Delete a goal
  const deleteGoal = (goalId) => {
    setGoals((prev) => prev.filter((g) => g.id !== goalId));
  };

  // Edit a goal
  const editGoal = (updatedGoal) => {
    setGoals((prev) =>
      prev.map((g) => (g.id === updatedGoal.id ? updatedGoal : g))
    );
  };

  // Update goal progress based on a new workout
  const updateGoalProgress = (workout) => {
    setGoals((prev) =>
      prev.map((goal) => {
        // For type-specific goals (e.g., running distance)
        if (goal.targetType === workout.type) {
          return {
            ...goal,
            currentProgress: goal.currentProgress + calculateContribution(workout, goal),
          };
        }
        // For frequency goals (any workout counts)
        else if (goal.targetType === "frequency") {
          return {
            ...goal,
            currentProgress: Math.min(goal.currentProgress + 1, goal.targetValue),
          };
        }
        return goal;
      })
    );
  };

  // Recalculate progress for all goals based on all workouts
  const recalculateAllGoalProgress = () => {
    setGoals((prevGoals) =>
      prevGoals.map((goal) => {
        // Reset progress
        let progress = 0;

        // Calculate progress based on relevant workouts
        workouts.forEach((workout) => {
          if (goal.targetType === workout.type) {
            progress += calculateContribution(workout, goal);
          } else if (goal.targetType === "frequency") {
            // Count each workout once for frequency goals
            progress += 1;
          }
        });

        // For frequency goals, cap at the target value
        if (goal.targetType === "frequency") {
          progress = Math.min(progress, goal.targetValue);
        }

        return {
          ...goal,
          currentProgress: progress,
        };
      })
    );
  };

  // Calculate how much a workout contributes to a goal
  const calculateContribution = (workout, goal) => {
    // Basic conversion factors (simplified)
    const conversionFactors = {
      running: {
        miles: workout.duration / 10, // Rough estimate: 10 mins per mile
        calories: workout.calories,
        minutes: workout.duration,
      },
      cycling: {
        miles: workout.duration / 4, // Rough estimate: 4 mins per mile
        calories: workout.calories,
        minutes: workout.duration,
      },
      swimming: {
        laps: workout.duration / 2, // Rough estimate: 2 mins per lap
        calories: workout.calories,
        minutes: workout.duration,
      },
      weights: {
        sets: workout.duration / 5, // Rough estimate: 5 mins per set
        calories: workout.calories,
        minutes: workout.duration,
      },
      yoga: {
        sessions: 1,
        calories: workout.calories,
        minutes: workout.duration,
      },
      other: {
        minutes: workout.duration,
        calories: workout.calories,
      },
    };

    // Return contribution based on workout type and goal unit
    return conversionFactors[workout.type]?.[goal.unit] || 0;
  };

  // Helper function to estimate calories burned
  const estimateCalories = (type, duration, intensity) => {
    // Basic MET (Metabolic Equivalent of Task) values by activity
    const metValues = {
      running: { low: 7, medium: 10, high: 12.5 },
      cycling: { low: 4, medium: 8, high: 10 },
      swimming: { low: 6, medium: 8, high: 10 },
      weights: { low: 3, medium: 5, high: 6 },
      yoga: { low: 2.5, medium: 4, high: 6 },
      other: { low: 3, medium: 5, high: 8 },
    };

    // Assume average weight of 70kg (154 lbs)
    const weight = 70;
    
    // Calories = MET * weight in kg * duration in hours
    const met = metValues[type]?.[intensity] || metValues.other.medium;
    const durationInHours = duration / 60;
    
    return Math.round(met * weight * durationInHours);
  };

  // Get statistics for the dashboard
  const getStats = () => {
    if (workouts.length === 0) return { totalWorkouts: 0 };
    
    const totalWorkouts = workouts.length;
    const totalDuration = workouts.reduce((sum, w) => sum + Number(w.duration), 0);
    const totalCalories = workouts.reduce((sum, w) => sum + Number(w.calories), 0);
    
    // Count by type
    const countByType = workouts.reduce((acc, workout) => {
      acc[workout.type] = (acc[workout.type] || 0) + 1;
      return acc;
    }, {});
    
    // Most popular workout type
    const mostPopularType = Object.entries(countByType).sort((a, b) => b[1] - a[1])[0]?.[0] || "none";
    
    // Weekly stats
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    
    const workoutsThisWeek = workouts.filter(w => new Date(w.date) >= oneWeekAgo).length;
    
    return {
      totalWorkouts,
      totalDuration,
      totalCalories,
      mostPopularType,
      workoutsThisWeek
    };
  };

  // Filter workouts by date, type, etc.
  const filterWorkouts = (filters) => {
    return workouts.filter(workout => {
      // Filter by date range if specified
      if (filters.startDate && new Date(workout.date) < new Date(filters.startDate)) {
        return false;
      }
      if (filters.endDate && new Date(workout.date) > new Date(filters.endDate)) {
        return false;
      }
      
      // Filter by type if specified
      if (filters.type && workout.type !== filters.type) {
        return false;
      }
      
      // Filter by intensity if specified
      if (filters.intensity && workout.intensity !== filters.intensity) {
        return false;
      }
      
      return true;
    });
  };

  // Value to be provided to consumers
  const value = {
    workouts,
    goals,
    addWorkout,
    editWorkout,
    deleteWorkout,
    addGoal,
    editGoal,
    deleteGoal,
    workoutTypes,
    intensityLevels,
    getStats,
    filterWorkouts
  };

  return (
    <FitnessContext.Provider value={value}>
      {children}
    </FitnessContext.Provider>
  );
};

export default FitnessContext;