import { logout, userLogin } from "../controllers/authController";
import { addUser } from "../controllers/userController";
const multer = require("multer");

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "uploads");
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

var upload = multer({ storage: storage }).single("avatar");

export const authRoutes = app => {
  app.route("/login").post(userLogin);
  app.route("/register").post(upload, addUser, userLogin);
  app.route("/logout").get(logout);
};
