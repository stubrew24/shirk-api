"use strict";

require("babel-polyfill");

var _userModel = require("./models/userModel");

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

if (!process.env.now) require("dotenv").config();

var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var helmet = require("helmet");
var cors = require("cors");
var cookieParser = require("cookie-parser");
var withAuth = require("./middleware");

var userRoutes = require("./routes/userRoutes");
var postRoutes = require("./routes/postRoutes");
var authRoutes = require("./routes/authRoutes");
var channelRoutes = require("./routes/channelRoutes");


var User = mongoose.model("user", _userModel.UserSchema);
var app = express();

app.use(helmet());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.get("/checkAuth", withAuth, function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var user;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return User.findOne({ _id: req.userId }).populate("channels");

          case 2:
            user = _context.sent;

            res.status(200).json(user);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/shirk", {
  useNewUrlParser: true
}).then(function () {
  return console.log("Connected to mongoDB");
}).catch(function (err) {
  return console.log(err);
});

userRoutes(app);
postRoutes(app);
authRoutes(app);
channelRoutes(app);

app.listen("3333", console.log("Listening on port 3333"));
//# sourceMappingURL=index.js.map