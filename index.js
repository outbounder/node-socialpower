var express = require('express');
var MongoStore = require('connect-mongo')(express);
var routes = require('./routes');
var mongoose = require("mongoose");
var path = require('path');
var socketio = require("socket.io");
var SessionSockets = require('session.socket.io');

module.exports = function(){
  this.app = express();
}

module.exports.prototype.start = function(config, next) {
  var app = this.app
  var self = this

  this.session_store = new MongoStore({
    db: config.db.name
  })
  this.cookie_parser = express.cookieParser(config.secret)

  app.configure(function(){
    app.set('views', __dirname + '/pages')
    app.set('view engine', 'jade')
    
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(self.cookie_parser);
    app.use(express.session({
      secret: config.secret,
      store: self.session_store
    }));
    app.use(app.router);
  });

  app.configure('development', function(){
    app.use(express.errorHandler());
  });

  mongoose.connect(config.db.host+"/"+config.db.name, function(err){
    if(err) throw err
    routes.mount(app)
    self.server = app.listen( process.env.PORT || config.port || 3000 , next)
    
    self.io = socketio.listen(self.server);
    self.io.set("log level", 0);
    var sio = new SessionSockets(self.io, self.session_store, self.cookie_parser);
    sio.on("connection", function(err, socket, session){
      if(err) return console.log(err);
      if(!session.userId) return;
      socket.userId = session.userId
    });
  })

  var socketEmit = function(userId, eventName, eventData){
    var sockets = self.io.sockets.clients()
    for (var i = sockets.length - 1; i >= 0; i--) {
      if(sockets[i].userId == userId) {
        sockets[i].emit(eventName, eventData)
        return
      }
    };
  }

  process.on("socketEmit", socketEmit)
  process.on("messageCreated", function(msg){
    var sockets = self.io.sockets.clients()
    for (var i = sockets.length - 1; i >= 0; i--) {
      sockets[i].emit("messageCreated", msg)
    }
  })

  var dnode = require('dnode');
  var server = dnode({
    socketEmit : socketEmit
  });
  server.listen(5004);
}

module.exports.prototype.stop = function(next){
  var self = this
  this.server.close(function(){
    self.session_store.db.close(function(){
      mongoose.disconnect(next)    
    })
  })
}

if(!module.parent) {
  var api = new module.exports()
  api.start(require("./config/local.json"))
}
