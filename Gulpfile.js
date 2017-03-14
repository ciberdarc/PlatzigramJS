var gulp = require('gulp')
var sass = require('gulp-sass')
var rename = require('gulp-rename')
var babel = require('babelify')
var browserify = require('browserify')
var source = require('vinyl-source-stream')
var preset = require('babel-preset-es2015')
var watchify = require('watchify')

// Require = Buscar dentro de node modules el directorio llamado y va a devolver lo que nos exporte la herramienta

gulp.task('styles', function () {
  gulp
      .src('index.scss')
      .pipe(sass())
      .pipe(rename('app.css'))
      .pipe(gulp.dest('public'))
})
gulp.task('assets', function () {
  gulp
      .src('assets/*')
      .pipe(gulp.dest('public'))
})

function compile (watch) {
  var bundle = browserify('./src/index.js')

  if (watch) {
    bundle = watchify(bundle)
    bundle.on('update', function () {
      console.log('-->Bundling ...')
      rebundle()
    })
  }

  function rebundle () {
    bundle
      .transform(babel, {presets: ['es2015'], plugins: ['syntax-async-functions', 'transform-regenerator']})
      .bundle()
      .on('error', function (err) {
        console.log(err)
        this.emit('end')
      })
      .pipe(source('index.js'))
      .pipe(rename('app.js'))
      .pipe(gulp.dest('public'))
  }

  rebundle()
}

gulp.task('build', function () {
  return compile()
})

gulp.task('watch', function () {
  return compile(true)
})

// vinyl-source-stream nos permite pasar de browserify a gulp para que gulp si pueda seguir procesando el archivo

gulp.task('default', ['styles', 'assets', 'build'])
