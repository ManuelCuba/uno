'use strict'

var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var MateriaShema=Schema({
    institucion: {
        type: Schema.ObjectId,
        ref: 'Institucion'
    },
    nombre: {
        type: String,
        default: ''
    },
    nivel: {
        type: [{
            type: String,
            enum: ['inicial', 'primaria', 'secundaria', 'ninguno']
        }],
        default: ['ninguno']
    }, 
    updated: {
        type: Date
    },
    created: {
        type: Date,
        default: Date.now
    }

});


module.exports=mongoose.model('Materia', MateriaShema);