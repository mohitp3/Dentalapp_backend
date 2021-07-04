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
    imageUrl :{
        type : String,
        required: true,
    },
    
})

const blogs = mongoose.model('blogs', schema);

module.exports = blogs;