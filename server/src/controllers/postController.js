import mongoose from "mongoose";
import postModel from "../models/Post.js";
import commentModel from "../models/Comment.js";

export const getPosts = async (req, res) => {
  try {
    const posts = await postModel.find();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const createPost = async (req, res) => {
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
};

export const updatePost = async (req, res) => {
  try {
    const { content } = req.body;
    const { postId } = req.params;
    if (!content)
      return res.status(400).json({ msg: "Post content can't be empty." });
    if (!mongoose.Types.ObjectId.isValid(postId))
      return res.status(400).json({ msg: "Invalid post id." });

    let post = await postModel.findById(postId);
    if (!post) return res.status(404).json({ msg: "Post not found." });
    if (!req.user._id.equals(post.userId))
      return res
        .status(401)
        .json({ msg: "User id doesn't match user id from post." });

    post.content = content;
    await post.save();
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const likePost = async (req, res) => {
  try {
    const { postId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(postId))
      return res.status(400).json({ msg: "Invalid post id." });
    
    let post = await postModel.findById(postId);
    if (post.likes.includes(req.user._id)) post.likes.remove(req.user._id);
    else post.likes.push(req.user._id);
    await post.save();
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const deletePost = async (req, res) => {
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
};
