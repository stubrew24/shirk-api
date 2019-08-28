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
  newUser.avatar = req.file.filename;

  newUser.save((err, user) => {
    if (err) res.status(400).json({ error: err });
    req.username = user.username;
    next();
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
