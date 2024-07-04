const mongoose = require("mongoose");
const Workout = require("../models/WorkoutModel");

// get all workout
const getAllWorkout = async (req, res) => {
  try {
    const user_id = req.user._id
    const workout = await Workout.find({user_id}).sort({ createdAt: -1 });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//get single workout
const getWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout, Not a valid id" });
  }

  const workout = await Workout.findById(id);

  if (!workout) {
    return res.status(404).json({ error: "No such workout" });
  }

  res.status(200).json(workout);
};
//create workout (post)
const createWorkout = async (req, res) => {
  const { title, reps, load } = req.body;
  const emptyFields = [];

  if(!title){
    emptyFields.push('title')
  }
  if(!reps){
    emptyFields.push('reps')
  }
  if(!load){
    emptyFields.push('load')
  }

  if(emptyFields.length > 0){
    return res.status(400).json({error: 'Please fill in all the field ',emptyFields})
  }
  try {
    const user_id = req.user._id;
    const workout = await Workout.create({ title, reps, load,user_id });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message,emptyFields });
  }
};

//delete workout by the id
const deleteWorkout = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout, Not a valid id" });
  }

  try {
    const workout = await Workout.findByIdAndDelete(id);

    if (!workout) {
      return res.status(404).json({ error: "No such workout" });
    }

    res.status(200).json(workout);
  } catch (error) {
    res.status(404).json({ error: "Error while deleting the id" });
  }
};
//update workout by the id
const updateWorkout = async (req, res) => {
  const { id } = req.params;
  const { title, reps, load } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout, Not a valid id" });
  }
  try {
    const updateWorkout = await Workout.findByIdAndUpdate(
      id,
      {
        title,
        reps,
        load,
      },
      { new: true }
    );

    if(!updateWorkout){
        return  res.status(404).json({ error: "No such workout" });
    }
    res.status(200).json(updateWorkout)
  } catch (error) {
    res.status(404).json({ error: "No such workout" });
  }
};
module.exports = { createWorkout, getAllWorkout, getWorkout, deleteWorkout,updateWorkout };
