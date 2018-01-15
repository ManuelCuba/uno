'use strict'

var express=require('express');
var MateriaController=require('../controllers/materia');
var api=express.Router();
var md_auth=require('../middlewares/authenticated');
//var md_admin=require('../middlewares/is_admin');

api.post('/materia',md_auth.ensureAuth, MateriaController.saveMateria);
api.get('/materias',md_auth.ensureAuth, MateriaController.getMaterias);
api.get('/materia/:id',md_auth.ensureAuth, MateriaController.getMateria);

module.exports=api;