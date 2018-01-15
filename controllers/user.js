'use strict'

//modulos
var bcrypt=require('bcrypt-nodejs');
var fs=require('fs');
var path=require('path');

//modelos
var User=require('../models/user');
var Institucion=require('../models/institucion');

//servicio jwt
var jwt=require('../services/jwt');


//acciones
function pruebas(req, res){
        //message:'Probando el controlador de usarios',
        return req.user;
}

//metodo para registrar usuario
function saveUser(req, res){
    //crear el objeto del usuario
    var user=new User();

    //recoger los parametros que nos llegan por la peticion
    var params=req.body;   
    if(params.password && params.nombres && params.paterno && params.email && params.username){
        //asignar valores al objeto usuario
        user.nombres=params.nombres;
        user.paterno=params.paterno;
        user.materno=params.materno;
        user.cedula=params.cedula;
        user.celular=params.celular;
        user.email=params.email;
        user.username=params.username;

        if(params.ocupacion!=''){
            user.ocupacion=params.ocupacion;
            user.instruccion=params.instruccion;
            user.zona=params.zona;
            user.calle=params.calle;
        }else{
            user.ocupacion='';
            user.instruccion='';
            user.zona='';
            user.calle='';
        }
        if(params.sexo!=''){
            user.zona=params.zona;
            user.calle=params.calle;
            user.sexo=params.sexo;
            user.nacimiento=params.nacimiento;
            user.estadocivil=params.estadocivil;
            user.gsanguineo=params.gsanguineo;
        }else{
            user.zona='';
            user.calle='';
            user.gsanguineo='';
        }
        if(params.zona!=''){
            user.zona=params.zona;
            user.calle=params.calle;
        }else{
            user.zona='';
            user.calle='';
        }



        if(params.roles=='ninguno'){
            user.roles='ninguno';
        }else{
            user.roles=params.roles;
        }
            
        user.password=params.password;
        if(params.institucion==''){
            user.institucion=null;
        }else{
            user.institucion=params.institucion;
        }

        User.findOne({email:user.email.toLowerCase()}, (err, issetUser) => {
            if(err){
                res.status(500).send({message: 'Error al comprobar el usuario'});
            }else{
                if(!issetUser){
                    //cifrar password
                    bcrypt.hash(params.password, null, null, function(err, hash){
                        user.password=hash;
                        //guarda usuario en bd
                        user.save((err, userStored) => {
                            if(err){
                                res.status(500).send({message:'Error al guardar el usuario'}); 
                            }else{
                                if(!userStored){
                                    res.status(404).send({message:'No se ha registrado el usuario'});
                                }else{
                                    res.status(200).send({user: userStored});
                                }
                            }
                        });
                    });
                }else{
                    res.status(200).send({
                        message: 'El usuario ya se encuentra registrado'
                    });
                }
            }
        });
    }else{
        res.status(200).send({
            message:'Se ha detectado campos erroneos en el formulario'
        });
    }
}

//metodo para loguear usuario
function login(req, res){
    var params=req.body;
    var email=params.email;
    var password=params.password;

    User.findOne({email:email.toLowerCase()}, (err, user) => {
        if(err){
            res.status(500).send({message: 'Error al comprobar el usuario'});
        }else{
            if(user){
                bcrypt.compare(password, user.password, (err, check) => {
                    if(check){
                        //comprobar y generar el token
                        if(params.gettoken){
                            //devolver el token
                            res.status(200).send({
                                token:jwt.createToken(user)
                            });
                        }else{
                            user.password=undefined;
                            user.__v=undefined;
                            res.status(200).send({user});
                        }                        
                    }else{
                        res.status(404).send({message:'El usuario no ha podido loguearse correctamente'});
                    }
                });                
            }else{
                res.status(404).send({message:'El usuario no ha podido loguearse'});
            }
        }
    }).populate({path:'institucion', select:'nombre alias icono direccion telf cel nit latitud longitud pais gestion red turno distrito municipio departamento sie dirdistrital dirdepartamental comunidad justificacion objgeneral objspecific diagsituacional apdcurricular objpsp objespecificopsp problemapsp pspactual globalpsp b1des b2des b3des b4des b1inicial b2inicial b3inicial b4inicial b1primaria b2primaria b3primaria b4primaria b1secundaria b2secundaria b3secundaria b4secundaria activo'});    
}

//metodo para modificar datos de usuario
function updateUser(req, res){
    var userId=req.params.id;
    var update=req.body;
    delete update.password;

    if(userId != req.user.sub){
        return res.status(500).send({message:'No tienes permisos'});
    }

    User.findByIdAndUpdate(userId, update, {new:true}, (err, userUpdate) => {
        if(err){
            res.status(500).send({message:'Error al realizar los cambios'});
        }else{
            if(!userUpdate){
                res.status(404).send({message:'No se ha logrado realizar los cambios solicitados'});
            }else{
                res.status(200).send({user:userUpdate});
            }
        }
    });    
}

//metodo para subir imagen de usuario
function uploadImage(req, res){
    var userId=req.params.id;
    var file_name='No subido...';
    if(req.files){
        var file_path=req.files.profileImageURL.path;
        var file_split=file_path.split('/');
        var file_name=file_split[5];

        var ext_split=file_name.split('\.');
        var file_ext=ext_split[1];

        if(file_ext=='png' || file_ext=='jpg' || file_ext=='jpeg' || file_ext=='gif'){
            if(userId != req.user.sub){
                return res.status(500).send({message:'No tienes permisos'});
            }
            //file_name='./modules/users/clientes/imagenes/profile/'+file_name;
            User.findByIdAndUpdate(userId, {profileImageURL:file_name}, {new:true}, (err, userUpdate) => {
                if(err){
                    res.status(500).send({message:'Error al realizar los cambios'});
                }else{
                    if(!userUpdate){
                        res.status(404).send({message:'No se ha logrado realizar los cambios solicitados'});
                    }else{
                        res.status(200).send({user:userUpdate, profileImageURL:file_name});
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
    var path_file='./modules/users/clientes/imagenes/profile/'+imageFile;

    fs.exists(path_file, function(exists){
        if(exists){
            res.sendFile(path.resolve(path_file));
        }else{
            res.status(404).send({message:'No se ha logrado encontrar la imagen'});
        }
    });    
}

//metodo para mostrar lista de usuarios administradores
function getManager(req, res){
    User.find({roles:'admin'}).exec((err, users) => {
        if(err){
            res.status(500).send({message:'Se ha producido un error en la peticion'});
        }else{
            if(!users){
                res.status(404).send({message:'No se ha encontrado lista de administracion'});
            }else{
                res.status(200).send({users});
            }
        }
    });
}

//metodo para mostrar lista de usuarios 
function getUsuario(req, res){
    User.find({roles:'user'}).exec((err, users) => {
        if(err){
            res.status(500).send({message:'Se ha producido un error en la peticion'});
        }else{
            if(!users){
                res.status(404).send({message:'No se ha encontrado lista de administradores de institucion'});
            }else{
                res.status(200).send({users});
            }
        }
    });
}

//metodo para mostrar lista de usuarios profesores
function getNinguno(req, res){
    User.find({roles:'ninguno'}).exec((err, users) => {
        if(err){
            res.status(500).send({message:'Se ha producido un error en la peticion'});
        }else{
            if(!users){
                res.status(404).send({message:'No se ha encontrado lista de profesores'});
            }else{
                res.status(200).send({users});
            }
        }
    });
}



module.exports={
    pruebas,
    saveUser,
    login,
    updateUser,
    uploadImage,
    getImageFile,
    getManager,
    getUsuario,
    getNinguno
};