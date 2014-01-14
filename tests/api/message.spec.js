describe("user api", function(){
  var request = require("request").defaults({jar: true})
  var helpers = require("../helpers")
  it("starts", helpers.startApiHttpServerWithLoggedUser)

  it("user sends message", function(next){
    request.post({
      uri: helpers.apiendpoint+"/messages",
      json: {
        body: "a test message"
      }
    }, function(err, res, body){
      expect(res.statusCode).toBe(200)
      next()
    })
  })

  it("stops", helpers.stopApiHttpServer)
})