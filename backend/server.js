// Load environment variables from a .env file into process.env
require("dotenv").config();

const cors = require("cors");
// Import the Express module
const express = require("express");

// Import the Mongoose module for MongoDB connection
const mongoose = require("mongoose");
const mongoURI = `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@${process.env.MONGO_INITDB_HOST}:${process.env.MONGO_INITDB_PORT}/${process.env.MONGO_INITDB_ROOT_DATABASE}?authMechanism=DEFAULT&authSource=admin`;

const workoutRoutes = require("./routes/workout");
const userRoutes = require("./routes/user");
// Create an Express application instance
const app = express();

app.use(
  cors({
    origin: "*", // or specific origin: 'http://localhost:5173'
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middleware to handle incoming JSON requests
app.use(express.json());

// Global middleware that logs the request path and method for every request
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next(); // Proceed to the next middleware or route handler
});

// Use the workout routes for any requests to '/api/workout'
app.use("/api/workout", workoutRoutes);
app.use("/api/user", userRoutes);
// Connect to MongoDB using Mongoose
mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("DBURI: ", mongoDB);
    console.log("Env values: ", process.env);
    // Start the server and listen on the port specified in the environment variables
    app.listen(process.env.PORT || 4000, "0.0.0.0", () => {
      // console.log(`Server running on port ${process.env.PORT || 4000}`);
    });
  })
  .catch((error) => {
    // Log any errors that occur during the connection process
    console.log(error);
  });
