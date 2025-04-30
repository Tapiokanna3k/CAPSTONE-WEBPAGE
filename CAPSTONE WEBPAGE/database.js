const mysql = require('mysql2');

// Create a connection to the database
const connection = mysql.createConnection({
    host: 'localhost', // Change to your database host
    user: 'root', // Change to your database username
    password: '', // Change to your database password
    database: 'seatmap_db' // Change to your database name
});

// Connect to the database
connection.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
});

// Export the connection for use in other files
module.exports = connection;