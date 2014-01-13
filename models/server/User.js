"use strict";
var mongoose = require("mongoose");
var pw = require("credential");

var User = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  // add Twitter/Facebook authentication in the future?
  authType: { type: String, default: "local" },
  credentials: String
});

/*
  {
    hash: String,
    salt: String,
    keyLength: Number,
    hashMethod: String,
    workUnits: Number  
  }
*/

User.static("register", function (credentials, done) {
  if (typeof credentials.username !== "string" || !credentials.username) {
    done(new Error("user must have unique not-empty username"));
    return;
  }
  module.exports.available(credentials.username, function (err, isAvailable) {
    if (err) return done(err);
    if (!isAvailable) return done(new Error("Username not available"));
    //if authType === "local"
    credentials.authType = "local";
    registerLocal(credentials, function (err, user) {
      if (err) return done(err);
      module.exports.create(user, done);
    });
  });
});

var registerLocal = function (user, done) {
  if (typeof user.password !== "string" || !user.password) {
    done(new Error("user must have not-empty password"));
    return;
  }
  pw.hash(user.password, function (err, hash) {
    if (err) return done(err);
    delete user.password;
    user.credentials = hash;
    done(false, user);
  });
};

User.static("authenticate", function (input, done) {
  module.exports.findOne({"username": input.username}, function (err, user) {
    if (err) return done(err);
    if (!user) return done(false, false);
    //if authType === "local"
    pw.verify(user.credentials, input.password, function (err, success) {
      if (err) return done(err);
      if (!success) return done(false, false);
      done(false, user._id);
    });
  });
});

User.static("available", function (username, callback) {
  this.findOne({ "username": username }, function (err, user) {
    if (err) callback(err);
    callback(false, !user);
  });
});

module.exports = mongoose.model("User", User);