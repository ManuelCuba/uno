'use strict'

//modulos

var fs=require('fs');
var path=require('path');

//modelos
var User=require('../models/user');
var Institucion=require('../models/institucion');


//acciones
function pruebas(req, res){
    res.status(200).send({
        message:'Probando el controlador de institucion',
        user:req.user
    });
}

function saveInstitucion(req, res){
    var institucion=new Institucion();
    var params=req.body;    
    console.log(params.nombre);
    if(params.nombre){
        institucion.nombre=params.nombre;
        institucion.alias=params.alias;
        institucion.direccion=params.direccion;
        institucion.telf=params.telf;
        institucion.cel=params.cel;
        institucion.nit=params.nit;
        institucion.pais=params.pais;
        institucion.departamento=params.departamento;
        institucion.municipio=params.municipio;
        institucion.distrito=params.distrito;
        institucion.red=params.red;
        institucion.sie=params.sie;
        institucion.dirdistrital=params.dirdistrital;
        institucion.dirdepartamental=params.dirdepartamental;
        institucion.user=req.user.sub;
        institucion.admin=null;

        institucion.save((err, institucionStored) => {
            if(err){
                res.status(500).send({message:'Se ha producido un error en el servidor'});
            }else{
                if(!institucionStored){
                    res.status(404).send({message:'No se ha logrado registrar la institucion'});
                }else{
                    res.status(200).send({institucion:institucionStored});
                }
            }
        });
    }else{
        res.status(200).send({message:'Se han detectado datos en blanco'});
    }    
}

//metodo para listar todas las intituciones
function getInstituciones(req, res){
    Institucion.find({}).populate({path:'user'}).populate({path:'admin'}).exec((err, instituciones) => {
        if(err){
            res.status(500).send({message:'Se ha producido un error en la peticion'});
        }else{
            if(!instituciones){
                res.status(404).send({message:'No se ha encontrado un listado de instituciones'});
            }else{
                res.status(200).send({instituciones});
            }
        }
    });
}

//metodo para mostrar una institucion
function getInstitucion(req, res){
    var institucionId=req.params.id;

    Institucion.findById(institucionId).populate({path:'user'}).populate({path:'admin'}).exec((err, institucion) => {
        if(err){
            res.status(500).send({message:'Se ha producido un error en la peticion'});
        }else{
            if(!institucion){
                res.status(404).send({message:'No se ha encontrado coincidencias con lo que ha requerido'});
            }else{
                res.status(200).send({institucion});
            }
        }
    });
}

//metodo para actualizar institucion
function updateInstitucion(req, res){
    var institucionId=req.params.id;
    var update=req.body;

    Institucion.findByIdAndUpdate(institucionId, update, {new:true}, (err, institucionUpdate) => {
        if(err){
            res.status(500).send({message:'Se ha producido un error en la peticion'});
        }else{
            if(!institucionUpdate){
                res.status(404).send({message:'Se ha logrado cumplir con su peticion'});
            }else{
                res.status(200).send({institucion:institucionUpdate});
            }
        }
    });
}

//metodo para asignar administrador a una institucion
function asignaAdmin(req, res){
    var institucionId=req.params.id;
    var update=req.body;
    var valor=update.admin;

    Institucion.findByIdAndUpdate(institucionId, valor, {new:true}, (err, institucionUpdate) => {
        if(err){
            res.status(500).send({message:'Se ha producido un error en la peticion'});
        }else{
            if(!institucionUpdate){
                res.status(404).send({message:'Se ha logrado cumplir con su peticion'});
            }else{
                res.status(200).send({institucion:institucionUpdate});
            }
        }
    });
}


//metodo para subir imagen de usuario
function uploadImage(req, res){
    var institucionId=req.params.id;
    var file_name='No subido...';
    if(req.files){
        var file_path=req.files.icono.path;
        var file_split=file_path.split('/');
        var file_name=file_split[4];

        var ext_split=file_name.split('\.');
        var file_ext=ext_split[1];

        if(file_ext=='png' || file_ext=='jpg' || file_ext=='jpeg' || file_ext=='gif'){
            /*if(institucionId != req.user.sub){
                return res.status(500).send({message:'No tienes permisos'});
            }*/
            Institucion.findByIdAndUpdate(institucionId, {icono:file_name}, {new:true}, (err, institucionUpdate) => {
                if(err){
                    res.status(500).send({message:'Error al realizar los cambios'});
                }else{
                    if(!institucionUpdate){
                        res.status(404).send({message:'No se ha logrado realizar los cambios solicitados'});
                    }else{
                        res.status(200).send({institucion:institucionUpdate, icono:file_name});
                    }
                }
            });
        }else{
            fs.unlink(file_path, (err) => {
                if(err){
                    res.status(200).send({message:'Extension no valida, archivo guardado'});
                }else{
                    res.status(200).send({message:'Extension no valida'});
                }
            });
        }       
    }else{
        res.status(200).send({message:'No se han subido ficheros'});
    }    
}

//metodo para mostrar imagen de usuario
function getImageFile(req, res){
    var imageFile=req.params.imageFile;
    var path_file='./modules/users/clientes/institucion/'+imageFile;

    fs.exists(path_file, function(exists){
        if(exists){
            res.sendFile(path.resolve(path_file));
        }else{
            res.status(404).send({message:'No se ha logrado encontrar la imagen'});
        }
    });    
}


module.exports={
    pruebas,
    saveInstitucion,
    getInstituciones,
    getInstitucion,
    updateInstitucion,
    uploadImage,
    getImageFile,
    asignaAdmin
};