var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var path = require('path');
var istatic = require('istatic');

var app = express();

app.disable('x-powered-by');
app.disable('etag');

var DEVELOPMODE = app.get('env') === 'development';

if (DEVELOPMODE) {
  app.use(logger('tiny'));
} else {
  app.use(logger('dev'));
}

// Registry Raven
var raven = require('raven');
if (DEVELOPMODE) {
  app.use(raven.middleware.express.requestHandler('https://e56a882b39a549babc288569eaecf13b:6b22904086db43e2a598e50da5b1d120@sentry.io/99729'));
}

// app.use('/favicon.ico', function (req, res, next) {
//   res.redirect('//www.wandoujia.com/favicon.ico');
// });

var tplPath = path.join(__dirname, '/app/templates/');
app.set('view engine', 'html');
app.set('layout', tplPath + 'layout/base');
app.set('partials', {
  header: tplPath + 'layout/partials/header',
  bughd: tplPath + 'layout/partials/bughd',
  analytics: tplPath + 'layout/partials/analytics'
});
app.engine('html', require('hogan-express'));

// Registry Modules
if (DEVELOPMODE) {
  app.set('views', tplPath);
  app.use(express.static(path.join(__dirname, '/app/static/')));
} else {
  app.set('views', 'templates');
  app.use(express.static('static'));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());

// istatic
app.locals.DEVELOPMODE = DEVELOPMODE;
app.locals.istaticEnabled = true;
app.locals.istaticCSS = function() {
  return istatic.serve({
    ttl: 0,
    root: path.join(process.cwd(), '/app/static/'),
    compress: true,
    debug: true,
    cache: false
  });
};
app.locals.istaticJS = function() {
  return istatic.serve({
    ttl: 0,
    root: path.join(process.cwd(), '/app/static/'),
    compress: true,
    debug: true,
    cache: false
  });
};

// app.use(function(req, res, next) {
//   var istaticEnabled = true;

//   var istaticCSS = function() {
//     return istatic.serve({
//       ttl: 0,
//       root: path.join(process.cwd(), '/app/static/'),
//       compress: true,
//       debug: false,
//       cache: true
//     });
//   };

//   // var istaticJS = function() {
//   //   return istatic.serve({
//   //     ttl: 10,
//   //     root: path.join(process.cwd(), '/app/static/'),
//   //     compress: true,
//   //     debug: true,
//   //     cache: true
//   //   });
//   // };

//   // next();

//   console.log('next!!', next);
//   next();
// });

app.use('/', require('./routes'));

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
if (!DEVELOPMODE) {
  app.use(raven.middleware.express.errorHandler('https://e56a882b39a549babc288569eaecf13b:6b22904086db43e2a598e50da5b1d120@sentry.io/99729'));
}

// development error handler
// will print stacktrace
if (DEVELOPMODE) {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);

    res.json({
      message: err.message,
      error: err.stack
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);

  res.json({
    message: err.message,
    error: {}
  });
});

module.exports = app;
