const express = require('express');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
const serviceAccount = require('./serviceAccountKey.json'); // Replace with your Firebase Admin SDK key file

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://sih2k24-a3254-default-rtdb.firebaseio.com', // Replace with your database URL
});

const db = admin.database();
const app = express();

// Middleware
app.use(bodyParser.json());

// Endpoint to receive data from ESP8266
app.post('/send-data', (req, res) => {
  console.log('Received Data:', req.body); // Log incoming data
  const {N,P,K,pH,EC,temperature,humidity,Zn,Cu,Mn,Mb,Fe,Boron,timestamp} = req.body;

  if (
    N === undefined || P === undefined || K === undefined || pH === undefined || 
    EC === undefined || temperature === undefined || humidity === undefined || 
    Zn === undefined || Cu === undefined || Mn === undefined || Mb === undefined || 
    Fe === undefined || Boron === undefined || !timestamp
  ) {
    return res.status(400).send('Missing required data');
  }

  const dataRef = db.ref('sensorData');
  dataRef.push({
    N,P,K,pH,EC,temperature,humidity,Zn,Cu,Mn,Mb,Fe,Boron,timestamp
  })
    .then(() => res.status(200).send('Data saved successfully'))
    .catch((error) => res.status(500).send(`Error saving data: ${error.message}`));
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
