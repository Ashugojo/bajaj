const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// POST endpoint
app.post('/bfhl', (req, res) => {
    try {
        const data = req.body.data;

        // Validate input
        if (!Array.isArray(data)) {
            throw new Error("Input must be an array");
        }

        // Extract numbers and alphabets
        const numbers = data.filter(item => !isNaN(item));
        const alphabets = data.filter(item => isNaN(item) && item.length === 1);

        // Find the highest alphabet (case insensitive)
        let highest_alphabet = [];
        if (alphabets.length > 0) {
            highest_alphabet = [alphabets.reduce((a, b) => a.toLowerCase() > b.toLowerCase() ? a : b)];
        }

        // Construct response
        const response = {
            is_success: true,
            user_id: "Ashu", // Replace with your fullname_dob
            email: "22BAI70159@cuchd.in", // Replace with your college email
            roll_number: "22BAI70159", // Replace with your roll number
            numbers: numbers,
            alphabets: alphabets,
            highest_alphabet: highest_alphabet
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({
            is_success: false,
            error: error.message
        });
    }
});

// GET endpoint
app.get('/bfhl', (req, res) => {
    res.status(200).json({
        operation_code: 1
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});