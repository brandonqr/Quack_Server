var mongoose = require('mongoose'),
 Schema = mongoose.Schema;

 mongoose.connect( "mongodb://localhost/quack/usuario" );

 var usuarioSchema = new Schema ({
   nickname : String,
   nombre : String,
   email : String,
   genero : String,
   localidad : String,
   socialId : String,
   imagen : String,
   popularidad : Number,
   descripcion : String,
  // eventos [] :[{evento:{type : Schema.Types.ObjectId, ref : 'Evento'}} , {creado: String}]
  eventos: [Schema.Types.Mixed]
 });


var Usuario =  mongoose.model('Usuario', usuarioSchema);

exports.agregar = function ( req, res ){
  Usuario.create( req.body, function( err, usuario ){
    if(err)
      res.send("error");
    else{
      res.json(usuario);
    }
    });
}

exports.eliminar = function ( req, res ) {

  Usuario.findOneAndRemove({
    _id:req.params.id
  },
  function(err, usuarios){
    if( err )
      res.send("error");
    else
      res.json(usuarios);
  })
}

exports.actualizarImagen = function ( req, res ) {
  Usuario.findOneAndUpdate({
    _id:req.params.id
  },
  {$set:{ imagen : req.body.imagen }},
  { upsert : true },
  function( err, usuarios ) {
    if(err)
      res.send("error");
    else
      res.json(usuarios)
    });
}

exports.actualizarPopularidad = function ( req, res ) {
  Usuario.findOneAndUpdate({
    _id:req.params.id
  },
  {$set:{ popularidad : req.body.popularidad }},
  { upsert : true },
  function( err, usuarios ) {
    if(err)
      res.send("error");
    else
      res.json(usuarios)
    });
}

exports.obtenerTodos = function( req, res ){
  Usuario.find({})
  .exec(( err, usuarios )=>{
  if(err)
    res.send("error");
  else
    res.json(usuarios);
  });
}

exports.obtenerPorId = function( req, res ){
  Usuario.findOne({
    _id:req.params.id
  })
  .exec(( err, usuarios ) =>{
    if(err)
      res.send("error");
    else
      res.json(usuarios);
  })
}

exports.obtenerPorUsername = function( req, res ){
  Usuario.find({
    username:req.params.username
  })
  .exec(( err, usuarios ) =>{
    if(err)
      res.send("error");
    else
      res.json(usuarios);
  })
}
exports.obtenerBySocialId=function ( req, res) {

  Usuario.find({
    socialId:req.params.socialId
  })
  .exec(( err, usuarios ) =>{
    if(err)
      res.send("error");
    else
      res.json(usuarios);
  })
}
exports.actualizarEventos = function ( req, res ) {
  console.log("agregando participantes al evento")
  //  Usuario.find({"_id":req.body.usuario_id}).elemMatch("eventos", {"evento":req.body.evento_id})
  console.log(req.body.usuario_id)
  Usuario.findByIdAndUpdate( req.body.usuario_id, {
   $push: { eventos:{ evento:req.body.evento_id , creado:req.body.creado}  }
  })
  .exec(function(err, evento, count)
  {
    if(!err)
       res.json(evento);
  });
}
exports.existeEvento=function ( req, res ) {
  console.log("existeEvento")
  Usuario.find({"_id":req.params.usuario_id}).elemMatch("eventos", {"evento":req.params.evento_id})
  .exec(function(err, evento, count)
  {
    console.log(evento)
   res.json(evento);
  });
}
