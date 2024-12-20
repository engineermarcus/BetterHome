const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const port = process.env.PORT || 8080;

// Unsplash Access Key (Added here for you)
const UNSPLASH_ACCESS_KEY = '8M0w78m1nIeahOvDSvs_60719qKq94qdrjoRRaVjx2I';

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Route for the Home Page
app.get('/fashion', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'fashion.html'));
});

// Route for Page 1
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

// Route for Page 2
app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

// API route to fetch images from Unsplash
app.get('/api/photos', async (req, res) => {
    try {
        const response = await axios.get('https://api.unsplash.com/photos', {
            headers: {
                Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`
            }
        });
        res.json(response.data); // Send the image data to the frontend
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching data from Unsplash');
    }
});

// Start the server
app.listen(port,'0.0.0.0', () => {
    console.log(`Server is running at http://localhost:${port}`);
});
