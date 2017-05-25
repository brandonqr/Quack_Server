var express = require( 'express' ),
usuario = require( './models/model.usuario.js' ),
evento = require( './models/model.evento.js' ),
categoria = require( './models/model.categoria.js' ),
bodyParser = require( 'body-parser');

var app=express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));

//CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  // Request methods you wish to allow
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  next();
});

//usuarios
app.post( '/usuario', usuario.agregar );
app.put( '/usuario/imagen/:id', usuario.actualizarImagen );//actualizar imagen
app.put( '/usuario/popularidad/:id', usuario.actualizarPopularidad );//actualizar imagen
app.put( '/usuario/actualizar/eventos/:id', usuario.actualizarEventos );//actualizar imagen
app.get( '/usuario/actualizar/eventos/:evento_id/:usuario_id', usuario.existeEvento );//actualizar imagen
app.delete( '/usuario/:id', usuario.eliminar );
app.get( '/usuario', usuario.obtenerTodos );
app.get( '/usuario/socialId/:socialId', usuario.obtenerBySocialId );
app.get( '/usuario/username/:username', usuario.obtenerPorUsername );
app.get( '/usuario/:id', usuario.obtenerPorId );

//evento
app.post( '/evento', evento.agregar );
app.delete( '/evento/:id', evento.eliminar );
app.put( '/evento/:id', evento.actualizar );
//app.put( '/evento/participante/:id', evento.actualizar );
app.put( '/evento/participante/:id', evento.agregarParticipante );
app.get( '/evento/:id', evento.obtenerPorId );
app.get( '/evento', evento.obtenerTodos );
app.get( '/evento/usuario/:usuario', evento.obtenerPorUsuario );
app.get( '/evento/categoria/:categoria', evento.obtenerPorCategoria );

//categorias
app.post( '/categoria', categoria.agregar );
app.get( '/categoria', categoria.obtenerTodos );

app.listen(3000);
console.log("escuchando en el puerto 3000");
