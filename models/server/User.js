var mongoose = require("mongoose");
var crypto = require("crypto");
var _ = require("underscore")

var Message = require("./Message")

var schema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true, select: false },
  messages: [{ type: mongoose.Schema.Types.ObjectId }],
  points: {type: Number, default: 0}
})

var hashPassword = function(value) {
  var md5sum;
  md5sum = crypto.createHash('md5');
  md5sum.update(value);
  return md5sum.digest('hex');
}

schema.pre("save", function(next) {
  if (!this.isModified('password'))
    return next();
  this.password = hashPassword(this.password);
  return next();
})

schema.static("hashPassword", hashPassword)

schema.static("available", function(email, username, callback) {
  this.findOne({ username: username }, callback);
})

schema.static("findOneByUsernamePassword", function(username, password, callback) {
  var pattern = {
    username: username,
    password: this.hashPassword(password)
  }
  this.findOne(pattern).exec(callback);
})

var drawPoints = function(sender, msg, callback) {
  // 2. use msg._id to find users who send the message before
  // 2.1. increment those users points
  User.update({ messages: msg }, { $inc: { points: 1 } }, function(err, users){
    if(err) return callback(err)

    // only if sender didn't send the message before 
    if(!sender.hasMessage(msg)) {
      // 3. add the message._id to current user's messages and increment user's points
      sender.points += 1
      sender.messages.push(msg)
      sender.save(callback)
    } else
      callback()
  })
}

schema.method("hasMessage", function(msg){
  _.contains(this.messages, function(item){
    return item.toString() === msg._id.toString()
  })
})

schema.method("sendMessage", function(message, callback){
  var self = this
  // 1. check is message already stored in DB
  Message.findOne(message, function(err, msg){
    if(err) return callback(err)

    // 1.1 create the message if not stored yet
    if(!msg) {
      msg = new Message(message)
      msg.save(function(err){
        if(err) return callback(err)
        drawPoints(self, msg, callback)
      })
    } else
      drawPoints(self, msg, callback)
  })
})

var User = module.exports = mongoose.model("User", schema);