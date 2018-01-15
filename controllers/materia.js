'use strict'

//var path=require('path');
//var fs=require('fs');
var mongoosePaginate=require('mongoose-pagination');

var User=require('../models/user');
var Institucion=require('../models/institucion');
var Materia=require('../models/materia');


//guardar materias de una institucion
function saveMateria(req, res){
    var materia=new Materia();
    var params=req.body;    
    if(params.nombre){
        materia.institucion=req.user.institucion;
        materia.nombre=params.nombre;
        //materia.nivel=params.nivel;

        materia.save((err, materiaStored) => {
            if(err){
                res.status(500).send({message:'Se ha producido un error en el servidor'});
            }else{
                if(!materiaStored){
                    res.status(404).send({message:'No se ha logrado registrar el personal'});
                }else{
                    res.status(200).send({materia:materiaStored});
                }
            }
        });
    }else{
        res.status(200).send({message:'Se han detectado datos en blanco'});
    }    
}

//metodo para listar todos las materias de una institucion
function getMaterias(req, res){
    var institucion=req.user.institucion;
    Materia.find({institucion:institucion}).exec((err, materia) => {
        if(err){
            res.status(500).send({message:'Se ha producido un error en la peticion'});
        }else{
            if(!materia){
                res.status(404).send({message:'No se ha encontrado un listado de materias'});
            }else{
                res.status(200).send({materia});
            }
        }
    });
}

//metodo para mostrar una materia
function getMateria(req, res){
    var materiaId=req.params.id;

    Materia.findById(materiaId).exec((err, materia) => {
        if(err){
            res.status(500).send({message:'Se ha producido un error en la peticion'});
        }else{
            if(!materia){
                res.status(404).send({message:'No se ha encontrado coincidencias con lo que ha requerido'});
            }else{
                res.status(200).send({materia});
            }
        }
    });
}

module.exports={
    saveMateria,
    getMaterias,
    getMateria
}