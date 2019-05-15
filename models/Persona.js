const mongoose = require('mongoose');

let personaSchema = new mongoose.Schema({
    nombre:{
        type:String,
        required:true
    },
    apellidos:{
        type:String,
        required:true
    },
    edad:Number

});

let Persona = mongoose.model('Persona',personaSchema);
module.exports = Persona;



