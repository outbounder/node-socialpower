var mongoose = require("mongoose");

var Message = new mongoose.Schema({
  author: { type: type: mongoose.Schema.Types.ObjectId, required: true },
  body: { type: String, unique: true, required: true }
});

module.exports = mongoose.model("Message", Message)