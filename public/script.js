// Firebase configuration (replace with your actual config if needed)
const firebaseConfig = {
  apiKey: "AIzaSyDERyxM499chIB2EDrZBz32iAiEMs6vNEg",
  authDomain: "sih2k24-a3254.firebaseapp.com",
  databaseURL: "https://sih2k24-a3254-default-rtdb.firebaseio.com",
  projectId: "sih2k24-a3254",
  storageBucket: "sih2k24-a3254.firebasestorage.app",
  messagingSenderId: "788292782112",
  appId: "1:788292782112:web:87b0a2a27217c4c94ad445",
  measurementId: "G-BM5DSESBKH"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Reference to the 'sensorData' node in your Firebase Realtime Database
const dbRef = firebase.database().ref('sensorData');

// Function to fetch the latest data and update the DOM
// Function to fetch the latest data and update the DOM
function fetchSensorData() {
  dbRef.orderByChild('timestamp').limitToLast(1).once('value', (snapshot) => {
    if (snapshot.exists()) {
      const recentData = Object.values(snapshot.val())[0];
      console.log("Retrieved Data:", recentData); // Log the data for debugging

      // Update DOM elements for macronutrients
      document.getElementById('nitrogenValue').innerText = recentData.N || '--';
      document.getElementById('phosphorusValue').innerText = recentData.P || '--';
      document.getElementById('potassiumValue').innerText = recentData.K || '--';

      // Update DOM elements for pH, EC, Temperature, and Humidity
      document.getElementById('phValue').innerText = recentData.pH || '--';
      document.getElementById('EcValue').innerText = recentData.EC || '--';
      document.getElementById('temperatureValue').innerText = recentData.temperature || '--';
      document.getElementById('humidityValue').innerText = recentData.humidity || '--';

      // Update DOM elements for micronutrients
      document.getElementById('zincValue').innerText = recentData.Zn || '--';
      document.getElementById('boronValue').innerText = recentData.Boron || '--';
      document.getElementById('manganeseValue').innerText = recentData.Mn || '--';
      document.getElementById('molybdenumValue').innerText = recentData.Mb || '--';
      document.getElementById('ironValue').innerText = recentData.Fe || '--';
      document.getElementById('copperValue').innerText = recentData.Cu || '--';

      // Update timestamp
      document.getElementById('timestampValue').innerText = recentData.timestamp || '--';
    } else {
      console.error('No data available');
    }
  }).catch((error) => {
    console.error('Error fetching data:', error);
  });
}

// Function to download data as CSV
function downloadCSV() {
  dbRef.once('value', (snapshot) => {
    if (snapshot.exists()) {
      const rows = [];
      rows.push(["Timestamp", "Nitrogen", "Phosphorus", "Potassium", "pH", "EC", "Temperature", "Humidity", "Zinc", "Boron", "Manganese", "Molybdenum", "Iron", "Copper"]);

      snapshot.forEach((childSnapshot) => {
        const data = childSnapshot.val();
        rows.push([
          data.timestamp || '',
          data.N || '',
          data.P || '',
          data.K || '',
          data.pH || '',
          data.EC || '',
          data.temperature || '',
          data.humidity || '',
          data.Zn || '',
          data.B || '',
          data.Mn || '',
          data.Mo || '',
          data.Fe || '',
          data.Cu || ''
        ]);
      });

      // Convert rows to CSV format
      let csvContent = "data:text/csv;charset=utf-8,";
      rows.forEach(row => {
        csvContent += row.join(",") + "\n";
      });

      // Create a download link and trigger the download
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "sensor_data.csv");
      document.body.appendChild(link); // Required for Firefox
      link.click();
      document.body.removeChild(link);
    } else {
      console.error('No data available');
    }
  }).catch((error) => {
    console.error('Error fetching data for CSV:', error);
  });
}

// Initial fetch to display data as soon as the page loads
fetchSensorData();

// Update data every 30 seconds
setInterval(fetchSensorData, 30000);

// Add event listener for CSV download button
document.getElementById('downloadCsvButton').addEventListener('click', downloadCSV);


