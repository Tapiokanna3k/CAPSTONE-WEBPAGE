const express = require('express');
const bcrypt = require('bcrypt');
const connection = require('./database');

const app = express();
app.use(express.json());

app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the user into the database
    const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';

    connection.query(query, [username, email, hashedPassword], (err, result) => {
        if (err) {
            console.error('Error registering user:', err);
            return res.status(500).json({ message: 'Error registering user' });
        }
        res.status(201).json({ message: 'User registered successfully' });
    });
});

app.listen(3001, () => {
    console.log('Server running on port 3001');
});