import { logout, userLogin } from "../controllers/authController";
import { addUser, uploadAvatar } from "../controllers/userController";
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
  app.route("/register").post(addUser, userLogin);
  app.route("/logout").get(logout);
  app.route("/uploadavatar").post(upload, uploadAvatar);
};
