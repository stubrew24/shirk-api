import {addPost, getPosts, showPost} from "../controllers/postController";

const routes = app => {
    app.route('/posts')
        .get(getPosts)
        .post(addPost)

    app.route('/posts/:postId')
        .get(showPost)
};

module.exports = routes;