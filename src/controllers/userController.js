import mongoose from "mongoose";
import bcrypt from "bcrypt";

import { UserSchema } from "../models/userModel";
import { ChannelSchema } from "../models/channelModel";

const User = mongoose.model("user", UserSchema);
const Channel = mongoose.model("channel", ChannelSchema);

export const getUsers = (req, res) => {
  User.find({}, (err, users) => {
    if (err) res.status(400).json({ error: err });
    res.json(users);
  });
};

export const addUser = (req, res, next) => {
  const newUser = new User(req.body);
  newUser.hashPassword = bcrypt.hashSync(req.body.password, 10);

  newUser.save((err, user) => {
    if (err) {
      res.status(400).json(err);
    } else {
      req.username = user.username;
      next();
    }
  });
};

export const showUser = (req, res) => {
  User.findById({ _id: req.params.userId })
    .populate({ path: "channels", select: ["name", "description"] })
    .exec((err, user) => {
      if (err) res.status(400).json({ error: err });
      user.hashPassword = undefined;
      res.json(user);
    });
};

export const uploadAvatar = (req, res) => {
  res.json({ avatar: req.file.filename });
};

export const updateUser = async (req, res) => {
  const user = await User.findOne({ _id: req.params.userId });
  user.username = req.body.username;
  user.avatar = req.body.avatar;
  await user.save();
  console.log(user);
  User.findOne({ _id: req.params.userId })
    .populate({ path: "channels", select: ["name", "description"] })
    .exec((err, user) => {
      if (err) res.status(400).json({ error: err });
      user.hashPassword = undefined;
      res.json(user);
    });
};

export const validate = async (req, res) => {
  const checks = {};
  await User.findOne({ username: req.body.username }, (err, user) => {
    if (user) {
      checks.username = "Username already taken.";
    }
  });
  await User.findOne({ email: req.body.email }, (err, user) => {
    if (user) {
      checks.email = "Email address already taken.";
    }
  });
  await res.json(checks);
};
