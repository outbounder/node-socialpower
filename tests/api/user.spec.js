describe("user api", function(){
  var request = require("request");
  var helpers = require("../helpers");

  beforeEach(function (next) {
    helpers.startApiHttpServer(next);
  });
  afterEach(function (next) {
    helpers.stopApiHttpServer(next);
  });

  it("registers new user", function(next){
    request.post({
      uri: helpers.apiendpoint+"/users/register",
      json: {
        username: "testuser",
        password: "test"
      }
    }, function(err, res, body){
      expect(res.statusCode).toBe(200);
      expect(body.result._id).toBeDefined();
      next();
    });
  });

  describe("user registered and logged in", function () {
    beforeEach(function (next) {
      request.post({
        uri: helpers.apiendpoint+"/users/register",
        json: {
          username: "testuser",
          password: "test"
        }
      }, function(err, res, body){
        next();
      });
    });

    it("logout user", function(next){
      request.get({
        uri: helpers.apiendpoint+"/users/me/logout",
        json: {}
      }, function(err, res, body){
        expect(res.statusCode).toBe(200);
        next();
      });
    });

    describe("and logged out", function () {
      beforeEach(function (next) {
        request.get({
          uri: helpers.apiendpoint+"/users/me/logout",
          json: {}
        }, function(err, res, body){
          next();
        });
      });

      it("login user", function(next){
        request.get({
          uri: helpers.apiendpoint+"/users/me/login",
          json: {
            username: "testuser",
            password: "test"
          }
        }, function(err, res, body){
          expect(res.statusCode).toBe(200);
          expect(body.result._id).toBeDefined();
          expect(body.result.username).toBe("testuser");
          expect(body.result.password).not.toBeDefined();
          next();
        });
      });    
    });

  });
});