"use strict";

var Message = require("./Message");
var Share = require("./Share");

module.exports.share = function (message, done) {
  Message.create(message, function (err, msg) {
    if (err) return done(err);
    module.exports.reshare({ message: msg._id, author: message.author }, done);
  });
};

module.exports.reshare = function (share, done) {
  Share.create(share, done);
};

module.exports.list = function (conditions, done) {
  var results = {};
  Share.find(conditions).sort("-date").exec(function (err, shares) {
    if (err) return done(err);
    results.shares = shares;
    Share.find(conditions).distinct("message", function (err, messageIds) {
      if (err) return done(err);
      Message.find({ _id:{ $in:messageIds } }, function (err, messages) {
        if (err) return done(err);
        results.messages = {};
        for (var i = 0; i < messages.length; i ++) {
          results.messages[messages[i].id] = messages[i];
        }
        done(false, results);
      });
    });  
  });
};