'use strict'

var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var UserShema=Schema({
    nombres: {
        type: String
      },
      paterno: {
        type: String,
        default: '-'
      },
      materno: {
        type: String,
        default: '-'
      }, 
      displayName: {
        type: String
      },
      sexo: {
        type: [{
          type: String,
          enum: ['M', 'F']
        }],
        default: ['M']
      },
      nacimiento: {
        type: Date,
        default: '1960-06-06'
      },
      cedula: {
        type: String,
        default: ''
      },
      celular: {
        type: Number,
        unique: true
      },
      email: {
        type: String,
        unique: true,
        lowercase: true,
      },
      username: {
        type: String,
        lowercase: true
      },
      password: {
        type: String
      },
      estadocivil: {
        type: [{
          type: String,
          enum: ['soltero', 'casado', 'viudo', 'divorciado']
        }],
        default: ['soltero']
      },
      idioma: {
        type: String,
        default: 'Castellano'
      },
      zona: {
        type: String
      },
      calle: {
        type: String
      },
      ocupacion: {
        type: String
      },
      instruccion: {
        type: String
      },
      profileImageURL: {
        type: String,
        default: 'default.jpg'
      },
      roles: {
        type: [{
          type: String,
          enum: ['admin', 'ninguno', 'user']
        }],
        default: ['ninguno']
      },
      updated: {
        type: Date
      },
      created: {
        type: Date,
        default: Date.now
      },
      /* For reset password */
      resetPasswordToken: {
        type: String
      },
      resetPasswordExpires: {
        type: Date
      },
      latitud: {
        type: Number
      },
      longitud: {
        type: Number
      },
      gsanguineo: {
        type: String
      },
      pais: {
        type: String,
        default: 'Bolivia'
      },
      departamento:{
        type: String,
        default: 'Potosí'
      },
      institucion: {
        type: Schema.ObjectId,
        ref: 'Institucion'
      }

});

module.exports=mongoose.model('User', UserShema);