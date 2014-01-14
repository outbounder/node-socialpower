module.exports = require("./MongoModel").extend({
  url: function(){
    if(this.isNew())
      return config.apiendpoint+"/messages"
    return condfig.apiendpoint+"/messages"
  }
})