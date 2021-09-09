const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gardenSchema = new Schema({
    userID: {
        type: Schema.Types.ObjectId,
        required: true,
        unique: true
    },
    plants: {
        type: [Schema.Types.ObjectId],
        required:true
    }
});

const gardenModule = mongoose.model('garden', gardenSchema);
module.exports = gardenModule;