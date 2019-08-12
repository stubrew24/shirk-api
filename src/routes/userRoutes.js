import {addUser, getUsers, showUser} from "../controllers/userController";

const routes = app => {
    app.route('/users')
        .get(getUsers)
        .post(addUser)
    app.route('/users/:userId')
        .get(showUser)
};

module.exports = routes;