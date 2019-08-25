import mongoose from "mongoose";

import { PostSchema } from "../models/postModel";

const Post = mongoose.model("post", PostSchema);

export const getAllPosts = (req, res) => {
  Post.find({}, (err, posts) => {
    if (err) res.status(400).json({ error: err });
    res.json(posts);
  });
};

export const addPost = (req, res) => {
  const newPost = new Post(req.body);

  newPost.save((err, post) => {
    if (err) res.status(400).json({ error: err });
    res.json(post);
  });
};

export const showPost = (req, res) => {
  Post.findById({ _id: req.params.postId }, (err, post) => {
    if (err) res.status(400).json({ error: err });
    res.json(post);
  });
};

export const channelPosts = (req, res) => {
  Post.find({ channelId: req.params.channelId }, (err, posts) => {
    if (err) res.status(400).json({ error: err });
    res.json(posts);
  });
};
