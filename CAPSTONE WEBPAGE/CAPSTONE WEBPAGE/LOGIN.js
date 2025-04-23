const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Middleware
app.use(bodyParser.json());

// Mock user data for validation
const users = [
    { email: 'test@example.com', password: 'password123' }
];

// Login endpoint
app.post('/LOGIN.js', (req, res) => {
    const { email, password } = req.body;

    // Check if the user exists and credentials match
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        res.status(200).json({ message: 'Login successful' });
    } else {
        res.status(401).json({ message: 'Invalid email or password' });
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});