var mongoose = require("mongoose");

var Message = new mongoose.Schema({
  body: { type: String, unique: true, required: true }
})

module.exports = mongoose.model("Message", Message)