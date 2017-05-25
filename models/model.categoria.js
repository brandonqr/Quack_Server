var mongoose = require('mongoose'),
 Schema = mongoose.Schema;

mongoose.connect( "mongodb://localhost/quack/categoria" );

  var categoriaSchema = new Schema({
     categorias :[Schema.Types.Mixed]
   });
var Categoria =  mongoose.model('Categoria', categoriaSchema);

exports.obtenerTodos = function( req, res ){
  Categoria.find({ })
  .exec(( err, data )=>{
  if(err)
    res.send("error");
  else
    res.json(data);
  });
}
exports.agregar = function ( req, res ){

  Categoria.Update({
  $push: { categorias : req.body.categoria }
})
.exec(function(err, evento, count)
{
 res.send(evento);
});
}
