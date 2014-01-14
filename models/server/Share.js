var mongoose = require("mongoose");

var Share = new mongoose.Schema({
  //parent is the User._id of the user whoose post was reshared. For original posts it is empty
  parent: { type: mongoose.Schema.Types.ObjectId, required: false },
  author: { type: mongoose.Schema.Types.ObjectId, required: true },
  message: { type: mongoose.Schema.Types.ObjectId, required: true },
  date: { type: Date, default: Date.now }
});
Share.index({author: 1, message: 1}, {unique: true}); //each message can be shared only one by a user

module.exports = mongoose.model("Share", Share);