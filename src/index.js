if (!process.env.now) require("dotenv").config();
import "babel-polyfill";
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const withAuth = require("./middleware");

const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const authRoutes = require("./routes/authRoutes");
const channelRoutes = require("./routes/channelRoutes");
import { UserSchema } from "./models/userModel";

const User = mongoose.model("user", UserSchema);
const app = express();

app.use(helmet());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/checkAuth", withAuth, async (req, res) => {
  const user = await User.findOne({ _id: req.userId }).populate("channels");
  res.status(200).json(user);
});

mongoose.Promise = global.Promise;
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost/shirk", {
    useNewUrlParser: true
  })
  .then(() => console.log("Connected to mongoDB"))
  .catch(err => console.log(err));

userRoutes(app);
postRoutes(app);
authRoutes(app);
channelRoutes(app);

app.listen("3333", console.log("Listening on port 3333"));
