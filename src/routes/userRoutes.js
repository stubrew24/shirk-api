import {addUser, getUsers, showUser} from "../controllers/userController";

const routes = app => {
    app.route('/users')
        .get(getUsers)
    app.route('/users/:userId')
        .get(showUser)
};

module.exports = routes;