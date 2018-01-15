'use strict'

var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var CursoShema=Schema({
    asesor1: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    asesor2: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    aux1: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    aux2: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    institucion: {
        type: Schema.ObjectId,
        ref: 'Institucion'
    },
    nombre: {
        type: [{
            type: String,
            enum: ['Primero', 'Segundo', 'Tercero', 'Cuarto', 'Quinto', 'Sexto', 'ninguno']
        }],
        default: ['ninguno']
    },
    numero: {
        type: [{
            type: Number,
            enum: [1,2,3,4,5,6,0]
        }],
        default: [0]
    },
    nivel: {
        type: [{
            type: String,
            enum: ['inicial', 'primaria', 'secundaria', 'ninguno']
        }],
        default: ['ninguno']
    },   
    turno: {
        type: [{
            type: Number,
            enum: [1,2,3,4,0]
        }],
        default: [0]
    },
    paralelo: {
        type: [{
            type: String,
            enum: ['A', 'B', 'C', 'D', 'E', 'F', 'ninguno']
        }],
        default: ['ninguno']
    },
    inscrito: {
        type: Number,
        default: 0
    },
    capacidad: {
        type: Number,
        default: 0
    },
    vigencia: {
        type: [{
            type: Number,
            enum: [1,0]
        }],
        default: [0]
    },
    updated: {
        type: Date
    },
    created: {
        type: Date,
        default: Date.now
    }

});


module.exports=mongoose.model('Curso', CursoShema);