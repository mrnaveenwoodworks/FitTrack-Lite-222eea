import { format, startOfWeek, endOfWeek, startOfMonth, endOfMonth, addDays, parseISO, isSameDay, isSameWeek, isSameMonth, differenceInDays, isAfter, isBefore, isValid } from "date-fns";

/**
 * Format a date to display format (e.g., "Jan 15, 2024")
 * @param {Date|string} date - Date object or ISO string
 * @returns {string} Formatted date string
 */
export const formatDisplayDate = (date) => {
  if (!date) return "";
  const dateObj = typeof date === "string" ? parseISO(date) : date;
  return format(dateObj, "MMM d, yyyy");
};

/**
 * Format a date to ISO format (e.g., "2024-01-15")
 * @param {Date} date - Date object
 * @returns {string} ISO formatted date string
 */
export const formatISODate = (date) => {
  if (!date) return "";
  return format(date, "yyyy-MM-dd");
};

/**
 * Get date ranges for different periods
 * @param {string} period - "week" | "month" | "custom"
 * @param {Date} [baseDate] - Base date to calculate range from
 * @param {Date} [startDate] - Start date for custom range
 * @param {Date} [endDate] - End date for custom range
 * @returns {Object} Object containing start and end dates
 */
export const getDateRange = (period, baseDate = new Date(), startDate, endDate) => {
  switch (period) {
    case "week":
      return {
        start: startOfWeek(baseDate, { weekStartsOn: 1 }), // Week starts on Monday
        end: endOfWeek(baseDate, { weekStartsOn: 1 })
      };
    case "month":
      return {
        start: startOfMonth(baseDate),
        end: endOfMonth(baseDate)
      };
    case "custom":
      if (startDate && endDate) {
        return {
          start: parseISO(startDate),
          end: parseISO(endDate)
        };
      }
      return {
        start: baseDate,
        end: baseDate
      };
    default:
      return {
        start: new Date(0), // Beginning of time
        end: new Date() // Current date
      };
  }
};

/**
 * Check if a date is within a specified range
 * @param {Date|string} date - Date to check
 * @param {Date|string} startDate - Start of range
 * @param {Date|string} endDate - End of range
 * @returns {boolean} True if date is within range
 */
export const isDateInRange = (date, startDate, endDate) => {
  const checkDate = typeof date === "string" ? parseISO(date) : date;
  const rangeStart = typeof startDate === "string" ? parseISO(startDate) : startDate;
  const rangeEnd = typeof endDate === "string" ? parseISO(endDate) : endDate;
  
  return (
    isValid(checkDate) &&
    isValid(rangeStart) &&
    isValid(rangeEnd) &&
    !isBefore(checkDate, rangeStart) &&
    !isAfter(checkDate, rangeEnd)
  );
};

/**
 * Group workouts by time period
 * @param {Array} workouts - Array of workout objects
 * @param {string} grouping - "day" | "week" | "month"
 * @returns {Object} Grouped workouts
 */
export const groupWorkoutsByPeriod = (workouts, grouping = "day") => {
  return workouts.reduce((groups, workout) => {
    const date = typeof workout.date === "string" ? parseISO(workout.date) : workout.date;
    let key;

    switch (grouping) {
      case "week":
        key = format(startOfWeek(date, { weekStartsOn: 1 }), "yyyy-MM-dd");
        break;
      case "month":
        key = format(date, "yyyy-MM");
        break;
      default: // day
        key = format(date, "yyyy-MM-dd");
    }

    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(workout);
    return groups;
  }, {});
};

/**
 * Calculate days remaining until a deadline
 * @param {Date|string} deadline - Deadline date
 * @returns {number} Number of days remaining (negative if passed)
 */
export const getDaysRemaining = (deadline) => {
  const deadlineDate = typeof deadline === "string" ? parseISO(deadline) : deadline;
  return differenceInDays(deadlineDate, new Date());
};

/**
 * Check if a workout was performed in the current week
 * @param {Date|string} workoutDate - Date of the workout
 * @returns {boolean} True if workout was this week
 */
export const isWorkoutThisWeek = (workoutDate) => {
  const date = typeof workoutDate === "string" ? parseISO(workoutDate) : workoutDate;
  return isSameWeek(date, new Date(), { weekStartsOn: 1 });
};

/**
 * Check if a workout was performed in the current month
 * @param {Date|string} workoutDate - Date of the workout
 * @returns {boolean} True if workout was this month
 */
export const isWorkoutThisMonth = (workoutDate) => {
  const date = typeof workoutDate === "string" ? parseISO(workoutDate) : workoutDate;
  return isSameMonth(date, new Date());
};

/**
 * Generate an array of dates for a date range
 * @param {Date|string} startDate - Start of range
 * @param {Date|string} endDate - End of range
 * @returns {Array<Date>} Array of dates
 */
export const generateDateRange = (startDate, endDate) => {
  const start = typeof startDate === "string" ? parseISO(startDate) : startDate;
  const end = typeof endDate === "string" ? parseISO(endDate) : endDate;
  const dates = [];
  
  let currentDate = start;
  while (!isAfter(currentDate, end)) {
    dates.push(currentDate);
    currentDate = addDays(currentDate, 1);
  }
  
  return dates;
};

/**
 * Format a duration in minutes to a human-readable string
 * @param {number} minutes - Duration in minutes
 * @returns {string} Formatted duration string
 */
export const formatDuration = (minutes) => {
  if (!minutes || minutes < 0) return "0 min";
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (hours === 0) return `${minutes} min`;
  if (remainingMinutes === 0) return `${hours} hr`;
  return `${hours} hr ${remainingMinutes} min`;
};

/**
 * Get relative time string for a date
 * @param {Date|string} date - Date to format
 * @returns {string} Relative time string
 */
export const getRelativeTimeString = (date) => {
  const targetDate = typeof date === "string" ? parseISO(date) : date;
  const days = differenceInDays(targetDate, new Date());
  
  if (days === 0) return "Today";
  if (days === 1) return "Tomorrow";
  if (days === -1) return "Yesterday";
  
  if (days > 0) {
    if (days < 7) return `In ${days} days`;
    if (days < 30) return `In ${Math.floor(days / 7)} weeks`;
    return format(targetDate, "MMM d, yyyy");
  } else {
    if (days > -7) return `${Math.abs(days)} days ago`;
    if (days > -30) return `${Math.floor(Math.abs(days) / 7)} weeks ago`;
    return format(targetDate, "MMM d, yyyy");
  }
};