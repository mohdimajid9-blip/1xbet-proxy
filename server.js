
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
    jsonify = { status: "Server is running successfully!" };
    res.json(jsonify);
});

// Proxy endpoint l 1xBet (Wla l-API li baghi tjib minha l-data)
app.get('/api/odds', async (req, res) => {
    try {
        // Hna tqdr t-hott l-URL dial 1xBet awla l-API li kat-st3mlo
        const targetUrl = 'https://1xbet.com/service-api/...'; // Bdlha b l-endpoint l-ha9iqi

        const response = await axios.get(targetUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
                'Accept': 'application/json',
                'Referer': 'https://1xbet.com/'
            }
        });

        res.json({
            success: true,
            data: response.data
        });

    } catch (error) {
        console.error("Error fetching data:", error.message);
        res.status(500).json({ 
            success: false, 
            error: "Failed to fetch data from 1xBet" 
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});