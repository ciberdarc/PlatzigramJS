var express = require('express');

var app = express();

app.set('view engine', 'pug');

app.use(express.static('public'));

app.get(['/','/signup','signin'], function (req, res) {
  res.render('index')
})

app.listen(3000, function(err){
    if(err) return console.log('Hubo un error'), process.exit(1);
    console.log('Escuchando el puerto 3000');
})