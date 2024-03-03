import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import axios from '../api/axios';
import 'react-calendar/dist/Calendar.css';

const ADMIN_CALENDAR_URL = '/admin';
const CALENDAR_URL = "/calendar";

function CustomCalendar() {
  const [selectedDates, setSelectedDates] = useState(new Set());

  const handleDateClick = (date) => {
    const newSelectedDates = new Set(selectedDates);
    if (newSelectedDates.has(date.toDateString())) {
      newSelectedDates.delete(date.toDateString());
    } else {
      newSelectedDates.add(date.toDateString());
    }
    setSelectedDates(newSelectedDates);
  };

  // Add a tileClassName prop to the Calendar component
  const tileClassName = ({ date }) => {
    if (selectedDates.has(date.toDateString())) {
      return 'clicked-date'; // Warning if you do not use in selected-date border: 2px solid green;  border-radius: 20%; you will not see anything
    }
    return null;
  };

  // Load selected dates from the server
  const loadSelectedDatesFromServer = () => {
    // Request selected dates from the server
    axios.get(CALENDAR_URL)
      .then((response) => {
        const horairesData = response.data;
        const selectedDatesFromBackend = new Set(horairesData);
        setSelectedDates(selectedDatesFromBackend);
      })
      .catch((error) => {
        console.error('Error fetching selected dates from the server:', error);
      });
  };

  useEffect(() => {
    // Load selected dates from the server initially
    loadSelectedDatesFromServer();
  }, []);
  
  // Send selected dates to the server
  const sendSelectedDatesToServer = async () => {
    try {
      const response = await axios.post(ADMIN_CALENDAR_URL, {
        selectedDates: Array.from(selectedDates),
      });

      if (response.status === 200) {
        console.log('Horaires envoyés avec succès au serveur');
        // Reset your UI or perform other necessary actions if needed
      } else {
        console.error('Échec de l\'envoi des horaires au serveur');
      }
    } catch (error) {
      console.error('Erreur lors de la requête au serveur :', error);
    }
  };

  return (
    <div>
      <center>
        <h1>Calendrier des visites</h1>
      </center>
      <div className="calendar">
        <Calendar
          onClickDay={(date) => handleDateClick(date)}
          tileClassName={tileClassName}
        />
      </div>
      <div
      style={{
        left: '65%',
      }}
      >
        {/* <center> */}
          <button onClick={sendSelectedDatesToServer}>Envoyer les horaires</button>
          <button onClick={loadSelectedDatesFromServer}>Recharger les horaires</button>
        {/* </center> */}
      </div>
    </div>
  );
}

export default CustomCalendar;


/*
the full css code : 

  .selected-date {
  background-color: green; 
  color: #fff;
  border: 4px solid green; // Bordure autour des dates sélectionnées //
  border-radius: 0%; //Arrondir la bordure (facultatif)//
}
*/