module.exports = Backbone.View.extend({
  template: require("./message.jade"),
  initialize: function(options){
    this.model.on("error", console.log, console)
    this.model.once("change", function(){
      app.router.navigate("/game", true)
    })
  },
  render: function(){
    var self = this
    this.$el.html(this.template({
      model: this.model
    }))
    this.$el.find("form").submit(function(e){
      e.preventDefault()
      self.model.sendMessage(self.$el.find("input[name=body]").val())
      return false
    })
    return this
  }
})