const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const workout = new Schema(
    {
        day: {
            type: String,
            trim: true
        },
        exercises: [
        {
            type: {
                type: String,
                trim: true
            },
            name: {
                type:String,
                trim: true
            },
            duration: {
                type: Number,
                default: 0,
            },
            weight: {
                type: Number,
                default: 0,
            },
            reps: {
                type: Number,
                default: 0,
            },
            sets: {
                type: Number,
                default: 0,
            },
            distance: {
                type: Number,
                default: 0,
            },
        }]
    }
);

const Workout = mongoose.model('Workout', workout);

module.exports = Workout;