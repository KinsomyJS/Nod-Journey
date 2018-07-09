var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var http = require('http');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var photos = require('./routes/photos');
var multer = require('multer')
var bodyParser = require('body-parser');
var upload = multer({ dest: 'upload/' });

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 3000);
app.set('photos', __dirname + '/public/photos');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(upload);
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', photos.list);
app.get('/users', usersRouter);
app.get('/upload', photos.form);
// app.post('/upload', upload.single('photo'), photos.submit(app.get('photos')));
app.post('/upload', upload.single('file'), function (req, res, next) {
  console.log('req.body', req.body);
  console.log('req.file', req.file);
  res.send({ ret_code: '0' });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

var server = http.createServer(app);
server.listen(app.get('port'), function () {
  if ('development' == app.get('env')) {
    console.log('development env');
  }
  console.log('Express server listening on port ' + app.get('port'));
});
