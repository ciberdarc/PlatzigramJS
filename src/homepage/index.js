var page = require('page')
var empty = require('empty-element')
var template = require('./template')
var title = require('title')
// var request = require('superagent')
var header = require('../header')
var Webcam = require('webcamjs')
var picture = require('../picture-card')
var axios = require('axios')
var utils = require('../utils')

page('/', utils.loadAuth, header, loading, loadPicturesAxios, function (ctx, next) {
  title('Platzigram')
  var main = document.getElementById('main-container')

  empty(main).appendChild(template(ctx.pictures))
  const picturePreview = $('#picture-preview')
  const camaraInput = $('#camara-input')
  const cancelPicture = $('#cancelPicture')
  const shootButton = $('#shoot')
  const uploadButton = $('#uploadButton')

  function reset () {
    picturePreview.addClass('hide')
    uploadButton.addClass('hide')
    cancelPicture.addClass('hide')
    shootButton.removeClass('hide')
    camaraInput.removeClass('hide')
  }

  cancelPicture.click(reset)

  $('.modal').modal({
    ready: function () {
      Webcam.set({
        width: 400,
        height: 300,
        image_format: 'jpeg',
        jpeg_quality: 90
      })
      Webcam.attach('#camara-input')
      shootButton.click((ev) => {
        Webcam.snap((dataUri) => {
          picturePreview.html('<img src="' + dataUri + '"/>')
          picturePreview.removeClass('hide')
          uploadButton.removeClass('hide')
          cancelPicture.removeClass('hide')
          shootButton.addClass('hide')
          camaraInput.addClass('hide')
          uploadButton.off('click')
          uploadButton.click(() => {
            const pic = {
              url: dataUri,
              likes: 0,
              liked: false,
              createdAt: +new Date(),
              user: {
                username: 'alexisaraujo',
                avatar: 'https://scontent-ord1-1.xx.fbcdn.net/v/t1.0-9/15095636_10155681383018539_239145637589870926_n.jpg?oh=a116b9c31e753fd9cbea87d27e7eef57&oe=593604FA'
              }
            }
            $('#picture-cards').prepend(picture(pic))
            reset()
            $('#modalCamera').modal('close')
          })
        })
      })
    },
    complete: function () {
      Webcam.reset()
      reset()
    }
  })
})

function loading (ctx, next) {
  var el = document.createElement('div')
  el.classList.add('loader')
  document.getElementById('main-container').appendChild(el)
  next()
}

// function loadPictures (ctx, next) {
//   request
//     .get('/api/pictures')
//     .end(function (err, res) {
//       if (err) return console.log(err)
//       ctx.pictures = res.body
//       next()
//     })
// }

function loadPicturesAxios (ctx, next) {
  axios
    .get('/api/pictures')
    .then(function (res) {
      ctx.pictures = res.data
      next()
    })
    .catch(function (err) {
      console.log(err)
    })
}

// function loadPicturesFetch (ctx, next) {
//   fetch('/api/pictures')
//   .then(function (res) {
//     return res.json()
//   })
//   .then(function (pictures) {
//     ctx.pictures = pictures
//     next()
//   })
//   .catch(function (err) {
//     console.log(err)
//   })
// }

// async function asyncLoad (ctx, next) {
//   try {
//     ctx.pictures = await fetch('/api/pictures').then(res => res.json())
//     next()
//   } catch (err) {
//     return console.log(err)
//   }
// }
