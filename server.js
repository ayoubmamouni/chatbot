const express = require('express');
const bodyParser = require('body-parser');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const port = 3000;


require('dotenv').config();

app.use(bodyParser.json());

const genAI = new GoogleGenerativeAI(process.env.APIKEY); 
app.post('/chat', async (req, res) => {
    const userMessage = req.body.message;
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent(userMessage);
        const response = await result.response;
        const text = response.text();

        res.json({ message: text });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error processing your request' });
    }
});

app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});