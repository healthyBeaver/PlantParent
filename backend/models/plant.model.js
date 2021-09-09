const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const plantSchema = new Schema({
    name: {
        type: String,
        required: true, 
        unique:true, 
    },
    image: {
        type: String,
        required: true,
        unique: true
    },
    basicDescription: {
        type: String,
        required: true
    },
    basicWatering: {
        type: String,
        required: true
    },
    basicFertilizing: {
        type: String,
        required: true
    },
    basicLight: {
        type: String,
        required: true
    },
    basicTemp: {
        type: String,
        required: true
    },
    basicPot: {
        type: String,
        required: true
    }    

});

const plantModule = mongoose.model('plant', plantSchema);
module.exports = plantModule;