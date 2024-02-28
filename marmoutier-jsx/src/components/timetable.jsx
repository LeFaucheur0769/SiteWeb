import { useEffect, useState } from 'react';
// import Timetable from 'react-timetable-events';
import Timetable from 'react-timetable-events';
import axios from '../api/axios';
import TimetableInput from './visual/timetable_input';


const MyTimetable = ({ parsedData }) => {

  const [loading, setLoading] = useState(true);
  const parsedDate = "Thu Nov 23 2023";
  const CalendarInput = new Date(parsedDate);
  console.log("parsed date : ", parsedDate);
  const year = CalendarInput.getFullYear();
  const month = (CalendarInput.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
  const day = CalendarInput.getDate().toString().padStart(2, '0');
  const [jsonData, setjsonData] = useState({});
  
  const data = `${year}-${month}-${day}`;
  const formatEventData = (data) => {
    const formattedData = {};
  
    for (const day in data) {
      if (Array.isArray(data[day])) {
        formattedData[day] = data[day].map(event => ({
          ...event,
          startTime: new Date(event.startTime),
          endTime: new Date(event.endTime),
        }));
      }
    }
    console.log('formattedData : ',formattedData);
    return formattedData;
  };

  useEffect(() => {
    const EVENT_URL = '/events';
    const paramValue = data;
  
    axios
      .get(`${EVENT_URL}?dateClicked=${paramValue}`)
      .then((response) => {
        const timetable = response.data;
        console.log('timetable : ',JSON.stringify(timetable));
        setjsonData(timetable[0]);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error while requesting events from the backend server:', error);
        setLoading(false);
      });
  }, []);


  // // État pour stocker les horaires sélectionnés
  // const [selectedHours, setSelectedHours] = useState([]);

  // // Fonction pour gérer la sélection d'une heure
  // const handleHourSelect = (hour) => {
  //   // Vous pouvez implémenter ici la logique pour gérer la sélection des heures
  //   // Ajoutez ou supprimez l'heure du tableau selectedHours
  //   setSelectedHours((prevSelected) =>
  //     prevSelected.includes(hour)
  //       ? prevSelected.filter((selected) => selected !== hour)
  //       : [...prevSelected, hour]
  //   );
  // };

//   return (
//     <Timetable
//     events={
//               {
//                 Day: [
//                 {
//                   id: 1,
//                   name: jsonData.name,
//                   type: jsonData.type,
//                   startTime: new Date('2023-11-23T11:30:00'),
//                   endTime: new Date('2023-11-23T11:45:00'),
//                 },
//               ],
//              }
//             }>
//       {/* Boucle pour afficher les jours de la semaine */}
//       {['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'].map((day) => (
//         <Timetable.TimetableRow key={day} name={day}>
//           {/* Boucle pour afficher les heures et les cases à cocher */}
//           {Array.from({ length: 24 }, (_, i) => (
//             <div key={i}>
//               <input
//                 type="checkbox"
//                 checked={selectedHours.includes(i)}
//                 onChange={() => handleHourSelect(i)}
//               />
//             </div>
//           ))}
//         </Timetable.TimetableRow>
//       ))}
//     </Timetable>
//   );
// };

  return (
    <div>
      <h1>Calendrier des événements</h1>
      {loading ? (
        <p>Chargement...</p>
      ) : (
        <div>
          <Timetable 
          events={
            {
              Day: [
              {
                id: 1,
                name: jsonData.name,
                type: jsonData.type,
                startTime: new Date(jsonData.startTime),
                endTime: new Date(jsonData.endTime),
              },
            ],
          }
          }
          style={{ height: '500px' }}
          onClick={(event) => alert(event)}
        />
        {/* Utiliser une checkbox pour les horaires a selectionner */}
        {/* <div  style={{display:'flex'}}>
          <text style={{marginRight : "5px"}}> Début : </text>
          <input type="time" name="timetable" pattern="(0[1-9]|1[0-2])h([0-5][0-9])m-(0[1-9]|1[0-2])h([0-5][0-9])m" required style={{marginRight : "100px"}}/>
          <text style={{marginRight : "5px"}}> Fin : </text>
          <input type="time" name="timetable" pattern="(0[1-9]|1[0-2])h([0-5][0-9])m-(0[1-9]|1[0-2])h([0-5][0-9])m" required />
        </div> */}
        <TimetableInput></TimetableInput>
      </div>
      )}
    </div>
  );
}

  export default MyTimetable;