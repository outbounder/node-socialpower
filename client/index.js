require("./vendor");

$(function(){
  app = {};
  app.socket = null
  config = require("./config")

  var User = require("../models/client/User")
  var MessagesCollection = require("../models/client/MessagesCollection")
  
  var LoginView = require("./views/dialogs/login")
  var RegisterView = require("./views/dialogs/register")
  var AddMessageView = require("./views/dialogs/message")
  
  var GameView = require("./views/game")

  app.user = new User()
  if(window.serverData.user != null)
    app.user.set(window.serverData.user, {silent: true})

  var Router = Backbone.Router.extend({
    routes: {
      "": "showIndex",
      "register": "showRegister",
      "login": "showLogin",
      "game": "showGame",
      "message": "showMessage"
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
      if(!app.socket) {
        app.socket = io.connect();
        app.socket.on("points", function(points){
          app.user.set("points", points)
        })
      }
  
      var messages = new MessagesCollection()
      var view = new GameView({
        el: $(".viewsContainer"),
        model: app.user,
        collection: messages
      })
      view.render()
      messages.fetch()
    },
    showMessage: function(){
      var view = new AddMessageView({
        el: $(".viewsContainer"),
        model: app.user
      })
      view.render()
    }
  })

  app.router = new Router();
  Backbone.history.start(); // triggers routes

})