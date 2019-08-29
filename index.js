if (!process.env.now) require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");
const cookieParser = require("cookie-parser");
import { withAuth } from "./middleware";

import { userRoutes } from "./src/routes/userRoutes";
import { postRoutes } from "./src/routes/postRoutes";
import { authRoutes } from "./src/routes/authRoutes";
import { channelRoutes } from "./src/routes/channelRoutes";
import { UserSchema } from "./src/models/userModel";

import { PostSchema } from "./src/models/userModel";

const User = mongoose.model("user", UserSchema);
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const port = process.env.now ? 8080 : 4000;
const Post = mongoose.model("post", PostSchema);

let interval;

app.use(helmet());
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000", "https://shirk.netlify.com"]
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

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

io.on("connection", socket => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
  socket.on("chat message", msg => {
    console.log("message:", msg);
  });
  socket.on("typing", (username, id) => {
    clearInterval(interval);
    io.emit("typing", username, id);
    interval = setInterval(() => {
      io.emit("typing", null);
    }, 2000);
  });
  socket.on("get messages", id => {
    Post.find({ channelId: id })
      .populate({ path: "userId", select: ["username", "avatar"] })
      .exec((err, posts) => {
        if (err) return { error: err };
        io.emit("posts", posts, id);
      });
  });
});

userRoutes(app);
postRoutes(app);
authRoutes(app);
channelRoutes(app);

http.listen(port);
