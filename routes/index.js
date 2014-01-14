var browserify = require('browserify-middleware');

module.exports.mount = function(app){
  var User = require("../models/server/User")

  app.get("/api/users/me/logout", require("./api/users").logout)
  app.post("/api/users/me/login", require("./api/users").login)
  app.post("/api/users/register", require("./api/users").register)
  
  app.post("/api/messages", require("./api/messages").send)
  app.put("/api/messages", require("./api/messages").send)
  app.get("/api/messages", require("./api/messages").retrieve)

  app.get("/", function(req, res, next){
    User.findById(req.session.userId, function(err, user){
      res.locals.serverData = {
        user: user
      }
      res.render("index")  
    })
  })
  app.use('/app.js', browserify('../client/index.js', {
    debug: true,
    transform: ['jadeify']
  }));
}