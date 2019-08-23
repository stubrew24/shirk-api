import { logout, userLogin } from "../controllers/authController";
import { addUser } from "../controllers/userController";

const routes = app => {
  app.route("/login").post(userLogin);
  app.route("/register").post(addUser, userLogin);
  app.route("/logout").get(logout);
};

module.exports = routes;
