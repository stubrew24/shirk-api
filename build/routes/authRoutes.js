"use strict";

var _authController = require("../controllers/authController");

var _userController = require("../controllers/userController");

var routes = function routes(app) {
  app.route("/login").post(_authController.userLogin);
  app.route("/register").post(_userController.addUser, _authController.userLogin);
  app.route("/logout").get(_authController.logout);
};

module.exports = routes;
//# sourceMappingURL=authRoutes.js.map