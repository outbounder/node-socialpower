var mongoose = require("mongoose");

var Share = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, required: true },
  message: { type: mongoose.Schema.Types.ObjectId, required: true },
  date: { type: Date, default: Date.now }
});
Share.index({author: 1, message: 1}); //each message can be shared only one by a user

module.exports = mongoose.model("Share", Share);