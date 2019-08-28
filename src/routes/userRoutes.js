import {
  getUsers,
  showUser,
  updateUser,
  validate
} from "../controllers/userController";

export const userRoutes = app => {
  app.route("/users").get(getUsers);
  app
    .route("/users/:userId")
    .get(showUser)
    .put(updateUser);
  app.route("/validate").post(validate);
};
