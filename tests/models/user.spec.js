describe("User model", function(){
  var helpers = require("../helpers")
  var User = require("../../models/server/User")
  
  beforeEach(helpers.connectMongoose)
  afterEach(helpers.disconnectMongoose)

  it("creates with hashed password", function(next){
    User.create({
      "username": "test",
      "password": "123"
    }, function(err, user){
      expect(user.password).not.toBe("123")
      User.findById(user._id, {fields: "+password"}, function(err, user){
        expect(user.password).not.toBe("123")
        next()
      })
    })
  })
})