"use strict";

var _userModel = require("./models/userModel");

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var jwt = require("jsonwebtoken");

var User = _mongoose2.default.model("user", _userModel.UserSchema);

var withAuth = function withAuth(req, res, next) {
  var token = req.body.token || req.query.token || req.headers["x-access-token"] || req.cookies.token;
  if (!token) {
    res.status(401).json({ error: "Unauthorized: No token provided" });
  } else {
    jwt.verify(token, process.env.SECRET, function (err, decoded) {
      if (err) {
        res.status(401).json({ error: "Unauthorized: No token provided" });
      } else {
        req.userId = decoded.id;
        next();
      }
    });
  }
};
module.exports = withAuth;
//# sourceMappingURL=middleware.js.map