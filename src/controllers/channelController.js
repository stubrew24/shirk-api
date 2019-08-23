import mongoose from "mongoose";

import { ChannelSchema } from "../models/channelModel";
import { UserChannelSchema } from "../models/userChannelModel";
import { UserSchema } from "../models/userModel";

const User = mongoose.model("user", UserSchema);
const Channel = mongoose.model("channel", ChannelSchema);
// const UserChannel = mongoose.model('userChannel', UserChannelSchema);

export const joinChannel = async (req, res) => {
  const user = await User.findOne({ _id: req.body.userId }).populate(
    "channels"
  );
  const channel = await Channel.findOne({ _id: req.body.channelId });

  user.channels.push(channel);
  user.save();
  res.json(user);
};

export const leaveChannel = async (req, res) => {
  const user = await User.findOne({ _id: req.body.userId });
  user.channels = await user.channels.filter(
    channel => channel != req.body.channelId
  );
  await user.save();
  const updatedUser = await User.findOne({ _id: req.body.userId }).populate(
    "channels"
  );
  res.json(updatedUser);
};

export const newChannel = (req, res) => {
  const newChannel = new Channel(req.body);

  newChannel.save((err, channel) => {
    if (err) res.status(400).json({ error: err });
    res.json(channel);
  });
};

export const getAllChannels = (req, res) => {
  Channel.find({}, (err, channels) => {
    if (err) res.status(400).json({ error: err });
    res.json(channels);
  });
};

export const getPublicChannels = (req, res) => {
  Channel.find({ visibility: "public" }, (err, channels) => {
    if (err) res.status(400).json({ error: err });
    res.json(channels);
  });
};

export const getChannel = (req, res) => {
  Channel.findById({ _id: req.params.channelId }, (err, channel) => {
    if (err) res.status(400).json({ error: err });
    res.json(channel);
  });
};
