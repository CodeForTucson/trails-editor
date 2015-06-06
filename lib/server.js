var express = require('express')
  , cookieParser = require('cookie-parser')
  , session = require('express-session')
  , bodyParser = require('body-parser')
  , database = require('./database')
  , routes = require('./routes')(database)
  , server = express();
;

server.set('port', process.env.PORT || 3030);

server.use(cookieParser('secret'));
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json({ limit: '25mb' }));

server.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}));

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

server.put('/trails/:trail',
  function (req, res, next) {
    return next();
  }, routes.updateTrails)
;

server.delete('/trails/:trail',
  function (req, res, next) {
    return next();
  }, routes.deleteTrails)
;

module.exports = function (callback) { callback(server); };