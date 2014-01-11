var mongoose = require("mongoose");
var crypto = require("crypto");

var User = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true, select: false },
  messages: [{ type: mongoose.Schema.Types.ObjectId }]
})

var hashPassword = function(value) {
  var md5sum;
  md5sum = crypto.createHash('md5');
  md5sum.update(value);
  return md5sum.digest('hex');
}

User.pre("save", function(next) {
  if (!this.isModified('password'))
    return next();
  this.password = hashPassword(this.password);
  return next();
})

User.static("hashPassword", hashPassword)

User.static("available", function(email, username, callback) {
  this.findOne({ username: username }, callback);
})

User.static("findOneByUsernamePassword", function(username, password, callback) {
  var pattern = {
    username: username,
    password: this.hashPassword(password)
  }
  this.findOne(pattern).exec(callback);
})

User.method("sendMessage", function(message, callback){
  // ToDo
  
  // 1. check is message already stored in DB (has _id property)
  // 1.1 create the message if not stored yet

  // 2. use message._id to find users who send the message before
  // 2.1. increment those users points
  // 
  // 3. add the message._id to current user's messages
})

module.exports = mongoose.model("User", User);