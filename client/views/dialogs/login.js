module.exports = Backbone.View.extend({
  template: require("./login.jade"),
  initialize: function(options){
    this.model.on("error", console.log, console)
    this.model.once("sync", options.onLogged)
  },
  render: function(){
    var self = this
    this.$el.html(this.template({
      model: this.model
    }))
    this.$el.find("form").submit(function(e){
      e.preventDefault()
      self.model.login(
        self.$el.find("input[name=username]").val(),
        self.$el.find("input[name=password]").val()
      )
      return false
    })
  }
})