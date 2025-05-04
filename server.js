const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Store incoming data in a global variable (or use a database in production)
let attackData = [];

// API endpoint to receive the data (webhook POST)
app.post('/webhook', (req, res) => {
  try {
    console.log('Received data:', req.body);

    // Append the new attack data to the global variable
    attackData.push(req.body);
    
    res.status(200).send('Data received');
  } catch (error) {
    res.status(500).send('Error processing webhook data');
  }
});

// API endpoint to fetch attack data
app.get('/fetch-data', (req, res) => {
  try {
    res.status(200).json({ data: attackData[attackData.length - 1] || {} });
  } catch (error) {
    res.status(500).send('Error fetching data');
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
