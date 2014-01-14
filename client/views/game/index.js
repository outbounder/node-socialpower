module.exports = Backbone.View.extend({
  template: require("./index.jade"),
  initialize: function(){
  },
  render: function(){
    this.$el.html(this.template({
      model: this.model
    }))
  }
})