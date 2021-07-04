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

const aboutInfo = mongoose.model('aboutInfo', schema);

module.exports = aboutInfo;