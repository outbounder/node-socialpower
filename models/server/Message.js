var mongoose = require("mongoose");
var createdModifiedPlugin = require('mongoose-createdmodified').createdModifiedPlugin;

var Message = new mongoose.Schema({
  body: { type: String, unique: true, required: true }
})
Message.plugin(createdModifiedPlugin, {index: true});
module.exports = mongoose.model("Message", Message)