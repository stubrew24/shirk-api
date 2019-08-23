'use strict';

var _userController = require('../controllers/userController');

var routes = function routes(app) {
    app.route('/users').get(_userController.getUsers);
    app.route('/users/:userId').get(_userController.showUser);
};

module.exports = routes;
//# sourceMappingURL=userRoutes.js.map