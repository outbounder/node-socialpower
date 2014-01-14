module.exports = Backbone.View.extend({
  template: require("./index.jade"),
  events: {
    "click .resendButton": "resentMessage"
  },
  resentMessage: function(){
    app.user.sendMessage(this.model.get("body"))
  },
  render: function(){
    this.$el.html(this.template({
      model: this.model,
      user: app.user
    }))
    return this
  }
})