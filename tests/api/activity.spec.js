describe("activities", function () {
  var request = require("request");
  var helpers = require("../helpers");

  beforeEach(function (next) {
    helpers.startApiHttpServer(next);
  });
  afterEach(function (next) {
    helpers.stopApiHttpServer(next);
  });

  it("lists nothing for empty database", function (next) {
    request.get({
      uri: helpers.apiendpoint + "/activity/list",
      json: {} //all
    }, function(err, res, body){
      expect(res.statusCode).toBe(200);
      expect(body.shares).toEqual([]);
      expect(body.messages).toEqual({});
      next();
    });
  });

  

  describe("registered and logged in `testuser`", function () {
    var cookieJar = request.jar();
    beforeEach(function (next) {
      //register + login
      request.post({
        uri: helpers.apiendpoint+"/users/register",
        json: {
          username: "testuser",
          password: "test"
        },
        jar: cookieJar
      }, function(err, res, body){
        next();
      });
    });

    it("adds a new publication", function (next) {
      request.post({
        uri: helpers.apiendpoint + "/activity/share",
        json: { "body": "A simple text message" },
        jar: cookieJar
      }, function (err, res, body) {
        expect(err).toBeFalsy();
        expect(body.message).toBeTruthy();
        next();
      });
    });

    describe("with a publication", function () {
      beforeEach(function (next) {
        request.post({
          uri: helpers.apiendpoint + "/activity/share",
          json: { "body": "A simple text message" },
          jar: cookieJar
        }, function (err, res, body) {
          next();
        });
      });

      it("can list the publication", function (next) {
        request.get({
          uri: helpers.apiendpoint + "/activity/list",
          json: {},
          jar: cookieJar
        }, function(err, res, body){
          console.log("list result:", body);
          expect(res.statusCode).toBe(200);
          expect(body.shares.length).toEqual(1);
          expect(Object.keys(body.messages).length).toEqual(1);
          next();
        });
      });

    });
  });
});