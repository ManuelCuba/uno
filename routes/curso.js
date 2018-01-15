'use strict'

var express=require('express');
var CursoController=require('../controllers/curso');
var api=express.Router();
var md_auth=require('../middlewares/authenticated');
//var md_admin=require('../middlewares/is_admin');

api.post('/curso',md_auth.ensureAuth, CursoController.saveCurso);
api.get('/cursos',md_auth.ensureAuth, CursoController.getCursos);
api.get('/cursos-inicial',md_auth.ensureAuth, CursoController.getCursosIn);
api.get('/cursos-primaria',md_auth.ensureAuth, CursoController.getCursosPr);
api.get('/cursos-secundaria',md_auth.ensureAuth, CursoController.getCursosSe);
api.get('/cursos-inicial-a',md_auth.ensureAuth, CursoController.getCursosInA);
api.get('/cursos-primaria-a',md_auth.ensureAuth, CursoController.getCursosPrA);
api.get('/cursos-secundaria-a',md_auth.ensureAuth, CursoController.getCursosSeA);
api.get('/cursos-inicial-b',md_auth.ensureAuth, CursoController.getCursosInB);
api.get('/cursos-primaria-b',md_auth.ensureAuth, CursoController.getCursosPrB);
api.get('/cursos-secundaria-b',md_auth.ensureAuth, CursoController.getCursosSeB);
api.get('/curso/:id',md_auth.ensureAuth, CursoController.getCurso);
api.put('/curso-update/:id',md_auth.ensureAuth, CursoController.updateCurso);
module.exports=api;