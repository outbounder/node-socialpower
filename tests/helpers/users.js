var helpers = require("./index")
var request = require("request").defaults({jar: true})

module.exports.register = function(next){
  request.post({
    uri: helpers.apiendpoint+"/users/register",
    json: {
      username: "testuser",
      password: "test"
    }
  }, next)
}

module.exports.login = function(next){
  request.get({
    uri: helpers.apiendpoint+"/users/me/login",
    json: {
      username: "testuser",
      password: "test"
    }
  }, next)
}

module.exports.logout = function(next) {
  request.get({
    uri: helpers.apiendpoint+"/users/me/logout",
    json: {}
  }, next)
}