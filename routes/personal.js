'use strict'

var express=require('express');
var PersonalController=require('../controllers/personal');
var api=express.Router();
var md_auth=require('../middlewares/authenticated');
//var md_admin=require('../middlewares/is_admin');

api.get('/personal',md_auth.ensureAuth, PersonalController.prueba);
api.post('/personal',md_auth.ensureAuth, PersonalController.savePersonal);
api.post('/registro-estudiantes',md_auth.ensureAuth, PersonalController.saveEstudiante);
api.get('/personal/:id',md_auth.ensureAuth, PersonalController.getPersonal);
api.get('/personal-st/:id',md_auth.ensureAuth, PersonalController.getPersonalSt);
api.get('/personal-stcu/:id/:curso',md_auth.ensureAuth, PersonalController.getPersonalStCur);
api.get('/personal-tu/:id',md_auth.ensureAuth, PersonalController.getPersonalTu);
api.get('/persins/:id',md_auth.ensureAuth, PersonalController.getPersonaIns);
api.get('/persona/:id',md_auth.ensureAuth, PersonalController.getPersona);
api.put('/personal-update/:id',md_auth.ensureAuth, PersonalController.updatePersonal);
api.post('/hijo/:id',md_auth.ensureAuth, PersonalController.agregaHijo);
module.exports=api;