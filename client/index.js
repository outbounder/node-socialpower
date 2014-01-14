require("./vendor");

$(function(){
  app = {};

  var Router = Backbone.Router.extend({
    routes: {
      "": "showIndex",
      "/register": "showRegister",
      "/login": "showLogin"
    },
    showIndex: function(){
      console.log("INDEX")
    }
  })

  app.router = new Router();
  Backbone.history.start(); // triggers routes
})