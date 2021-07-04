const mongoose = require('mongoose');

var schema = new mongoose.Schema({
   
    email : {
        type: String,
        required: true,
        unique: true
    },
    appointmentDate : {
        type: Date,
        default: Date.now,
        required: true,
    },
    name :{
        type : String,
        required: true,
    },
    message:{
        type : String,
        required: true,
    }
})

const appointment = mongoose.model('appointment', schema);

module.exports = appointment;