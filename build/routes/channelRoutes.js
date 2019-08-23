"use strict";

var _channelController = require("../controllers/channelController");

var routes = function routes(app) {
  app.route("/channels").get(_channelController.getPublicChannels).post(_channelController.newChannel);

  app.route("/channels/:channelId").get(_channelController.getChannel);

  app.route("/userchannels").post(_channelController.joinChannel);

  app.route("/allchannels").get(_channelController.getAllChannels);

  app.route("/leavechannel").post(_channelController.leaveChannel);
};

module.exports = routes;
//# sourceMappingURL=channelRoutes.js.map