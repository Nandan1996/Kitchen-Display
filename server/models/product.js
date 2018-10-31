const mongoose = require('mongoose');
 
var Product = mongoose.model('Product', {
    name: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    active: {
        type: Boolean,
        default: true
    },
    lastPredicted: {
        type: String,
        default: null
    }
});

module.exports = {Product};