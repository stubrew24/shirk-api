'use strict';

var _postController = require('../controllers/postController');

var routes = function routes(app) {
    app.route('/posts').get(_postController.getPosts).post(_postController.addPost);

    app.route('/posts/:postId').get(_postController.showPost);
};

module.exports = routes;
//# sourceMappingURL=postRoutes.js.map