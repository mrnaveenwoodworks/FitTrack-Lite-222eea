import React from "react";
import { format } from "date-fns";
import { intensityLevels, workoutTypes } from "../context/FitnessContext";

const ActivityCard = ({ workout, onEdit, onDelete, showActions = true }) => {
  const { type, date, duration, intensity, notes, calories } = workout;

  // Find the workout type to get its icon
  const workoutTypeObj = workoutTypes.find((w) => w.id === type) || workoutTypes[0];
  
  // Find the intensity level to get its color class
  const intensityObj = intensityLevels.find((i) => i.id === intensity) || intensityLevels[0];

  // Format the date
  const formattedDate = format(new Date(date), "MMM d, yyyy");

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex items-center">
          <div className="w-10 h-10 flex-shrink-0 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mr-4">
            {workoutTypeObj.icon}
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900 capitalize">
              {workoutTypeObj.label}
            </h3>
            <p className="text-gray-500 text-sm">{formattedDate}</p>
          </div>
        </div>
        
        {showActions && (
          <div className="flex space-x-2">
            <button
              onClick={() => onEdit(workout)}
              className="text-blue-500 hover:text-blue-700 transition-colors"
              aria-label="Edit workout"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="18" height="18"><rect width="256" height="256" fill="none"/><rect x="152" y="40" width="64" height="176" rx="8" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="152" y1="88" x2="180" y2="88" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="152" y1="128" x2="180" y2="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="152" y1="168" x2="180" y2="168" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M40,64,72,32l32,32V208a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="104" y1="80" x2="40" y2="80" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="104" y1="176" x2="40" y2="176" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
            </button>
            <button
              onClick={() => onDelete(workout.id)}
              className="text-red-500 hover:text-red-700 transition-colors"
              aria-label="Delete workout"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="18" height="18"><rect width="256" height="256" fill="none"/><line x1="216" y1="60" x2="40" y2="60" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="88" y1="20" x2="168" y2="20" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M200,60V208a8,8,0,0,1-8,8H64a8,8,0,0,1-8-8V60" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
            </button>
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div className="text-center p-2 bg-gray-50 rounded">
          <p className="text-xs text-gray-500">Duration</p>
          <p className="font-medium">{duration} min</p>
        </div>
        <div className="text-center p-2 bg-gray-50 rounded">
          <p className="text-xs text-gray-500">Intensity</p>
          <p className={`font-medium text-sm px-2 py-1 rounded-full inline-block ${intensityObj.color}`}>
            {intensityObj.label}
          </p>
        </div>
        <div className="text-center p-2 bg-gray-50 rounded">
          <p className="text-xs text-gray-500">Calories</p>
          <p className="font-medium">{calories}</p>
        </div>
      </div>
      
      {notes && (
        <div className="mt-4 p-3 bg-gray-50 rounded-md">
          <p className="text-xs text-gray-500 mb-1">Notes</p>
          <p className="text-sm text-gray-700">{notes}</p>
        </div>
      )}
    </div>
  );
};

export default ActivityCard;