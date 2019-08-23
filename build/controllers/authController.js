'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.logout = exports.userLogin = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _userModel = require('../models/userModel');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var User = _mongoose2.default.model('user', _userModel.UserSchema);

var userLogin = exports.userLogin = function userLogin(req, res) {
    User.findOne({ username: req.body.username }, function (err, user) {
        if (err) throw err;
        if (!user) {
            res.status(401).json({ message: 'Authentication failed. No user found with those credentials.' });
        } else {
            if (!user.comparePassword(req.body.password, user.hashPassword)) {
                res.status(401).json({ message: 'Authentication failed. No user found with those credentials.' });
            } else {
                var payload = { id: user._id };
                var token = _jsonwebtoken2.default.sign(payload, process.env.SECRET, {
                    expiresIn: '30d'
                });
                res.cookie('token', token, { httpOnly: true }).status(200).json({ message: 'success' });
            }
        }
    });
};

var logout = exports.logout = function logout(req, res) {
    res.clearCookie('token').json({ message: 'deleted' });
};
//# sourceMappingURL=authController.js.map