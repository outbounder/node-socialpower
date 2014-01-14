"use strict";
var Activity = require("../../models/server/Activity");
module.exports = {
  list: function (req, res) {
    Activity.list(req.body /* conditions */, function (err, activity) {
      if (err) {
        res.send(500, {result: err});
      }
      res.send(200, activity);
    }); 
  },
  share: function(req, res) {
    var message = {
      author: req.session.userId,
      body: req.body.body // String
    };
    Activity.share(message, function (err, share) {
      if (err) {
        res.send(500, {result: err});
      }
      res.send(200, share);
    });
  },
  reshare: function (req, res) {
    var share = req.body; // { parent: id, message: id, [date: Date]}
    share.author = req.session.userId;
    Activity.reshare(share, function (err, share) {
      if (err) {
        res.send(500, {result: err});
      }
      res.send(200, share);
    });
  }
};