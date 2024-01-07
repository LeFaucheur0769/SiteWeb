

import Marmoutier_logo from "./visual/Marmoutier_logo"
import 'react-calendar/dist/Calendar.css';
import ClickableTile from './clickable_tile';
import { Link } from 'react-router-dom';





function CalendarAdmin() {

  return (
    <div>
      <Marmoutier_logo></Marmoutier_logo>
        
      <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <ClickableTile/>
    
    </div>
      <div>
        {/* Create a button that links to the LogPage */}
        <Link to="/login">
          <button 
          
            style={{
              fontSize: '36px',
              padding: '10px 20px',
              position: "absolute",
              top: "7.5%",
              left: "92.5%",
              transform: "translate(-50%, -50%)", }}>
            Connexion
          </button>
        </Link>
      </div>
    </div>
    
    
  )
}


export default CalendarAdmin






