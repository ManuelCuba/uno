'use strict'

var express=require('express');
var bodyParser=require('body-parser');
var path=require('path');

var app=express();

//agregue estas lineas para socket
//////////////////////////
var server=require('http').Server(app);
var io=require('socket.io')(server);

io.on('connection', (socket) => {
    console.log("el ip: "+socket.handshake.address+" se ha conectado...");
    socket.on('event1',(data) => {
        console.log(data.msg);
    });
    socket.emit('event2', {
        msg:'Mensaje desde el servidor'
    });
    socket.on('event3', (data) => {
        console.log(data.msg);
        socket.emit('event4', {
            msg:'Loud y borrar'
        });
    });
});
/////////////////////////////

//cargar rutas
var user_routes=require('./routes/user');
var institucion_routes=require('./routes/institucion');
var personal_routes=require('./routes/personal');
var curso_routes=require('./routes/curso');
var materia_routes=require('./routes/materia');

//middlewares de body-parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//rutas base
app.use(express.static('client', {redirect: false}));
app.use('/api',user_routes);
app.use('/api',institucion_routes);
app.use('/api',personal_routes);
app.use('/api',curso_routes);
app.use('/api',materia_routes);

app.get('*', function(req,res,next){
    res.sendFile(path.resolve('client/index.html'));
});

/*app.get('/probando',(req,res) => {
    res.status(200).send({message:'metodo probando'});
});*/

module.exports=app;