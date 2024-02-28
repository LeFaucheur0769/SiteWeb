const express = require('express');
const cors = require('cors');
const axios = require('axios');
const bodyParser = require('body-parser');
const fs = require('fs');
const bcrypt = require('bcrypt');

const app = express();
const port = 4000;

// Autoriser l'origine de votre application front-end (http://localhost:5173)
const allowedOrigins = ['http://localhost:5173', 'http://pics-infected.gl.at.ply.gg:21069', 'http://given-computational.gl.at.ply.gg:21072/', 'http://147.185.221.17:21069', ' https://147.185.221.16:5808'];

//function encrypt 
// Sample user data
const users = [
    {
        username: "admin",
        password: "admin" // Plain text password
    }
];
function encrypt(users){
    let existingUsers = [];

    try {
        existingUsers = JSON.parse(fs.readFileSync('users.json', 'utf-8'));
    } catch (error) {
        console.error('Error reading existing users:', error);
    }

    // Hash the passwords and update the users array
    const saltRounds = 2;
    users.forEach((user) => {
        user.password = bcrypt.hashSync(user.password, saltRounds);
    });

    // Append the new users to the existingUsers array
    existingUsers.push(...users);

    // Save the updated users array to a JSON file
    fs.writeFileSync('users.json', JSON.stringify(existingUsers, null, 2));
    console.log('Users appended successfully.');

}


function recupererObjetsParDate(nomFichier, dateRecherchee, callback) {
  fs.readFile(nomFichier, 'utf8', (err, data) => {
      if (err) {
          console.error('Erreur de lecture du fichier JSON :', err);
          return callback(err, null);
      }

      try {
          const jsonData = JSON.parse(data);
          const objetsTrouves = [];

          for (const jour in jsonData) {
              for (const objet of jsonData[jour]) {
                  if (objet.startTime.includes(dateRecherchee)) {
                      objetsTrouves.push(objet);
                  }
              }
          }

          return callback(null, objetsTrouves);
      } catch (parseError) {
          console.error('Erreur d\'analyse JSON :', parseError);
          return callback(parseError, null);
      }
  });
}




//function decrypt
let roleU = null;

// Load user data from the JSON file
function decrypt(username, password) {
  return new Promise((resolve, reject) => {
      const users = JSON.parse(fs.readFileSync('users.json', 'utf-8'));

      const user = users.find((u) => u.username === username);

      if (user) {
          // console.log("role ", user.role);
          bcrypt.compare(password, user.password, (err, result) => {
              if (result) {
                  // Passwords match, authenticate the user
                  console.log("matchs");
                  resolve(user.role);
              } else {
                  // Passwords don't match, deny access
                  console.log("doesn't match");
                  resolve(null);
              }
          });
      } else {
          // User not found
          console.log("User not found");
          resolve(null);
      }
  });
}

//fonction pour stocker les horaires dans un fichier json 
function calendar(){
  
}

app.use(cors({
  origin: function (origin, callback) {
    // Vérifie si l'origine est dans la liste des origines autorisées
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

// Utilisez body-parser pour analyser le corps de la demande
app.use(bodyParser.json());

// Endpoint pour la connexion
app.post('/login', async (req, res) => {
  const { user, pwd } = req.body;

  try {
      const role = await decrypt(user, pwd);

      if (role !== null) {
          console.log("server.js role", role);

          if(role === "admin"){
            //si le role est admin
            const token = 'dKt83rfJ5GQ*C9yZ2JdmiSpCDbG2!o8MT&p$jL#AexdQnsShrU5@2H5gcHfaq^DcwHD#At&7!7cp2L^Fa@#ka@pmzuq2aoBYqgaY7KsHM5^Rud&82MC!U7GBRA4Kt@Rh';
            res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
            res.header('Access-Control-Allow-Credentials', true);
            // res.status(200).send({ token, role});
            res.status(200).json({ token: token, role: role });
          }
          if(role ==="guide"){
            //si le role est guide
            const token = 'vQM5e&%2xER66q8eoD^U3g7y7cryi*WzeZ8!Pc#Faczp#AtbHN*dvXyfYzHJqDpQuJPc$kJgo*E@nPZ59sv@4D6G*ERAXLGDouEuXQYLGtdiyPN3ySzD##RGFfQXKLAM'
            res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
            res.header('Access-Control-Allow-Credentials', true);
            // res.status(200).send({ token, role});
            res.status(200).json({ token: token, role: role });
          }
      } else {
          res.status(401).send("Unauthorized");
      }
  } catch (error) {
      console.error("An error occurred:", error);
      res.status(500).send("Server error");
  }
});


// Gérer la route pour recevoir les données de /adminCalendar
app.post('/admin', (req, res) => {
  // Récupérer les données envoyées depuis le frontend
  const selectedDates = req.body.selectedDates;

  // Écrire les nouvelles données dans le fichier JSON
  fs.writeFileSync('data.json', JSON.stringify(selectedDates, null, 2));

  // Répondre au frontend pour indiquer que l'enregistrement a réussi
  res.status(200).json({ success: true, message: 'Horaires enregistrés avec succès' });
});


app.get('/calendar', (req, res) => {
  // Lisez les données du fichier data.json
  fs.readFile('data.json', (err, data) => {
    if (err) {
      console.error('Erreur de lecture du fichier data.json :', err);
      return res.status(500).json({ error: 'Erreur de lecture du fichier data.json' });
    }

    const horaires = JSON.parse(data);
    res.status(200).json(horaires);
  });
});

app.get('/events', (req, res) => {
  try{
    
// Exemple d'utilisation
const fichierJSON = 'events.json';  // Remplacez par le nom de votre fichier JSON
const proprietesRecherchees = req.query.dateClicked;
console.log(proprietesRecherchees);
  // Remplacez par les propriétés que vous souhaitez rechercher"",



recupererObjetsParDate(fichierJSON, proprietesRecherchees, (err, objetsTrouves) => {
  if (err) {
      console.error('Erreur lors de la récupération des objets :', err);
  } else if (objetsTrouves && objetsTrouves.length > 0) {
      console.log('Objets trouvés :', objetsTrouves);
      res.status(200).json(objetsTrouves);
  } else {
      console.log('Aucun objet correspondant à la date recherchée n\'a été trouvé.');
  }
});


  // fs.readFile('events.json', (err, data) => {
  //   if (err) {
  //     console.error('Erreur de lecture du fichier event.json:', err);
  //     return res.status(500).json({ error: 'Erreur de lecture du fichier event.json' });
  //   }

  //   const events = JSON.parse(data);

  //   // Get the day from the request query parameter 'dateClicked'
  //   const dayToRetrieve = req.query.dateClicked;

  //   // Create a new object with only the events for the specified day
  //   // const filteredEvents = {};
  //   if(dayToRetrieve in events){
  //     const filteredEvents = events[dayToRetrieve]
  //     console.log("filtered : ", filteredEvents)
  //     res.status(200).json(filteredEvents);
  //   }
  //   else{
  //     console.log("cannot found correct date : ", dayToRetrieve)
  //   }

  // });
}
  catch (error){
    console.log("error during /events", error)
  }
});



app.listen(port, () => {
  console.log(`API is running on http://localhost:${port}`);
});
