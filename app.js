var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs = require('express-handlebars');
var nodeoutlook = require('nodejs-nodemailer-outlook');
var papa = require('papaparse');
var multer = require('multer');
var upload = multer();


var indexRouter = require('./routes/index');
var preview = require('./routes/previewEmailTemplate');
var emailTemplate = require('./routes/emailTemplate');

var app = express();

// view engine setup
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap
app.use('/csv', express.static(__dirname + '/public/csv'));

app.use('/', indexRouter);
app.get('/preview', preview);

app.post('/formData', upload.single('file'), function(req, res, next) {
  var stringCSV = req.file.buffer.toString('utf8');
  global.csvData = papa.parse(stringCSV, {header: true});
  name = req.body.name;
  password = req.body.password;
  email = req.body.email;
  console.log(email);
  phoneNumber = req.body.phone;
  outputReceiverEmail = req.body.receiverEmail;
  console.log(outputReceiverEmail);
  res.send('file uploaded');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});



// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
