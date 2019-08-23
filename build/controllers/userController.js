"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.showUser = exports.addUser = exports.getUsers = undefined;

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bcrypt = require("bcrypt");

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _userModel = require("../models/userModel");

var _channelModel = require("../models/channelModel");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var User = _mongoose2.default.model("user", _userModel.UserSchema);
var Channel = _mongoose2.default.model("channel", _channelModel.ChannelSchema);

var getUsers = exports.getUsers = function getUsers(req, res) {
  User.find({}, function (err, users) {
    if (err) res.status(400).json({ error: err });
    res.json(users);
  });
};

var addUser = exports.addUser = function addUser(req, res, next) {
  var newUser = new User(req.body);
  newUser.hashPassword = _bcrypt2.default.hashSync(req.body.password, 10);

  newUser.save(function (err, user) {
    if (err) res.status(400).json({ error: err });
    req.username = user.username;
    next();
  });
};

var showUser = exports.showUser = function showUser(req, res) {
  User.findById({ _id: req.params.userId }).populate({ path: "channels", select: ["name", "description"] }).exec(function (err, user) {
    if (err) res.status(400).json({ error: err });
    user.hashPassword = undefined;
    res.json(user);
  });
};
//# sourceMappingURL=userController.js.map