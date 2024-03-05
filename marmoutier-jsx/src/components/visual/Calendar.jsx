import  { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from '../../api/axios';
import 'react-calendar/dist/Calendar.css';
import MyTimetable from '../timetable';

function MyCalendar() {

/* test to see how i can transform string into date */
  const dateString = "Mar 14 2024";
  const parsedDate = new Date(dateString);
  const year = parsedDate.getFullYear();
  const month = (parsedDate.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
  const day = parsedDate.getDate().toString().padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;

  console.log(formattedDate);

/* some variables for the calendar */
  const [date, setDate] = useState(new Date());
  const [selectedDates, setSelectedDates] = useState(new Set());
  const [selectedDateIsGreen, setSelectedDateIsGreen] = useState(false);
  const [showCalendar, setShowCalendar] = useState(true);

  const TEST_URL = '/calendar'; // Your backend URL for horaires

  useEffect(() => {
    // Request horaires from the backend
    axios.get(TEST_URL)
      .then((response) => {
        const horairesData = response.data;
        setSelectedDates(new Set(horairesData));
      })
      .catch((error) => {
        console.error('Error when requesting horaires from the backend:', error);
      });
  }, []);

  const handleDateChange = (newDate) => {
    setDate(newDate);
    setSelectedDateIsGreen(selectedDates.has(newDate.toDateString()));
    console.log('Selected date is ' + newDate.toDateString());
  };

  // This code defines a function called toggleView that toggles the value of showCalendar. If showCalendar is true, it will be set to false, and vice versa.
  // It is used to toggle between showing the calendar and showing the timetable if the selectedDateIsGreen is true.
  const toggleView = () => {
    setShowCalendar(!showCalendar);
  };

  const tileContent = ({ date }) => {
    if (selectedDates.has(date.toDateString())) {
      return <div className="selected-date"></div>;
    }
    return null;
  };

  return (
    <div style={{
      height: '100%',
    }}>
      {showCalendar ? (
        <div>
          <Calendar className='calendar'
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
          <MyTimetable parsedData={"Thu Nov 23 2023"}/>
          <button onClick={toggleView}>Retour au Calendrier</button>
        </div>
      )}
    </div>
  );
}

export default MyCalendar;
