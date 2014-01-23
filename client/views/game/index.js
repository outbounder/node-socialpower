var MessageView = require("./message")

module.exports = Backbone.View.extend({
  template: require("./index.jade"),
  pointsTemplate: require("./points.jade"),
  events: {
    "click .addMessage": "addMessage"
  },
  initialize: function(){
    this.bindTo(this.model, "change", function(){
      this.collection.fetch()
      this.renderPoints()
    })
    this.bindTo(this.collection,"sync", this.renderMessages)
    this.bindTo(app, "messageCreated", function(){
      this.collection.fetch()
    })
  },
  addMessage: function(){
    app.router.navigate("/message", true)
  },
  render: function(){
    this.$el.html(this.template({
      model: this.model,
      user: app.user
    }))
    if(!this.model.isNew())
      this.renderPoints()
    return this
  },
  renderPoints: function(){
    this.$el.find(".points").html(this.pointsTemplate({model: this.model}))
  },
  renderMessages: function(){
    var $container = this.$el.find(".messagesList").empty()
    this.collection.each(function(message){
      var view = new MessageView({
        model: message
      })
      $container.append(view.render().el)
    })
    return this
  }
})