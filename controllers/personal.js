'use strict'

//var path=require('path');
//var fs=require('fs');
var mongoosePaginate=require('mongoose-pagination');

var User=require('../models/user');
var Institucion=require('../models/institucion');
var Personal=require('../models/personal');
var Curso=require('../models/curso');

function prueba(req, res){
    res.status(200).send({message:'mensaje de personal'});
}
//guardar personal de institucion
function savePersonal(req, res){
    var personal=new Personal();
    var params=req.body;    
    if(params.user){
        personal.user=params.user;
        personal.institucion=params.institucion;
        personal.roles=params.roles;        
        personal.materia=params.materia;        
        personal.gestion=params.gestion;
        personal.vigencia=params.vigencia;  
        personal.turno=params.turno;
        personal.paralelo=params.paralelo;
        personal.nivel=params.nivel;
        personal.curso=params.curso;
        personal.cursos=null;
        personal.materias=null;
        personal.save((err, personalStored) => {
            if(err){
                res.status(500).send({message:'Se ha producido un error en el servidor'});
            }else{
                if(!personalStored){
                    res.status(404).send({message:'No se ha logrado registrar el personal'});
                }else{
                    res.status(200).send({personal:personalStored});
                }
            }
        });
    }else{
        res.status(200).send({message:'Se han detectado datos en blanco'});
    }    
}

//guardar personal de institucion como estudiante
function saveEstudiante(req, res){
    var personal=new Personal();
    var params=req.body;   
    var cur; 
    if(params.user){
        personal.user=params.user;
        personal.institucion=params.institucion;
        personal.roles=params.roles;        
        personal.materia=params.materia;        
        personal.gestion=params.gestion;
        personal.vigencia=params.vigencia;  
        personal.turno=params.turno;
        personal.paralelo=params.paralelo;
        personal.nivel=params.nivel;
        personal.curso=params.curso;
        personal.tipo=params.tipo;
        if(params.roles=='tutor'){
            personal.cursos=null;
        }else{
            personal.cursos=params.cursos;
            cur=personal.cursos;
        }
        
        personal.materias=null;
        personal.save((err, personalStored) => {
            if(err){
                res.status(500).send({message:'Se ha producido un error en el servidor'});
            }else{
                if(!personalStored){
                    res.status(404).send({message:'No se ha logrado registrar el personal'});
                }else{
                    res.status(200).send({personal:personalStored});
                    
                }
            }
        });
    }else{
        res.status(200).send({message:'Se han detectado datos en blanco'});
    }    
}


//metodo para listar todo el personal de la institucion
function getPersonal(req, res){
    var institucion=req.params.id;
    Personal.find({
        $or:[
            {roles:['admin']},   
            {roles:['profe']},
            {roles:['direc']},
            {roles:['secre']},
            {roles:['trabsoc']},
            {roles:['psico']},
            {roles:['contador']},
            {roles:'aux'},
            {roles:['reg']},
            {roles:['admp']},
            {roles:['auxsis']},
            {roles:['por']}
        ],$and:[{institucion:institucion}]}).populate({path:'user'}).exec((err, personal) => {
        if(err){
            res.status(500).send({message:'Se ha producido un error en la peticion'});
        }else{
            if(!personal){
                res.status(404).send({message:'No se ha encontrado un listado de personas'});
            }else{
                res.status(200).send({personal});
            }
        }
    });
}

//metodo para listar todo el personal estudiante de la institucion
function getPersonalSt(req, res){
    var institucion=req.params.id;
    Personal.find({
        $or:[            
            {roles:['stud']}
        ],$and:[{institucion:institucion}]}).populate({path:'user'}).exec((err, personal) => {
        if(err){
            res.status(500).send({message:'Se ha producido un error en la peticion'});
        }else{
            if(!personal){
                res.status(404).send({message:'No se ha encontrado un listado de personas'});
            }else{
                res.status(200).send({personal});
            }
        }
    });
}

