var browserify = require('browserify-middleware');

module.exports.mount = function(app){
  app.get("/users/me/logout", require("./api/users").logout)
  app.get("/users/me/login", require("./api/users").login)
  app.post("/users/register", require("./api/users").register)
  
  app.post("/messages", require("./api/messages").send)
  app.get("/messages", require("./api/messages").retrieve)

  app.get("/", function(req, res, next){
    res.render("index")
  })
  app.use('/app.js', browserify('../client/index.js', {debug: true}));
}