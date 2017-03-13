var express = require('express')

var app = express()

app.set('view engine', 'pug')

app.use(express.static('public'))

app.get(['/', '/signin', '/signup'], function (req, res) {
  res.render('index')
})

app.get('/api/pictures', function (req, res) {
  var pictures = [
      {
    		user: {
    				username: 'alexisaraujo',
    				avatar: 'https://scontent-ord1-1.xx.fbcdn.net/v/t1.0-9/15095636_10155681383018539_239145637589870926_n.jpg?oh=a116b9c31e753fd9cbea87d27e7eef57&oe=593604FA'
    		},
    		url: 'office.jpg',
    		likes: 0,
    		liked: false,
            createdAt: new Date().getTime()
    	},
    	    	{
    		user: {
    				username: 'alexisaraujo',
    				avatar: 'https://scontent-ord1-1.xx.fbcdn.net/v/t1.0-9/15095636_10155681383018539_239145637589870926_n.jpg?oh=a116b9c31e753fd9cbea87d27e7eef57&oe=593604FA'
    		},
    		url: 'office.jpg',
    		likes: 2,
    		liked: true,
            createdAt: new Date().setDate(new Date().getDate() - 10)
    }
  ]
  setTimeout(function () {
    res.send(pictures)
  }, 2000)
})

app.listen(3000, function (err) {
  if (err) return console.log('Hubo un error'), process.exit(1)
  console.log('Escuchando el puerto 3000')
})
