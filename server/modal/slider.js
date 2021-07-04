const mongoose = require('mongoose');

var schema = new mongoose.Schema({
   imgUrl :{
        type : String
    }
})

const slider = mongoose.model('slider', schema);

module.exports = slider;