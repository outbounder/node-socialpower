var User = require("../../models/server/User")
module.exports = {
  send: function(req, res, next) {
    User.findById(req.session.userId, function(err, user){
      user.sendMessage(req.body, function(err, response){
        if(err) return res.send(500, {result: err})
        res.send(response)
      })
    })
  }
}