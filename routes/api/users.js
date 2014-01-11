var User = require("../../models/server/User");

module.exports = {
  logout: function(req, res) {
    req.session.destroy();
    res.send({result: true})
  },
  login: function(req, res) {
    if(!req.body.username || !req.body.password) return res.send(400)
    User.findOneByUsernamePassword(req.body.username, req.body.password, function(err, user){
      if(!err) {
        if(user)
          req.session.userId = user.id;
        res.send({result: user})
      } else
        res.send(500, {result: err})
    });
  },
  register: function(req, res) {
    User.create(req.body, function(err, user){
      if(!err) {
        req.session.userId = user.id;
        res.send({result: user})
      } else
        res.send(500, {result: err})
    })
  }
}