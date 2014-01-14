module.exports.mount = function(app){
  app.get("/users/me/logout", require("./api/users").logout);
  app.get("/users/me/login", require("./api/users").login);
  app.post("/users/register", require("./api/users").register);
  app.get("/activity/list", require("./api/activity").list);
  app.post("/activity/share", require("./api/activity").share);
  app.post("/activity/reshare", require("./api/activity").reshare);
}