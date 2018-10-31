const mongoose = require('mongoose');
const {EventEmitter} = require('events');

const predictionEvent = new EventEmitter();

const {getDateString} = require('../utility/utility');

var predictionSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    created: {
        type: Number,
        default: 0
    },
    predicted: {
        type: Number,
        required: true,
        min: 1
    },
    predictedDate: {
        type: String,
        default: getDateString
    }
});

predictionSchema.post('findOneAndUpdate', function(doc){
    predictionEvent.emit('update', doc);
});

var Prediction = mongoose.model('Prediction', predictionSchema);

module.exports = {Prediction, predictionEvent};