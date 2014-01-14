var mongoose = require("mongoose");
var crypto = require("crypto");

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

schema.method("sendMessage", function(message, callback){
  var self = this
  // 1. check is message already stored in DB
  Message.findOne(message, function(err, msg){
    // 1.1 create the message if not stored yet
    if(!msg) msg = new Message()

    // 2. use msg._id to find users who send the message before
    User.find({ messages: msg._id }, function(err, users){
      // 2.1. increment those users points
      users.forEach(function(user){
        user.points += 1
        user.save(console.error)
      })

      // 3. add the message._id to current user's messages
      self.points += 1
      self.save(callback)
    })
  })
})

var User = module.exports = mongoose.model("User", schema);