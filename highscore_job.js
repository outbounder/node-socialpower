var User = require("./models/server/User")
var drawDailyWins = function(callback){
  // find the top User with highest points score
  User
    .find({})
    .sort({points: -1})
    .limit(1)
    .exec(function(err, users){
      if(users.length == 0) return callback(err, {updateCount: 0})
      // add him 1 win
      users[0].wins += 1
      users[0].save(function(err){
        // reset all points to zero to all users
        User.update({}, {points: 0}, {multi: true}, function(err, updateCount){
          callback(err, {
            updateCount: updateCount,
            winner: users[0]
          })
        })
      })
    })
}

module.exports.drawDailyWins = drawDailyWins

if(!module.parent) {
  var config = require("./config/local.json")
  var mongoose = require("mongoose");

  var dnode = require('dnode');
  var d = dnode.connect(5004);
  var mainsite;
  d.on('remote', function (remote) {
    mainsite = remote
  });

  mongoose.connect(config.db.host+"/"+config.db.name, function(err){
    var cronJob = require('cron').CronJob;
    new cronJob('1 * * * * *', function(){
      drawDailyWins(function(err, result){
        console.log("daily draw finished, updated ", result.updateCount)
        if(mainsite)
          mainsite.socketEmit(result.winner._id, "win", result.winner.wins)
      })
    }, null, true);
  })
}