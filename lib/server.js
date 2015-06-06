var express = require('express')
  , cookieParser = require('cookie-parser')
  , session = require('express-session')
  , bodyParser = require('body-parser')
  , passport = require('passport')
  , database = require('./database')
  , routes = require('./routes')(database)
  , server = express();
;

server.set('port', process.env.PORT || 3030);

server.use(cookieParser('secret'));
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json({ limit: '25mb' }));

require('./passport')(passport);

server.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}));

server.use(passport.initialize());
server.use(passport.session());

function checkAuthorization (req, res, next) {
  if (req.isAuthenticated && req.user.id) return next();
  else res.status(401).send("Unauthorized request!");
}

// Geography Routes ============================================================
server.get('/trails/',
  function (req, res, next) {
    return next();
  }, routes.getTrails)
;

server.post('/trails/',
  function (req, res, next) {
    return next();
  }, routes.createTrails)
;

server.put('/trails/',
  function (req, res, next) {
    return next();
  }, routes.updateTrails)
;

server.delete('/trails/',
  function (req, res, next) {
    return next();
  }, routes.deleteTrails)
;


module.exports = function (callback) { callback(server); };