import express from "express";
import {
  getComments,
  createComment,
} from "../controllers/commentController.js";
import requireAuth from "../middleware/requireAuth.js";

const router = express.Router();

router.get("/", getComments);
router.post("/", requireAuth, createComment);

export default router;
