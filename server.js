var express = require('express')
var multer = require('multer')
var ext = require('file-extension')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, +Date.now() + '-' + ext(file.originalname))
  }
})

var upload = multer({storage: storage}).single('picture')

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

app.post('/api/pictures', function (req, res) {
  upload(req, res, function (err) {
    if (err) {
      return res.send(500, 'Error uploading file')
    }
    res.send('File uploaded')
  })
})

app.get('/api/user/:username', (req, res) => {
  const user = {
    username: 'alexisaraujo',
    avatar: 'https://pbs.twimg.com/profile_images/626199475988492288/EmMAwbix.jpg',
    pictures: [
      {
        id: 1,
        src: 'https://scontent.cdninstagram.com/t51.2885-15/e35/13249955_490289661169049_1148767241_n.jpg?ig_cache_key=MTI2MTcxMjk0NTI0MTE4MTYxMg%3D%3D.2.c',
        likes: 3
      },
      {
        id: 2,
        src: 'https://scontent.cdninstagram.com/t51.2885-15/sh0.08/e35/13167336_1109360009130759_1843730518_n.jpg?ig_cache_key=MTI2MDI3ODk3ODg1NjE0NDgwNA%3D%3D.2',
        likes: 10
      },
      {
        id: 3,
        src: 'https://scontent.cdninstagram.com/t51.2885-15/e35/13256800_140463126368529_833209303_n.jpg?ig_cache_key=MTI1OTA2MjYxMjk1NDIzODk1NQ%3D%3D.2.c',
        likes: 23
      },
      {
        id: 4,
        src: 'https://scontent.cdninstagram.com/t51.2885-15/e35/13266754_576393892539209_1985401758_n.jpg?ig_cache_key=MTI1OTA2NDExNDcyNDc4NTE4Mg%3D%3D.2.c',
        likes: 0
      },
      {
        id: 5,
        src: 'https://scontent.cdninstagram.com/t51.2885-15/e35/13267525_947784585319152_587355521_n.jpg?ig_cache_key=MTI1OTIwMDc4Mjg0OTA2ODY3Mw%3D%3D.2.c',
        likes: 1
      },
      {
        id: 6,
        src: 'https://scontent.cdninstagram.com/t51.2885-15/e35/13102524_488332414701993_2058845250_n.jpg?ig_cache_key=MTI1NjU3ODQ2MjEzNzUwMzczMA%3D%3D.2.c',
        likes: 99
      }
    ]
  }
  res.send(user)
})

app.get('/:username', function (req, res) {
  res.render('index', {title: `Platzigram - ${req.params.username}`})
})

app.listen(3000, function (err) {
  if (err) return console.log('Hubo un error').process.exit(1)
  console.log('Escuchando el puerto 3000')
})
