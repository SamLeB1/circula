import express from "express";
import {
  getPosts,
  createPost,
  updatePost,
  likePost,
  deletePost,
} from "../controllers/postController.js";
import requireAuth from "../middleware/requireAuth.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/", requireAuth, createPost);
router.patch("/:postId", requireAuth, updatePost);
router.patch("/:postId/like", requireAuth, likePost);
router.delete("/:postId", requireAuth, deletePost);

export default router;
