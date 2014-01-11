module.exports.mount = function(app){
  app.get("/users/me/logout", require("./api/users").logout)
  app.get("/users/me/login", require("./api/users").login)
  app.post("/users/register", require("./api/users").register)
}