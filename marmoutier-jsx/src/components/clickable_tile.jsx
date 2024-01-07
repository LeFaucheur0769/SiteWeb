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

  const tileClassName = ({ date }) => {
    if (selectedDates.has(date.toDateString())) {
      return 'selected-date';
    }
    return null;
  };

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
      <div>
        <center>
          <button onClick={sendSelectedDatesToServer}>Envoyer les horaires</button>
          <button onClick={loadSelectedDatesFromServer}>Recharger les horaires</button>
        </center>
      </div>
    </div>
  );
}

export default CustomCalendar;
