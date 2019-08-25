import {
  addPost,
  channelPosts,
  getAllPosts,
  showPost
} from "../controllers/postController";

export const postRoutes = app => {
  app
    .route("/posts")
    .get(getAllPosts)
    .post(addPost);

  app.route("/posts/:channelId").get(channelPosts);

  app.route("/posts/:postId").get(showPost);
};
