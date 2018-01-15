'use strict'

exports.isAdmin=function(req, res, next){
    if(req.user.roles != 'admin'){
        return res.status(200).send({message:'No se han encontrado permisos'});
    }
    next();
}