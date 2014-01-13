describe("User model", function(){
  "use strict";
  var helpers = require("../helpers");
  var User = require("../../models/server/User");
  var pw = require("credential");
  
  beforeEach(helpers.connectMongoose);
  afterEach(helpers.disconnectMongoose);

  it("creates a user object", function () {
    expect(new User({ "username": "test", "password": "secret" })).toEqual(jasmine.any(User));
  });

  it("register user with salted hash password", function(next){
    User.register({ "username": "test", "password": "secret" }, function(err, user){
      expect(user.password).toBeUndefined();
      expect(user.credentials.hash).not.toBe("secret");
      next();
    });
  });

  describe("with user is regustered", function () {
    beforeEach(function (next) {
      User.register({ "username": "test", "password": "secret" }, function () {
        next();
      });
    });

    it("authenticates a user based on username and password", function (next) {
      User.authenticate({ "username": "test", "password": "secret" }, function (err, success) {
        expect(err).toBeFalsy();
        expect(success).toBeTruthy();
        next();
      });
    });

    it("fails with Invalid username or password for bad password", function (next) {
      User.authenticate({ "username": "test", "password": "secret " }, function (err, success) {
        expect(err).toBeFalsy();
        expect(success).toBeFalsy();
        next();
      });
    });

    it("fails with Invalid username or password for bad username", function (next) {
      User.authenticate({ "username": "test", "password": "secret " }, function (err, success) {
        expect(err).toBeFalsy();
        expect(success).toBeFalsy();
        next();
      });
    });
  });
});