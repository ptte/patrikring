var Router = require('routes');
var http = require('http');
var connect = require('connect');
var jade = require('jade');
var fs = require('fs');

var AppBootstrap = function () {};

// Routing //

var routers = {};
routers['post'] = Router();
routers['get']  = Router();

routers['get'].addRoute("/", "index");

// Controllers //

// index
AppBootstrap.prototype.index = function (req, res, route) {
  var text = fs.readFileSync('./views/first.jade');
  var view = jade.compile(text);
  var data = {};
  res.end(view(data));
};

// The app //
var App = function (options) {
  this._router = new AppBootstrap();
  this._options = options;
};

App.prototype._bootstrap = function () {
  this._createServer();
};

App.prototype._createServer = function () {
  var self = this;
  var connection_handler = connect()
    .use(connect.favicon())
    .use(connect.static('public'))
    .use(connect.bodyParser())
    .use(function(req, res){
      var method = req.method.toLowerCase();
      var route = routers[method].match(req.url);
      self._router[route.fn](req, res, route);
    });

  http
    .createServer(connection_handler)
    .listen(this._options.port || 1337);
};

module.exports = App;