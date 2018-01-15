'use strict'

//var path=require('path');
//var fs=require('fs');
var mongoosePaginate=require('mongoose-pagination');

var User=require('../models/user');
var Institucion=require('../models/institucion');
var Curso=require('../models/curso');


//guardar cursos de una institucion
function saveCurso(req, res){
    var curso=new Curso();
    var params=req.body;    
    if(params.nombre){
        curso.asesor1=null;
        curso.asesor2=null;
        curso.aux1=null;
        curso.aux2=null;
        curso.institucion=req.user.institucion;
        curso.nombre=params.nombre;
        curso.numero=params.numero;
        curso.nivel=params.nivel;
        curso.turno=params.turno;
        curso.paralelo=params.paralelo;
        curso.capacidad=params.capacidad;

        curso.save((err, cursoStored) => {
            if(err){
                res.status(500).send({message:'Se ha producido un error en el servidor'});
            }else{
                if(!cursoStored){
                    res.status(404).send({message:'No se ha logrado registrar el personal'});
                }else{
                    res.status(200).send({curso:cursoStored});
                }
            }
        });
    }else{
        res.status(200).send({message:'Se han detectado datos en blanco'});
    }    
}

//metodo para listar todos los cursos de una institucion
function getCursos(req, res){
    var institucion=req.user.institucion;
    Curso.find({institucion:institucion}).sort({nivel:1}).exec((err, curso) => {
        if(err){
            res.status(500).send({message:'Se ha producido un error en la peticion'});
        }else{
            if(!curso){
                res.status(404).send({message:'No se ha encontrado un listado de cursos'});
            }else{
                res.status(200).send({curso});
            }
        }
    });
}

//metodo para listar todos los cursos de inicial una institucion
async function getCursosIn(req, res){
    var institucion=req.user.institucion;
    var inicial="inicial";
    Curso.find({institucion:institucion, nivel:inicial}).exec((err, curso) => {
        if(err){
            res.status(500).send({message:'Se ha producido un error en la peticion'});
        }else{
            if(!curso){
                res.status(404).send({message:'No se ha encontrado un listado de cursos'});
            }else{
                res.status(200).send({curso});
            }
        }
    });
}
//metodo para listar todos los cursos de primaria una institucion
async function getCursosPr(req, res){
    var institucion=req.user.institucion;
    var primaria="primaria";
    Curso.find({institucion:institucion, nivel:primaria}).exec((err, curso) => {
        if(err){
            res.status(500).send({message:'Se ha producido un error en la peticion'});
        }else{
            if(!curso){
                res.status(404).send({message:'No se ha encontrado un listado de cursos'});
            }else{
                res.status(200).send({curso});
            }
        }
    });
}
//metodo para listar todos los cursos de secundaria de una institucion
async function getCursosSe(req, res){
    var institucion=req.user.institucion;
    var secundaria="secundaria";
    Curso.find({institucion:institucion, nivel:secundaria}).exec((err, curso) => {
        if(err){
            res.status(500).send({message:'Se ha producido un error en la peticion'});
        }else{
            if(!curso){
                res.status(404).send({message:'No se ha encontrado un listado de cursos'});
            }else{
                res.status(200).send({curso});
            }
        }
    });
}
//metodo para listar todos los cursos de inicial rojos de una institucion
async function getCursosInA(req, res){
    var institucion=req.user.institucion;
    var inicial="inicial";
    var paralelo="A";
    Curso.find({institucion:institucion, nivel:inicial, paralelo:paralelo}).exec((err, curso) => {
        if(err){
            res.status(500).send({message:'Se ha producido un error en la peticion'});
        }else{
            if(!curso){
                res.status(404).send({message:'No se ha encontrado un listado de cursos'});
            }else{
                res.status(200).send({curso});
            }
        }
    });
}
//metodo para listar todos los cursos de inicial azules de una institucion
async function getCursosInB(req, res){
    var institucion=req.user.institucion;
    var inicial="inicial";
    var paralelo="B";
    Curso.find({institucion:institucion, nivel:inicial, paralelo:paralelo}).exec((err, curso) => {
        if(err){
            res.status(500).send({message:'Se ha producido un error en la peticion'});
        }else{
            if(!curso){
                res.status(404).send({message:'No se ha encontrado un listado de cursos'});
            }else{
                res.status(200).send({curso});
            }
        }
    });
}

