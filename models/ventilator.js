const mongoose = require('mongoose');

const venSchema = new mongoose.Schema({
    id:{
        type:String,
        required:true
    },
    venId:{
        type:String,
        required:true
    },
    nameHos:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('Ventilator',venSchema);