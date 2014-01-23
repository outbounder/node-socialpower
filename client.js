var repl = require("repl")
var request = require("request").defaults({jar: true})
var endpoint = "http://127.0.0.1:3000/api"

console.log("use login('user', 'pass') to authorize:")
var context = repl.start({
  prompt: "node-socialpower> ",
  input: process.stdin,
  output: process.stdout
}).context

context.msg = function(value){
  request.post({
    uri: endpoint+"/messages",
    json: {
      body: value
    }
  }, function(err, res, body){
    console.log(err || ("JUST SEND "+value))
  })
}
context.login = function(user, pass) {
  request.post({
    uri: endpoint+"/users/me/login",
    json: {
      username: user,
      password: pass
    }
  }, function(err, res, body){
    console.log(err || "logged")
    console.log("use msg('mesasge')")
  })
}
