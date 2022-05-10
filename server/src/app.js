const express = require("express");
const cors = require("cors");

const { verifyApiKey } = require("./middlewares/app.middlewares.js");
const authRoute = require("./routes/auth.routes.js");
const characterRoute = require("./routes/character.routes.js");
const ratingRoute = require("./routes/rating.routes.js");
const commentRoute = require("./routes/comment.routes.js");
const likeRoute = require("./routes/like.routes.js");


const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoute);

app.use(verifyApiKey);

app.use("/api/characters", characterRoute);
app.use("/api/ratings", ratingRoute);
app.use("/api/comments", commentRoute);
app.use("/api/likes", likeRoute);


module.exports = app;