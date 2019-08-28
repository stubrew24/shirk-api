import mongoose from "mongoose";

import { PostSchema } from "../models/postModel";

const Post = mongoose.model("post", PostSchema);

export const getAllPosts = (req, res) => {
  Post.find({}, (err, posts) => {
    if (err) return { error: err };
    res.json(posts);
  });
};

export const addPost = (req, res) => {
  const newPost = new Post(req.body);

  newPost.save(async (err, post) => {
    if (err) res.status(400).json({ error: err });
    const repost = await Post.findOne({ _id: post._id }).populate({
      path: "userId",
      select: ["username", "avatar"]
    });
    res.json(repost);
  });
};

export const showPost = (req, res) => {
  Post.findById({ _id: req.params.postId })
    .populate({ path: "userId", select: ["username", "avatar"] })
    .exec((err, post) => {
      if (err) res.status(400).json({ error: err });
      res.json(post);
    });
};

export const channelPosts = (req, res) => {
  Post.find({ channelId: req.params.channelId })
    .populate({ path: "userId", select: ["username", "avatar"] })
    .exec((err, posts) => {
      if (err) return { error: err };
      res.json(posts);
    });
};
