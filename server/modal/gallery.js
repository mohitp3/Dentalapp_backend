const mongoose = require('mongoose');

var schema = new mongoose.Schema({
   imgUrl :{
        type : String,
        required:true
    },
    category :{
        type : String,
        required:true
    },
    title :{
        type : String,
        required:true
    },

})

const gallery = mongoose.model('gallery', schema);

module.exports = gallery;