import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import cors from "cors";
import jwt from "jsonwebtoken";
import connectDB from "./config/db.js";
import requireAuth from "./middleware/requireAuth.js";
import userModel from "./models/User.js";
import postModel from "./models/Post.js";
import commentModel from "./models/Comment.js";

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());
connectDB();

function createToken(_id) {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "1d" });
}

app.get("/users", async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.get("/users/:username", async (req, res) => {
  try {
    const user = await userModel.findOne({ username: req.params.username });
    if (!user) return res.status(404).json({ msg: "User not found." });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.get("/posts", async (req, res) => {
  try {
    const posts = await postModel.find();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.post("/posts", requireAuth, async (req, res) => {
  try {
    const { _id, firstName, lastName, username } = req.user;
    const { content } = req.body;
    if (!content)
      return res.status(400).json({ msg: "Post content can't be empty." });
    const post = await postModel.create({
      userId: _id,
      firstName,
      lastName,
      username,
      content,
    });
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.delete("/posts/:postId", requireAuth, async (req, res) => {
  try {
    const { postId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(postId))
      return res.status(400).json({ msg: "Invalid post id." });

    const post = await postModel.findById(postId);
    if (!post) return res.status(404).json({ msg: "Post not found." });
    if (!req.user._id.equals(post.userId))
      return res
        .status(401)
        .json({ msg: "User id doesn't match user id from post." });

    await Promise.all([
      postModel.deleteOne({ _id: postId }),
      commentModel.deleteMany({ postId }),
    ]);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.get("/comments", async (req, res) => {
  try {
    if (req.query.postId) {
      const comments = await commentModel.find({ postId: req.query.postId });
      return res.status(200).json(comments);
    }
    const comments = await commentModel.find();
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.post("/comments", requireAuth, async (req, res) => {
  try {
    const { _id: userId, firstName, lastName, username } = req.user;
    const { postId, content } = req.body;
    if (!content)
      return res.status(400).json({ msg: "Comment content can't be empty." });

    const post = await postModel.findById(postId);
    if (!post) return res.status(404).json({ msg: "Post not found." });

    const comment = await commentModel.create({
      postId,
      userId,
      firstName,
      lastName,
      username,
      content,
    });
    post.comments.push(comment._id);
    await post.save();
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res.status(400).json({ msg: "All fields must be filled." });

    const user = await userModel.findOne({ username });
    if (!user) return res.status(404).json({ msg: "Username not found." });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ msg: "Password is incorrect." });
    res
      .status(200)
      .json({ token: createToken(user._id), username: user.username });
  } catch (err) {
    res.status(500).json(err);
  }
});

app.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, email, username, password } = req.body;
    const foundUser = await userModel.findOne({
      $or: [{ email }, { username }],
    });
    if (foundUser) {
      if (foundUser.email === email)
        return res.status(409).json({ msg: "Email is already taken." });
      if (foundUser.username === username)
        return res.status(409).json({ msg: "Username is already taken." });
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = await userModel.create({
      firstName,
      lastName,
      email,
      username,
      password: hash,
    });
    res
      .status(201)
      .json({ token: createToken(user._id), username: user.username });
  } catch (err) {
    res.status(500).json(err);
  }
});

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
