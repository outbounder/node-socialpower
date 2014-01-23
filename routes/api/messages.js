var User = require("../../models/server/User")
var Message = require("../../models/server/Message")

module.exports = {
  send: function(req, res, next) {
    User.findById(req.session.userId, function(err, user){
      user.sendMessage(req.body, function(err){
        if(err) return res.send(400, {result: err})
        res.send(user)
      })
    })
  },
  retrieve: function(req, res, next) {
    var pattern = req.query.pattern?JSON.parse(req.query.pattern):{}
    var sort = req.query.sort?JSON.parse(req.query.sort):{created: -1}
    var skip = req.query.skip?parseInt(req.query.skip):0
    var limit = req.query.limit?parseInt(req.query.limit):5
    Message.count(function(err, messagesCount){
      Message
        .find(pattern).sort(sort)
        .skip(skip).limit(limit)
        .exec(function(err, results){
          if(err) return res.send(500, {result: err})
          res.send({
            result: results,
            total: messagesCount
          })
        })  
    })
  }
}