var Router = require('routes');
var http = require('http');
var connect = require('connect');

var AppBootstrap = function () {};

// Routing //

var routers = {};
routers['post'] = Router();
routers['get']  = Router();

routers['get'].addRoute("/", "index");

// Controllers //

// Post-receives from github
// receives a github payload

// core-app
AppBootstrap.prototype.postReceiveCoreApp = function (req, res, route) {
  res.end('Ok');
}

// The app //

var App = new AppBootstrap();

var connection_handler = connect()
  .use(connect.bodyParser())
  .use(function(req, res){
    var method = req.method.toLowerCase();
    var route = routers[method].match(req.url);
    App[route.fn](req, res, route);
  });

http.createServer(connection_handler).listen(80);
