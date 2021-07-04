const mongoose = require('mongoose');

var schema = new mongoose.Schema({
   
    
    name :{
        type : String,
        required: true,
    },
    expertism :{
        type : String,
        required: true,
    },
    aboutTitle :{
        type : String,
        required: true,
    },
    aboutDescription :{
        type : String,
        required: true,
    },
    speciality :{
        type : Array,
        required: true,
    }
})

const doctorList = mongoose.model('doctorList', schema);

module.exports = doctorList;