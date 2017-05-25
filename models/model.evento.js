var mongoose = require('mongoose'),
 Schema = mongoose.Schema;

  mongoose.connect( "mongodb://localhost/quack/evento" );

var eventoSchema = new Schema({
   usuario : { type : Schema.Types.ObjectId, ref : 'Usuario' },
   nombre : String,
   imagen : String,
   descripcion : String,
   categoria : String,
   fecha : String,
   participantes :[{type : Schema.Types.ObjectId, ref : 'Usuario' }]

 });

var Evento =  mongoose.model('Evento', eventoSchema);

exports.agregarParticipante = function ( req, res ){

  Evento.findByIdAndUpdate(req.body.evento_id, {
  $push: { participantes : req.body.usuario_id }
})
.exec(function(err, evento, count)
{
 res.send(evento);
});

}


exports.agregar = function ( req, res ){
  console.log(req.body)
  Evento.create( req.body, function( err, evento ){
    if(err)
      res.send("error");
    else
      res.send(evento._id)
  })
}

exports.eliminar = function ( req, res ){
  Evento.findOneAndRemove({
    _id:req.params.id
  },
  function( err, evento){
    if( err )
      res.send("error");

    else
      res.json(null);
  });
}

exports.actualizar = function ( req, res ){
 Evento.findOneAndUpdate(
    {_id: req.params.id},
    {nombre: req.body.nombre,
    imagen: req.body.imagen,
    descripcion: req.body.descripcion,
    categoria: req.body.categoria,
    fecha: req.body.fecha})
    .exec(function(err, evento, count)
 {
     res.send(evento);
 });
}

exports.obtenerPorId = function( req, res ){
  Evento.findOne({
    _id:req.params.id
    })
  .exec(( err, evento ) =>{
    if(err)
      res.send("error");
    else
      res.json(evento);
  })
}

exports.obtenerTodos = function( req, res ){
  Evento.find({ })
  .exec(( err, eventos )=>{
  if(err)
    res.send("error");
  else
    res.json(eventos);
  });
}

exports.obtenerPorUsuario = function ( req, res ) {
  Evento.find({
    usuario:req.params.usuario
  })
  .exec(( err, evento ) =>{
    if(err)
      res.send("error");
    else
      res.json(evento);
  })
}

exports.obtenerPorCategoria = function ( req, res ) {
  Evento.find({})
  .exec(( err, evento ) =>{
    if(err)
      res.send("error");
    else{
      eventos = [];
      for (obj in evento) {
        var categoria = evento[obj].categoria
        if( categoria!= undefined)
          if(categoria.indexOf(req.params.categoria.trim())!=-1)
            eventos.push(evento[obj])
      }
      res.json(eventos);
    }
  })
}
