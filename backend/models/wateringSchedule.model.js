const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const wateringScheduleSchema = new Schema({
    frequency: {
        type: Number,
        required: true
    },
    lastWatered: {
        type: Date,
        required:true,
        default:null
    },
    nextWatering: {
        type:Date,
        required:true,
        default: null
    }
});

const wateringScheduleModule = mongoose.model('wateringSchedule', wateringScheduleSchema);
module.exports = wateringScheduleModule;