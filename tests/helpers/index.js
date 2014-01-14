var mongoose = require("mongoose")
var Socialpower = require("../../api")

module.exports.apiendpoint = "http://127.0.0.1:3002"
module.exports.databasename = "socialpower-test"

module.exports.connectMongoose = function(next){
  mongoose.connect("localhost/"+module.exports.databasename, function(){
    mongoose.connection.db.dropDatabase(function(){
      mongoose.disconnect(function(){
        mongoose.connect("localhost/"+module.exports.databasename, next)
      })
    })
  })
}

module.exports.disconnectMongoose = function(next){
  mongoose.disconnect(next)
}

module.exports.startApiHttpServer = function(next){
  module.exports.connectMongoose(function(){
    mongoose.disconnect(function(){
      module.exports.api = new Socialpower()
      module.exports.api.start({
        "port": "3002",
        "db": {
          "name": module.exports.databasename,
          "host": "localhost"
        },
        "secret": module.exports.databasename
      }, next)
    })
  })
}

module.exports.stopApiHttpServer = function(next){
  module.exports.api.stop(next)
}

module.exports.startApiHttpServerWithLoggedUser = function(next) {
  var users = require("./users")
  module.exports.startApiHttpServer(function(){
    users.register(function(){
      users.login(next)
    })
  })
}