'use strict'

exports.isAdminInst=function(req, res, next){
    if(req.user.roles != 'admin_in'){
        return res.status(200).send({message:'No se han encontrado permisos'});
    }
    next();
}