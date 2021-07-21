const mongoose = require('mongoose');

var schema = new mongoose.Schema({
   
    
    name :{
        type : String,
        required: true,
    },
    email :{
        type : String,
        required: true,
        min:6,
        unique:true
    },
    password :{
        type : String,
        required: true,
        min:6
    },
    
})

const register = mongoose.model('register', schema);

module.exports = register;