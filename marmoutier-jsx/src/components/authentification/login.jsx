import { useRef, useState, useEffect } from 'react';
// import AuthContext from "./context/AuthProvider";
import { Link } from 'react-router-dom';

import axios from '../../api/axios';
const LOGIN_URL = '/login';

// async function loginUser(credentials) {
//  return fetch('http://localhost:8080/login', {
//    method: 'POST',
//    headers: {
//      'Content-Type': 'application/json'
//    },
//    body: JSON.stringify(credentials)
//  })
//    .then(data => data.json())
// }

const Login = () => {
    // const { setAuth } = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        try {
          const response = await axios.post(LOGIN_URL, JSON.stringify({ user, pwd }), {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
          });
      
            console.log(JSON.stringify(response?.data));
          
      
          if (response?.status === 200) { // Assuming a successful status code is 200
            const token = response?.data?.accessToken;
            // const roles = response?.data?.roles;
            console.log("token : ",token) 
            //setAuth({ /*user, /*pwd, /*roles,*/ /*accessToken */}); //cette ligne crash et bloque le reste de la condition   
            setUser('');
            setPwd('');
            setSuccess(true); // a redéplacer la fin quand la ligne suivante ne  buggera plus 
          } else {
            // Handle non-200 status codes with specific error messages
            if (response?.status === 400) {
              setErrMsg('Missing Username or Password');
            } else if (response?.status === 401) {
              setErrMsg('Unauthorized');
            } else {
              setErrMsg('Login Failed');
            }
            errRef.current.focus();
          }
        } catch (err) {
          if (err.response) {
            console.log("err ",err.response)
            setErrMsg('No Server Response');
          }
          errRef.current.focus();
        }
      }

    return (
        <>
        {/* juste l'affichage */}
            {success ? (
                <div
                style={{
                    position:   "absolute",
                    top:    "40%",
                    left:   "50%",
                    transform: "translate(-50%, -50%)",
                    fontSize: '24px',
                    padding: '10px 20px',
                }}>
                <section>
                    <h1>You are logged in!</h1>
                    <br />
                    <br/>
                    
                    <p>
                        <br/><br/>
                        <Link to="/home">
                            Go to Home
                        </Link>
                    </p>
                </section>
                </div>
            ) : (
                <div    style={{
                    position:   "absolute",
                    top:    "40%",
                    left:   "50%",
                    transform: "translate(-50%, -50%)",
                    fontSize: '24px',
                    padding: '10px 20px',
                }}
                >   
                    <section>
                        <center>
                        
                            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                            <h1>Connexion</h1>
                            <br/>
                            <form onSubmit={handleSubmit}>
                                <label htmlFor="username">Nom d&apos;utilisateur :   </label>
                                <input
                                    type="text"
                                    id="username"
                                    ref={userRef}
                                    autoComplete="off"
                                    onChange={(e) => setUser(e.target.value)}
                                    value={user}
                                    required
                                />
                            <br/>
                            <br/>
                            <br/>
                                <label htmlFor="password">Mot de passe  :   </label>
                                <input
                                    type="password"
                                    id="password"
                                    onChange={(e) => setPwd(e.target.value)}
                                    value={pwd}
                                    required
                                />
                            <br/>
                            <br/>
                            <button type="submit">Submit</button>
                            </form>
                        
                    </center>
                </section>
            </div>
            )}
        </>
    )
}

export default Login