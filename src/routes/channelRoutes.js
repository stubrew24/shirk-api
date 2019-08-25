import {
  joinChannel,
  leaveChannel,
  newChannel,
  getAllChannels,
  getPublicChannels,
  getChannel
} from "../controllers/channelController";

export const channelRoutes = app => {
  app
    .route("/channels")
    .get(getPublicChannels)
    .post(newChannel);

  app.route("/channels/:channelId").get(getChannel);

  app.route("/userchannels").post(joinChannel);

  app.route("/allchannels").get(getAllChannels);

  app.route("/leavechannel").post(leaveChannel);
};
