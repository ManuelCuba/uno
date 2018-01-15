'use strict'

var express=require('express');
var InstitucionController=require('../controllers/institucion');

var api=express.Router();
var md_auth=require('../middlewares/authenticated');
var md_admin_inst=require('../middlewares/is_admin_inst');
var md_admin=require('../middlewares/is_admin');

var multipart=require('connect-multiparty');
var md_upload=multipart({uploadDir: './modules/users/clientes/institucion'});

api.get('/pruebas-institucion', md_auth.ensureAuth, InstitucionController.pruebas);
api.post('/institucion', [md_auth.ensureAuth, md_admin.isAdmin], InstitucionController.saveInstitucion);
api.get('/instituciones', [md_auth.ensureAuth, md_admin.isAdmin], InstitucionController.getInstituciones);
api.get('/institucion/:id', md_auth.ensureAuth,  InstitucionController.getInstitucion);
api.put('/institucion/:id', md_auth.ensureAuth, InstitucionController.updateInstitucion);
api.post('/upload-image-institucion/:id', [md_auth.ensureAuth, md_upload], InstitucionController.uploadImage);
api.get('/get-image-institucion/:imageFile', md_auth.ensureAuth, InstitucionController.getImageFile);
api.put('/asigna-admin/:id', md_auth.ensureAuth, InstitucionController.asignaAdmin);

module.exports=api;