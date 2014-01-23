describe("highscores daily", function(){
  var helpers = require("../helpers")
  var User = require("../../models/server/User")
  var drawDailyWins = require("../../highscore_job").drawDailyWins
  
  beforeEach(helpers.connectMongoose)
  afterEach(helpers.disconnectMongoose)

  it("daily wins work", function(next){
    drawDailyWins(function(err, result){
      expect(err).toBe(null)
      expect(result.updateCount).toBe(0)
      next()
    })
  })

  it("daily wins work with 1 user", function(next){
    User.create({
      "username": "test",
      "password": "123"
    }, function(err, user){
      drawDailyWins(function(err, result){
        expect(err).toBe(null)
        expect(result.updateCount).toBe(1)
        next()
      })
    })
  })
})