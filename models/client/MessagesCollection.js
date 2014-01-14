module.exports = Backbone.Collection.extend({
  model: require("./Message"),
  url: function(){
    return config.apiendpoint+"/messages"
  },
  parse: function(data) {
    return data.result
  }
})