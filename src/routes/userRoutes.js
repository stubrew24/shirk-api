import { getUsers, showUser } from "../controllers/userController";

export const userRoutes = app => {
  app.route("/users").get(getUsers);
  app.route("/users/:userId").get(showUser);
};
