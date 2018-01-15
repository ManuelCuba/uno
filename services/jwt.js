'use strict'

var jwt=require('jwt-simple');
var moment=require('moment');
var secret='mi_claveSecreta';

exports.createToken=function(user){
    if(user.institucion==null){
        var payload={
            sub:user._id,
            nombres:user.nombres,
            paterno:user.paterno,
            materno:user.materno,
            email:user.email,
            username:user.username,
            profileImageURL:user.profileImageURL,
            roles:user.roles,   
            iat:moment().unix(),
            exp:moment().add(30, 'days').unix()
        };
    }else{
        var payload={
            sub:user._id,
            nombres:user.nombres,
            paterno:user.paterno,
            materno:user.materno,
            email:user.email,
            username:user.username,
            profileImageURL:user.profileImageURL,
            roles:user.roles,        
            institucion:user.institucion._id,
            iat:moment().unix(),
            exp:moment().add(30, 'days').unix()
        };
    }
    
    return jwt.encode(payload, secret);
};