import { useState } from 'react';
// import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import MyTimetable_guide from './timetable_guide';
import MyCalendar from '../Calendar';

/**
 * Calendar_Guide is a React component that renders a calendar and a timetable guide.
 * The component toggles between showing the calendar and the timetable guide when a user clicks on a date.
 */
function Calendar_Guide() {
  // State variables
  const [date, setDate] = useState(new Date()); // Current selected date
  const [selectedDates, setSelectedDates] = useState(new Set()); // Set of selected dates
  const [selectedDateIsGreen, setSelectedDateIsGreen] = useState(false); // Flag indicating if the selected date is in the set of selected dates
  const [showCalendar, setShowCalendar] = useState(true); // Flag indicating if the calendar is shown or the timetable guide is shown
  const [formattedDate, setFormattedDate] = useState(null); // Formatted date string

  /**
   * Handles the user's selection of a new date.
   * Updates the state variables accordingly.
   * @param {Date} newDate - The new selected date
   */
  const handleDateChange = (newDate) => {
    setDate(newDate);
    setSelectedDateIsGreen(selectedDates.has(newDate.toDateString()));
    console.log(`Clicked day: ${date.getDate()}`);
  };

  /**
   * Toggles the view between the calendar and the timetable guide.
   */
  const toggleView = () => {
    console.log(`Clicked day: ${date.getDate()}`);
    setShowCalendar(!showCalendar);
  };

  /**
   * Handles the user's click on a date.
   * Formats the date and updates the state variables accordingly.
   * @param {Date} date - The clicked date
   */
  const handleDayClick = (date) => {
    // Format the date as "day:YYYY-MM-DD"
    const formattedDate = `day:${date.toISOString().split('T')[0]}`;
    setFormattedDate(formattedDate); // Set the formatted date in state
    setShowCalendar(false); // Hide the calendar
    console.log(`Clicked day: ${date.getDate()}`);
  };

  /**
   * Returns a React element representing a selected date tile if the date is in the set of selected dates.
   * Otherwise, returns null.
   * @param {Object} props - The tile props containing the date
   * @returns {JSX.Element|null} The selected date tile or null
   */
  const tileContent = ({ date }) => {
    if (selectedDates.has(date.toDateString())) {
      console.log(date);

      return (
        <div
          className="selected-date"
          onClick={() => handleDayClick(date)}
        ></div>
      );
    }
    return null;
  };

  return (
    console.log(formattedDate),
    <div style={{
      height: '70%',
    }}>
      {/* Render the calendar or the timetable guide based on the showCalendar state */}
      {showCalendar ? (
        <div>
          {/* Render the calendar component */}
          <MyCalendar className='calendar'
            onChange={handleDateChange}
            value={date}
            tileContent={tileContent}
          />
          {/* Show the toggle view button if a date is selected */}
          {selectedDateIsGreen && (
            <button onClick={toggleView}>Voir le Guide</button>
          )}
        </div>
      ) : (
        <div>
          {/* Pass the formattedDate as a prop to MyTimetable_guide */}
          <MyTimetable_guide parsedDate={formattedDate} />
        </div>
      )}
    </div>
  );
}

export default Calendar_Guide;


