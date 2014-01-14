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
    })
  },
  register: function(username, password) {
    this.save({
      username: username,
      password: password
    }, {
      url: this.url(),
    })
  }
})