describe("game", function(){
  var request = require("request").defaults({jar: true})
  var helpers = require("../helpers")
  var user = require("../helpers/user")

  it("starts", helpers.startApiHttpServer)

  it("user1 sends message1", function(next){
    user.registerAndLogin({
      username: "user1",
      password: "1"
    }, function(){
      user.sendMessage("message2", function(err, res, body){
        expect(res.statusCode).toBe(200)
        expect(body.points).toBe(1)
        user.logout(next)
      })
    })
  })

  it("user2 sends message2", function(next){
    user.registerAndLogin({
      username: "user2",
      password: "1"
    }, function(){
      user.sendMessage("message2", function(err, res, body){
        expect(res.statusCode).toBe(200)
        expect(body.points).toBe(1)
        user.logout(next)
      })
    })
  })

  it("user2 sends message1", function(next){
    user.login({
      username: "user2",
      password: "1"
    }, function(){
      user.sendMessage("message1", function(err, res, body){
        expect(res.statusCode).toBe(200)
        expect(body.points).toBe(2)
        user.logout(next)
      })
    })
  })

  it("user1 sends message3", function(next){
    user.login({
      username: "user1",
      password: "1"
    }, function(){
      user.sendMessage("message3", function(err, res, body){
        expect(res.statusCode).toBe(200)
        expect(body.points).toBe(3)
        user.logout(next)
      })
    })
  })

  it("stops", helpers.stopApiHttpServer)
})