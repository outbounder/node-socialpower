var User = require("../../models/server/User");

module.exports = {
  logout: function(req, res) {
    req.session.destroy();
    res.send({result: true});
  },
  login: function(req, res) {
    if(!req.body.username || !req.body.password) return res.send(400);
    User.authenticate(req.body, function(err, userId){
      if(!err) {
        if(userId) {
          req.session.userId = userId;
          res.send({result: { "_id": userId, "username": req.body.username } });
        } else {
          //TODO: send redirect to login page
          res.send(403, {result: "Invalid username or password"});
        }
      } else
        res.send(500, {result: err});
    });
  },
  register: function(req, res) {
    User.register(req.body, function(err, user){
      if(!err) {
        req.session.userId = user.id;
        res.send({result: user});
      } else
        res.send(500, {result: err});
    });
  }
};