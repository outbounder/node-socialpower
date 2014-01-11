var mongoose = require("mongoose")
var Socialpower = require("../../api")

module.exports.apiendpoint = "http://127.0.0.1:3002"

module.exports.connectMongoose = function(next){
  mongoose.connect("localhost/socialpower-test", function(){
    mongoose.connection.db.dropDatabase(function(){
      mongoose.disconnect(function(){
        mongoose.connect("localhost/socialpower-test", next)
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
          "name": "socialpower-test",
          "host": "localhost"
        },
        "secret": "socialpower-test"
      }, next)
    })
  })
}
module.exports.stopApiHttpServer = function(next){
  module.exports.api.stop(next)
}