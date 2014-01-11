var express = require('express');
var MongoStore = require('connect-mongo')(express);
var routes = require('./routes');
var mongoose = require("mongoose");
var path = require('path');

module.exports = function(){
  this.app = express();  
}

module.exports.prototype.start = function(config, next) {
  var app = this.app
  var self = this

  this.session_store = new MongoStore({
    db: config.db.name
  })

  app.configure(function(){
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.cookieParser(config.secret));
    app.use(express.session({
      secret: config.secret,
      store: this.session_store
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
  })
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
