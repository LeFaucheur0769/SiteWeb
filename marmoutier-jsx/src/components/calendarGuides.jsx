import Calendar_Guide from "./visual/Calendar_guide"
import { Link } from "react-router-dom"
import Marmoutier_logo from "./visual/Marmoutier_logo"

function CalendarGuides(){
        return(
            <div>
                <Marmoutier_logo></Marmoutier_logo>
                <div    
                    style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                }}>
                    <div    style={{
                        // scale: "80%"
                    }}
                    >
                    <center>
                        {/* <h1>
                            Still working on it
                        </h1> */}
                    </center>
                        <div    style={{
    
                        }}>
                            <Calendar_Guide/>
                        </div>
                    </div>
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
                    {/* <Link to="/guides">
                        <button 
                        
                            style={{
                            fontSize: '18px',
                            padding: '5px 10px',
                            position: "absolute",
                            top: "93.5%",
                            left: "94.5%",
                            transform: "translate(-50%, -50%)", }}>
                            Guides
                        </button>
                    </Link> */}
                    <Link to="/admin">
                        <button 
                        
                            style={{
                            fontSize: '18px',
                            padding: '5px 10px',
                            position: "absolute",
                            top: "93.5%",
                            left: "87.5%",
                            transform: "translate(-50%, -50%)", }}>
                            Admins
                        </button>
                    </Link>
                </div>
                
            </div>
            
        )
    }

export default CalendarGuides