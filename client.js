var request = require("request").defaults({jar: true})
var endpoint = "http://127.0.0.1:3000/api"

request.post({
  uri: endpoint+"/users/me/login",
  json: {
    username: process.argv[2],
    password: process.argv[3]
  }
}, function(err, res, body){
  request.post({
    uri: endpoint+"/messages",
    json: {
      body: process.argv[4]
    }
  }, function(err, res, body){
    console.log("done thank you")
  })
})

