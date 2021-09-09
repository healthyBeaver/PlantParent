const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fertilizationScheduleSchema = new Schema({
    frequency: {
        type: Number,
        required: true
    },
    lastFertilized: {
        type: Date,
        required:true,
        default:null
    },
    nextFertilization: {
        type:Date,
        required:true,
        default: null
    }
});

const fertilizationScheduleModule = mongoose.model('fertilizationSchedule', fertilizationScheduleSchema);
module.exports = fertilizationScheduleModule;