//metodo para listar todo el personal estudiante de la institucion por curso
function getPersonalStCur(req, res){
    var institucion=req.params.id;
    var curso=req.params.curso;
    Personal.find({
        $or:[            
            {roles:['stud']}
        ],$and:[{institucion:institucion,cursos:curso}]}).populate({path:'user'}).exec((err, personal) => {
        if(err){
            res.status(500).send({message:'Se ha producido un error en la peticion'});
        }else{
            if(!personal){
                res.status(404).send({message:'No se ha encontrado un listado de personas'});
            }else{
                res.status(200).send({personal});
            }
        }
    });
}
//metodo para listar todo el personal tutor de la institucion
function getPersonalTu(req, res){
    var institucion=req.params.id;
    Personal.find({
        $or:[         
            {roles:['tutor']}
        ],$and:[{institucion:institucion}]}).populate({path:'user'}).populate({path:'hijo'}).exec((err, personal) => {
        if(err){
            res.status(500).send({message:'Se ha producido un error en la peticion'});
        }else{
            if(!personal){
                res.status(404).send({message:'No se ha encontrado un listado de personas'});
            }else{
                res.status(200).send({personal});
            }
        }
    });
}

//metodo para mostrar una persona
function getPersona(req, res){
    var personaId=req.params.id;

    Personal.findById(personaId).populate({path:'user'}).populate({path:'cursos'}).populate({path:'materias'}).exec((err, persona) => {
        if(err){
            res.status(500).send({message:'Se ha producido un error en la peticion'});
        }else{
            if(!persona){
                res.status(404).send({message:'No se ha encontrado coincidencias con lo que ha requerido'});
            }else{
                res.status(200).send({persona});
            }
        }
    });
}

//metodo para mostrar roles de una persona en una institucion
function getPersonaIns(req, res){
    var institucionId=req.params.id;
    var userId=req.user.sub;
    Personal.find({user:userId,institucion:institucionId}).select(
        {
            'institucion':0,
            'user':0,
            '__v':0,
            'created':0,
            'aprobo':0,
            'deuda':0,
            'hijo':0
        }).exec((err, persona) => {
        if(err){
            res.status(500).send({message:'Se ha producido un error en la peticion'});
        }else{
            if(!persona){
                res.status(404).send({message:'No se ha encontrado coincidencias con lo que ha requerido'});
            }else{
                res.status(200).send({persona});
            }
        }
    });
}

//metodo para actualizar datos del personal
function updatePersonal(req, res){
    var personaId=req.params.id;
    var update=req.body;

    Personal.findByIdAndUpdate(personaId, update, {new:true}, (err, personalUpdate) => {
        if(err){
            res.status(500).send({message:'Se ha producido un error en la peticion'});
        }else{
            if(!personalUpdate){
                res.status(404).send({message:'Se ha logrado cumplir con su peticion'});
            }else{
                res.status(200).send({personal:personalUpdate});
            }
        }
    });
}
function agregaHijo(req, res){   
    var cur=req.params.id; 
    var datos=req.body;
    var personaId=datos.tutor;
    var hijoId=datos.hijo;
    var numero=datos.suma;
    if(numero==0){
        numero=0;
    }else{
        numero=1;
    }

    Personal.findById(personaId).exec((err, persona) => {
        
        if(err){
            res.status(500).send({message:'Se ha producido un error en la peticion'});
        }else{
            if(!persona){
                res.status(404).send({message:'No se ha encontrado coincidencias con lo que ha requerido'});
            }else{
                persona.hijo.push({
                    usuario: hijoId
                });
                persona.save();
                //res.status(200).send({persona:persona});
                if(persona){
                    Curso.findByIdAndUpdate(cur, { $inc: { inscrito: numero } }, {new:true}, (err, cursoUpdate) => {
                        if(err){
                            res.status(500).send({message:'Se ha producido un error en la peticion'});
                        }else{
                            if(!cursoUpdate){
                                res.status(404).send({message:'No se ha logrado cumplir con su peticion'});
                            }else{
                                res.status(200).send({persona:cursoUpdate});
                            }
                        }
                    });
                }
            }
        }
    });
}

module.exports={
    prueba,
    savePersonal,
    getPersona,
    getPersonal,
    updatePersonal,
    getPersonaIns,
    agregaHijo,
    getPersonalSt,
    getPersonalTu,
    saveEstudiante,
    getPersonalStCur
}