const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL Database Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root", // your MySQL username
    password: "@sangita2004", // your MySQL password
    database: "hotel_management"
});

db.connect(err => {
    if (err) {
        console.error("Database connection failed: " + err.stack);
        return;
    }
    console.log("Connected to MySQL database.");
});

// Route to handle booking form submission
app.post("/book", (req, res) => {
    const { name, email, checkin_date } = req.body;
    if (!name || !email || !checkin_date) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const sql = "INSERT INTO bookings (name, email, checkin_date) VALUES (?, ?, ?)";
    db.query(sql, [name, email, checkin_date], (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Database error" });
        }
        res.json({ message: "Booking successful!", bookingId: result.insertId });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});



app.use(express.static('public')); // This serves files from the 'public' directory

// Example to serve a specific HTML file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');  // Make sure the file path is correct
});
