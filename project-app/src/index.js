// This is the main entry point of the application.
// Import necessary modules and libraries
import express from 'express';

// Initialize the application
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON requests
app.use(express.json());

// Define a simple route
app.get('/', (req, res) => {
    res.send('Welcome to the Project App!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});