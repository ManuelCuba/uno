'use strict'

var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var PersonalShema=Schema({
    user: {
        type: Schema.ObjectId,
        ref: 'User'
      },
    institucion: {
        type: Schema.ObjectId,
        ref: 'Institucion'
    },
    roles: {
        type: [{
            type: String,
            enum: ['profe', 'stud', 'direc', 'secre', 'trabsoc', 'psico', 'tutor', 'admin', 'ninguno', 'contador', 'aux', 'reg', 'por','admp','auxsis']
        }],
        default: ['ninguno']
    },
    nivel: {
        type: [{
            type: String,
            enum: ['inicial', 'primaria', 'secundaria', 'ninguno']
        }],
        default: ['ninguno']
    },  
    materia: {
        type: [{
            type: String,
            enum: ['cn', 'bio', 'geo', 'fis', 'qmc', 'lng', 'qch', 'ing', 'soc', 'edf', 'mus', 'art', 'psi', 'fil', 'rel', 'mat', 'tec', 'stud', 'varias', 'sm']
        }],
        default: ['sm']
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
    gestion: {
        type: String,
        default: ''
    },
    vigencia: {
        type: [{
            type: Number,
            enum: [1,0]
        }],
        default: [0]
    },
    curso: {
        type: [{
            type: String,
            enum: ['1', '2', '3', '4', '5', '6', 'ninguno']
        }],
        default: ['ninguno']
    },
    cursos: {
        type: Schema.ObjectId,
        ref: 'Curso'      
    },
    materias: {
        type: Schema.ObjectId,
        ref: 'Materia'      
    },
    hijo: [{
        usuario:{
            type: Schema.ObjectId,
            ref: 'User'
        }       
    }], 
    deuda: {
        type: [{
            type: String,
            enum: ['si', 'no', 'lim']
        }],
        default: ['no']
    },
    tipo: {
        type: [{
            type: Number,
            enum: [1,0]
        }],
        default: [0]
    },
    aprobo: {
        type: [{
            type: String,
            enum: ['si', 'no', 'casi', '0']
        }],
        default: ['casi']
    },
    updated: {
        type: Date
    },
    created: {
        type: Date,
        default: Date.now
    }

});


module.exports=mongoose.model('Personal', PersonalShema);