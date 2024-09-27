import mongoose from "mongoose";

const Schema = mongoose.Schema;
const postSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    comments: [Schema.Types.ObjectId],
    likes: [Schema.Types.ObjectId],
  },
  { timestamps: true }
);

const postModel = mongoose.model("Post", postSchema);
export default postModel;
