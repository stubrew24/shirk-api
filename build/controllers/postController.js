'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.showPost = exports.addPost = exports.getPosts = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _postModel = require('../models/postModel');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Post = _mongoose2.default.model('post', _postModel.PostSchema);

var getPosts = exports.getPosts = function getPosts(req, res) {
    Post.find({}, function (err, posts) {
        if (err) res.status(400).json({ error: err });
        res.json(posts);
    });
};

var addPost = exports.addPost = function addPost(req, res) {
    var newPost = new Post(req.body);

    newPost.save(function (err, post) {
        if (err) res.status(400).json({ error: err });
        res.json(post);
    });
};

var showPost = exports.showPost = function showPost(req, res) {
    Post.findById({ _id: req.params.postId }, function (err, post) {
        if (err) res.status(400).json({ error: err });
        res.json(post);
    });
};
//# sourceMappingURL=postController.js.map