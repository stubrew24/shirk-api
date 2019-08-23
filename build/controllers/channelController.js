"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getChannel = exports.getPublicChannels = exports.getAllChannels = exports.newChannel = exports.leaveChannel = exports.joinChannel = undefined;

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _channelModel = require("../models/channelModel");

var _userChannelModel = require("../models/userChannelModel");

var _userModel = require("../models/userModel");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var User = _mongoose2.default.model("user", _userModel.UserSchema);
var Channel = _mongoose2.default.model("channel", _channelModel.ChannelSchema);
// const UserChannel = mongoose.model('userChannel', UserChannelSchema);

var joinChannel = exports.joinChannel = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var user, channel;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return User.findOne({ _id: req.body.userId }).populate("channels");

          case 2:
            user = _context.sent;
            _context.next = 5;
            return Channel.findOne({ _id: req.body.channelId });

          case 5:
            channel = _context.sent;


            user.channels.push(channel);
            user.save();
            res.json(user);

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function joinChannel(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var leaveChannel = exports.leaveChannel = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var user, updatedUser;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return User.findOne({ _id: req.body.userId });

          case 2:
            user = _context2.sent;
            _context2.next = 5;
            return user.channels.filter(function (channel) {
              return channel != req.body.channelId;
            });

          case 5:
            user.channels = _context2.sent;
            _context2.next = 8;
            return user.save();

          case 8:
            _context2.next = 10;
            return User.findOne({ _id: req.body.userId }).populate("channels");

          case 10:
            updatedUser = _context2.sent;

            res.json(updatedUser);

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function leaveChannel(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var newChannel = exports.newChannel = function newChannel(req, res) {
  var newChannel = new Channel(req.body);

  newChannel.save(function (err, channel) {
    if (err) res.status(400).json({ error: err });
    res.json(channel);
  });
};

var getAllChannels = exports.getAllChannels = function getAllChannels(req, res) {
  Channel.find({}, function (err, channels) {
    if (err) res.status(400).json({ error: err });
    res.json(channels);
  });
};

var getPublicChannels = exports.getPublicChannels = function getPublicChannels(req, res) {
  Channel.find({ visibility: "public" }, function (err, channels) {
    if (err) res.status(400).json({ error: err });
    res.json(channels);
  });
};

var getChannel = exports.getChannel = function getChannel(req, res) {
  Channel.findById({ _id: req.params.channelId }, function (err, channel) {
    if (err) res.status(400).json({ error: err });
    res.json(channel);
  });
};
//# sourceMappingURL=channelController.js.map