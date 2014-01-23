var MessageView = require("./message")

module.exports = Backbone.View.extend({
  template: require("./index.jade"),
  pointsTemplate: require("./points.jade"),
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
  submitMessage: function(e){
    e.preventDefault()
    var $input = this.$el.find("input[name=body]")
    this.model.sendMessage($input.val())
    $input.val("")
    return false
  },
  render: function(){
    var self = this
    this.$el.html(this.template({
      model: this.model,
      user: app.user
    }))
    this.$el.find(".messageInput form").submit(function(e){
      return self.submitMessage(e)
    })
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