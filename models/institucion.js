'use strict'

var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var InstitucionShema=Schema({
    nombre: {
        type: String
      },
    alias: {
        type: String,
        default: ''
      },
    icono: {
        type: String,
        default: 'default.png'
      },
    direccion: {
        type: String,
        default: ''
      },
    telf: {
        type: Number,
        default: '0'
      },
    cel: {
        type: Number,
        default: '0'
      },
    nit: {
        type: String,
        default: '0'
      },
    latitud: {
        type: Number,
        default: '0'
      },
    longitud: {
        type: Number,
        default: '0'
      },
    pais: {
        type: String,
        default: ''
      },
    gestion: {
        type: String,
        default: ''
      },
    created: {
        type: Date,
        default: Date.now
      },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
      },
    admin: {
      type: Schema.ObjectId,
      ref: 'User'
    },
    red: {
        type: String,
        default: ''
      },
    turno: {
      type: [{
        type: Number,
        enum: [1, 2, 3, 4, 5, 6, 7]
      }],
      default: [1]
      },
    distrito: {
        type: String,
        default: ''
      },
    municipio: {
        type: String,
        default: ''
      },
    departamento: {
        type: String,
        default: ''
      },
    sie: {
        type: String,
        default: ''
      },


    dirdistrital: {
        type: String,
        default:''
      },
    dirdepartamental: {
        type: String,
        default: ''
      },
    comunidad: {
        type: String,
        default: ''
      },
    justificacion: {
        type: String,
        default: ''
      },
    objgeneral: {
        type: String,
        default: ''
      },
    objspefic: {
        type: String,
        default: ''
      },
    diagsituacional: {
        type: String,
        default: '',
      },
    apdcurricular: {
        type: String,
        default: ''
      },
    objpsp: {
        type: String,
        default: ''
      },
    objespecificopsp: {
        type: String,
        default: ''
      },
    problemapsp: {
        type: String,
        default: ''
      },
    pspactual: {
        type: String,
        default: ''
      },
    globalpsp: {
        type: String,
        default: ''
      },
    b1des: {
        type: String,
        default: ''
      },
    b2des: {
        type: String,
        default: ''
      },
    b3des: {
        type: String,
        default: ''
      },
    b4des: {
        type: String,
        default: ''
      },
      b1inicial: {
        type: String,
        default: ''
      },
      b2inicial: {
        type: String,
        default: ''
      },
      b3inicial: {
        type: String,
        default: ''
      },
      b4inicial: {
        type: String,
        default: ''
      },
      
      b1primaria: {
        type: String,
        default: ''
      },
      b2primaria: {
        type: String,
        default: ''
      },
      b3primaria: {
        type: String,
        default: ''
      },
      b4primaria: {
        type: String,
        default: ''
      },
      b1secundaria: {
        type: String,
        default: ''
      },
      b2secundaria: {
        type: String,
        default: ''
      },
      b3secundaria: {
        type: String,
        default: ''
      },
      b4secundaria: {
        type: String,
        default: ''
      },
      activo:{
        type: [{
          type: String,
          enum: ['si', 'no']
        }],
        default: ['no']
      }
});

module.exports=mongoose.model('Institucion', InstitucionShema);
