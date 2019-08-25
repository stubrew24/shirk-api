import { logout, userLogin } from "../controllers/authController";
import { addUser } from "../controllers/userController";

export const authRoutes = app => {
  app.route("/login").post(userLogin);
  app.route("/register").post(addUser, userLogin);
  app.route("/logout").get(logout);
};
