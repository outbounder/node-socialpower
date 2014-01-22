var config = require("./config/local.json")
var mongoose = require("mongoose");

mongoose.connect(config.db.host+"/"+config.db.name, function(err){
  setInterval(function(){
    // find the top User with highest points score
    // add him 1 win
    // reset all points to zero to all users
  }, 60*1000*60*24)
})  