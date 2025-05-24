import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    text: String,
  },
  {
    timestamps: true, // ✅ This is what adds createdAt and updatedAt
  }
);

export default mongoose.models.Post || mongoose.model("Post", postSchema);
