import { useState } from 'react';
// import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import MyTimetable from '../timetable';
import MyCalendar from './Calendar';

// This code defines a function called Calendar_Guide that returns a React component.
function Calendar_Guide() {
  const parsedDate = "Thu Nov 23 2023";
  const [date, setDate] = useState(new Date());
  const [selectedDates, setSelectedDates] = useState(new Set());
  const [selectedDateIsGreen, setSelectedDateIsGreen] = useState(false);
  const [showCalendar, setShowCalendar] = useState(true);
  const [formattedDate, setFormattedDate] = useState(null);


  // This code defines a function called handleDateChange that updates the value of the date state when the user selects a new date.
  const handleDateChange = (newDate) => {
    setDate(newDate);
    setSelectedDateIsGreen(selectedDates.has(newDate.toDateString()));
    console.log(`Clicked day: ${date.getDate()}`);
  };

  const toggleView = () => {
    console.log(`Clicked day: ${date.getDate()}`);
    setShowCalendar(!showCalendar);
  };

  // This code defines a function called toggleView that toggles the value of showCalendar. If showCalendar is true, it will be set to false, and vice versa.
  const handleDayClick = (date) => {
    // Format the date as "day:YYYY-MM-DD"
    const formattedDate = `day:${date.toISOString().split('T')[0]}`;
    setFormattedDate(formattedDate); // Set the formatted date in state
    setShowCalendar(false); // Hide the calendar
    // console.log('hii');
    console.log(`Clicked day: ${date.getDate()}`);
  };
  
  // This code defines a function called tileContent that returns a React element if the selectedDateIsGreen is true. If not, it returns null.
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
       {showCalendar ? (
        <div>
          <MyCalendar className='calendar'
            onChange={handleDateChange}
            value={date}
            tileContent={tileContent}
          />
          {selectedDateIsGreen && (
            <button onClick={toggleView}>Voir le Guide</button>
          )}
        </div>
      ) : (
        <div>
          {/* Pass the formattedDate as a prop to MyTimetable */}
          
          <MyTimetable parsedDate={parsedDate} />
          {/* <button onClick={toggleView} >Retour au Calendrier</button> */}
        </div>
      )}
    </div>
  );
}

export default Calendar_Guide;


