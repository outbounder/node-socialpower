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
    var cookieJar;
    beforeEach(function (next) {
      cookieJar = request.jar();
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
      var messageId, authorId;
      beforeEach(function (next) {
        request.post({
          uri: helpers.apiendpoint + "/activity/share",
          json: { "body": "A simple text message" },
          jar: cookieJar
        }, function (err, res, body) {
          messageId = body.message;
          authorId = body.author;
          next();
        });
      });

      it("can list the publication", function (next) {
        request.get({
          uri: helpers.apiendpoint + "/activity/list",
          json: {},
          jar: cookieJar
        }, function(err, res, body){
          expect(res.statusCode).toBe(200);
          expect(body.shares.length).toEqual(1);
          expect(Object.keys(body.messages).length).toEqual(1);
          next();
        });
      });

      describe("with a secondUser", function () {
        var secondUserJar, secondUserId;
        beforeEach(function (next) {
          secondUserJar = request.jar();
          //register + login
          request.post({
            uri: helpers.apiendpoint+"/users/register",
            json: {
              username: "secondUser",
              password: "test"
            },
            jar: secondUserJar
          }, function(err, res, body){
            secondUserId = body.result._id;
            next();
          });
        });

        it("reshares a publication", function (next) {
          request.post({
            uri: helpers.apiendpoint + "/activity/reshare",
            json: { message: messageId, parent:authorId },
            jar: secondUserJar
          }, function (err, res, body) {
            expect(err).toBeFalsy();
            expect(body.message).toEqual(messageId);
            expect(body.parent).toEqual(authorId);
            expect(body.author).toEqual(secondUserId);
            next();
          });
        });

        describe("and a reshare", function () {
          beforeEach(function (next) {
            request.post({
              uri: helpers.apiendpoint + "/activity/reshare",
              json: { message: messageId, author: secondUserId, parent:authorId },
              jar: secondUserJar
            }, function (err, res, body) {
              next();
            });
          });

          it("lists both shares", function (next) {
            request.get({
              uri: helpers.apiendpoint + "/activity/list",
              json: {},
              jar: cookieJar
            }, function(err, res, body){
              expect(res.statusCode).toBe(200);
              expect(body.shares.length).toEqual(2);
              expect(Object.keys(body.messages).length).toEqual(1);
              next();
            });
          });
        });

      });

    });
  });
});