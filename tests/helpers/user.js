var helpers = require("./index")
var request = require("request").defaults({jar: true})

module.exports.register = function(data, next){
  if(typeof data == "function") {
    next = data
    data = {
      username: "testuser",
      password: "test"
    }
  }

  request.post({
    uri: helpers.apiendpoint+"/users/register",
    json: data
  }, next)
}

module.exports.login = function(data, next){
  if(typeof data == "function") {
    next = data
    data = {
      username: "testuser",
      password: "test"
    }
  }

  request.post({
    uri: helpers.apiendpoint+"/users/me/login",
    json: data
  }, next)
}

module.exports.logout = function(next) {
  request.get({
    uri: helpers.apiendpoint+"/users/me/logout",
    json: {}
  }, next)
}

module.exports.sendMessage = function(text, next) {
  request.post({
    uri: helpers.apiendpoint+"/messages",
    json: {
      body: text
    }
  }, next)
}