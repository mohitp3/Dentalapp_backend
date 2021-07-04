const mongoose = require('mongoose');

var schema = new mongoose.Schema({
   
    
    dentists :{
        type : Number,
        default:0,
        validate : {
            validator : Number.isInteger,
            message   : '{VALUE} is not an integer value'
          }
    },
    patients :{
        type : Number,
        default:0,
        validate : {
            validator : Number.isInteger,
            message   : '{VALUE} is not an integer value'
          }
    },
    rooms :{
        type : Number,
        default:0,
        validate : {
            validator : Number.isInteger,
            message   : '{VALUE} is not an integer value'
          }
    },
    machines :{
        type : Number,
        default:0,
        validate : {
            validator : Number.isInteger,
            message   : '{VALUE} is not an integer value'
          }
    }
})

const clinicData = mongoose.model('clinicData', schema);

module.exports = clinicData;