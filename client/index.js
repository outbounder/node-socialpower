require("./vendor");

$(function(){
  app = {};
  config = require("./config")

  var User = require("../models/client/User")
  var LoginView = require("./views/dialogs/login")
  var RegisterView = require("./views/dialogs/register")
  var GameView = require("./views/game")

  app.user = new User()

  var Router = Backbone.Router.extend({
    routes: {
      "": "showIndex",
      "register": "showRegister",
      "login": "showLogin",
      "game": "showGame"
    },
    showIndex: function(){
      $(".viewsContainer").html(require("./views/index.jade")())
      $(".loginBtn").click(function(){
        app.router.navigate("/login", true)
      })
      $(".registerBtn").click(function(){
        app.router.navigate("/register", true)
      })
    },
    showLogin: function(){
      var view = new LoginView({
        el: $(".viewsContainer"),
        model: app.user,
        onLogged: function(){
          app.router.navigate("/game", true)
        }
      })
      view.render()
    },
    showRegister: function(){
      var view = new RegisterView({
        el: $(".viewsContainer"),
        model: app.user,
        onLogged: function(){
          app.router.navigate("/game", true)
        }
      })
      view.render()
    },
    showGame: function(){
      var view = new GameView({
        el: $(".viewsContainer"),
        model: app.user,
        onLogout: function(){
          app.router.navigate("/login", true)
        }
      })
      view.render()
    }
  })

  app.router = new Router();
  Backbone.history.start(); // triggers routes
})