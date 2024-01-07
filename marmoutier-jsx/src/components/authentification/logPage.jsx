import Login from './login';
import { useState } from 'react';



// function LogPage(){
//   function LogButton(){
//     const [token, setbToken] = useState('');
//     if(!token) {
//       return <Login setToken={setbToken} />
//     }
//   }
//   return(
//     <button style={{
//       fontSize: '36px',
//       padding: '10px 20px',
//       position: "absolute",
//       top: "7.5%",
//       left: "92.5%",
//       transform: "translate(-50%, -50%)",
//   }}
//   onClick={LogButton}
//   >
//         Connexion
//       </button>
//   )
// }


function LogPage() {
    const [token, setbToken] = useState('');
        if(!token) {
            return <Login setToken={setbToken} />
    }
  return (
    <div>
    </div>
    
    
  )
}


export default LogPage









