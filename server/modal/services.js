const mongoose = require('mongoose');

var schema = new mongoose.Schema({
   
    
    title :{
        type : String,
        required: true,
    },
    description :{
        type : String,
        required: true,
    },
    icon :{
        type : String,
        required: true,
    },
    
})

const services = mongoose.model('services', schema);

module.exports = services;