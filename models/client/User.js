module.exports = require("./MongoModel").extend({
  url: function(){
    if(this.isNew())
      return config.apiendpoint+"/users/register"
    return condfig.apiendpoint+"/users"
  },
  login: function(username, password) {
    var self = this
    this.save({
      username: username,
      password: password
    }, {
      url: config.apiendpoint+"/users/me/login",
      wait: true
    })
  },
  register: function(username, password) {
    this.save({
      username: username,
      password: password
    }, {
      url: this.url(),
      wait: true
    })
  },
  sendMessage: function(body) {
    this.save({
      body: body
    }, {
      url: config.apiendpoint+"/messages",
      wait: true
    })
  }
})