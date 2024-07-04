const express = require("express");

const router = express.Router();

const {
  createWorkout,
  getAllWorkout,
  getWorkout,
  deleteWorkout,
  updateWorkout,
} = require("../controllers/workoutController");

const requiredAuth = require('../middleware/requiredAuth')
// Route to get all workout details
router.use(requiredAuth)
router.get("/", getAllWorkout);

// Route to get details of a single workout by ID
router.get("/:id", getWorkout);

// Route to create a new workout
router.post("/", createWorkout);

// Route to delete a workout by ID
router.delete("/:id", deleteWorkout);

// Route to update a workout by ID
router.put("/:id", updateWorkout);

// Export the router to be used in other parts of the application
module.exports = router;
