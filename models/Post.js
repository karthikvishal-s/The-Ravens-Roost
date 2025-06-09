import mongoose, { model, models } from "mongoose";

const postSchema = new mongoose.Schema(
  {
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    text: String,
    likesCount: { type: Number, default: 0 },
    savedCount: { type: Number, default: 0 },
    commentsCount: { type: Number, default: 0 },
    parent:{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }, // For replies
  },
  {
    timestamps: true, // ✅ This is what adds createdAt and updatedAt
  }
);

export default models?.Post || mongoose.model("Post", postSchema);

