import postModel from "../models/Post.js";
import commentModel from "../models/Comment.js";

export const getComments = async (req, res) => {
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
};

export const createComment = async (req, res) => {
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
};
