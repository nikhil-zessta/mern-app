const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the workout schema with title, reps, and load fields, and timestamps
const workoutSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    load: {
        type: Number,
        required: true
    },
    user_id:{
        type: String,
        required: true
    }
}, { timestamps: true });

// Export the Workout model based on the workoutSchema
module.exports = mongoose.model('Workout', workoutSchema);
