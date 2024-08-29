import express from 'express';
import { json } from 'express'; // Updated import
import { connectDB } from './db.js';  // Ensure you export connectDB correctly from db.js
import signupRoute from './route/signup-route.js';

const app = express();
const port = 3040;

// Middleware
app.use(express.static('public'));
app.use(json()); // Updated to use express.json()

// Connect to the database
connectDB();

// Set up routes
signupRoute(app);

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
