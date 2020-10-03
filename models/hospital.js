const mongoose = require('mongoose');

const hosSchema = new mongoose.Schema({
    id:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    phno:{
        type:Number,
        required:true
    }
});

module.exports = mongoose.model('Hospital',hosSchema);