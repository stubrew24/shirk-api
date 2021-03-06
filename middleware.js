const jwt = require("jsonwebtoken");
const multer = require("multer");

export const withAuth = function(req, res, next) {
  const token =
    req.body.token ||
    req.query.token ||
    req.headers["x-access-token"] ||
    req.cookies.token;
  if (!token) {
    res.status(401).json({ error: "Unauthorized: No token provided" });
  } else {
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
      if (err) {
        res.status(401).json({ error: "Unauthorized: No token provided" });
      } else {
        req.userId = decoded.id;
        next();
      }
    });
  }
};

export const upload = multer({
  limits: {
    fileSize: 4 * 1024 * 1024
  }
});