//metodo para listar todos los cursos de primaria rojos de una institucion
async function getCursosPrA(req, res){
    var institucion=req.user.institucion;
    var primaria="primaria";
    var paralelo="A";
    Curso.find({institucion:institucion, nivel:primaria, paralelo:paralelo}).exec((err, curso) => {
        if(err){
            res.status(500).send({message:'Se ha producido un error en la peticion'});
        }else{
            if(!curso){
                res.status(404).send({message:'No se ha encontrado un listado de cursos'});
            }else{
                res.status(200).send({curso});
            }
        }
    });
}
//metodo para listar todos los cursos de primaria azules de una institucion
async function getCursosPrB(req, res){
    var institucion=req.user.institucion;
    var primaria="primaria";
    var paralelo="B";
    Curso.find({institucion:institucion, nivel:primaria, paralelo:paralelo}).exec((err, curso) => {
        if(err){
            res.status(500).send({message:'Se ha producido un error en la peticion'});
        }else{
            if(!curso){
                res.status(404).send({message:'No se ha encontrado un listado de cursos'});
            }else{
                res.status(200).send({curso});
            }
        }
    });
}

//metodo para listar todos los cursos de secundaria rojos de una institucion
async function getCursosSeA(req, res){
    var institucion=req.user.institucion;
    var secundaria="secundaria";
    var paralelo="A";
    Curso.find({institucion:institucion, nivel:secundaria, paralelo:paralelo}).exec((err, curso) => {
        if(err){
            res.status(500).send({message:'Se ha producido un error en la peticion'});
        }else{
            if(!curso){
                res.status(404).send({message:'No se ha encontrado un listado de cursos'});
            }else{
                res.status(200).send({curso});
            }
        }
    });
}

//metodo para listar todos los cursos de secundaria azules de una institucion
async function getCursosSeB(req, res){
    var institucion=req.user.institucion;
    var secundaria="secundaria";
    var paralelo="B";
    Curso.find({institucion:institucion, nivel:secundaria, paralelo:paralelo}).exec((err, curso) => {
        if(err){
            res.status(500).send({message:'Se ha producido un error en la peticion'});
        }else{
            if(!curso){
                res.status(404).send({message:'No se ha encontrado un listado de cursos'});
            }else{
                res.status(200).send({curso});
            }
        }
    });
}

//metodo para mostrar un curso
function getCurso(req, res){
    var cursoId=req.params.id;

    Curso.findById(cursoId).exec((err, curso) => {
        if(err){
            res.status(500).send({message:'Se ha producido un error en la peticion'});
        }else{
            if(!curso){
                res.status(404).send({message:'No se ha encontrado coincidencias con lo que ha requerido'});
            }else{
                res.status(200).send({curso});
            }
        }
    });
}



//metodo para actualizar datos del personal
function updateCurso(req, res){
    var cursoId=req.params.id;
    var update=req.body;

    Curso.findByIdAndUpdate(cursoId, update, {new:true}, (err, cursoUpdate) => {
        if(err){
            res.status(500).send({message:'Se ha producido un error en la peticion'});
        }else{
            if(!cursoUpdate){
                res.status(404).send({message:'Se ha logrado cumplir con su peticion'});
            }else{
                res.status(200).send({curso:cursoUpdate});
            }
        }
    });
}

module.exports={
    saveCurso,
    getCursos,
    getCurso,
    updateCurso,
    getCursosInA,
    getCursosPrA,
    getCursosSeA,
    getCursosInB,
    getCursosPrB,
    getCursosSeB,
    getCursosIn,
    getCursosPr,
    getCursosSe
}