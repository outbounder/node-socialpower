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
      expect(body.points).toBe(1)
      next()
    })
  })

  it("user sends message again", function(next){
    request.post({
      uri: helpers.apiendpoint+"/messages",
      json: {
        body: "a test message"
      }
    }, function(err, res, body){
      expect(res.statusCode).toBe(200)
      expect(body.points).toBe(2)
      next()
    })
  })

  it("user sends message third time", function(next){
    request.post({
      uri: helpers.apiendpoint+"/messages",
      json: {
        body: "a test message"
      }
    }, function(err, res, body){
      expect(res.statusCode).toBe(200)
      expect(body.points).toBe(3)
      next()
    })
  })

  it("user sends another message", function(next){
    request.post({
      uri: helpers.apiendpoint+"/messages",
      json: {
        body: "a test message 2"
      }
    }, function(err, res, body){
      expect(res.statusCode).toBe(200)
      expect(body.points).toBe(4)
      next()
    })
  })

  it("retrieves messages", function(next){
    request.get({
      uri: helpers.apiendpoint+"/messages",
      qs: {
        limit: "1"
      }
    }, function(err, res, body){
      expect(res.statusCode).toBe(200)
      body = JSON.parse(body)
      expect(body.result.length).toBe(1)
      expect(body.total).toBe(2)
      next()
    })
  })

  it("stops", helpers.stopApiHttpServer)
})