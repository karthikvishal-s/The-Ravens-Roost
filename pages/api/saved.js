import { initMongoose } from "@/lib/mongoose";
import { authOptions } from "./auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import Post from "@/models/Post";
import Saved from "@/models/Saved";

async function updateSavedCount(postId) {
  const post = await Post.findById(postId);
  post.savedCount = await Saved.countDocuments({ post: postId });
  await post.save();
}

export default async function handle(req, res) {
  await initMongoose();
  const session = await getServerSession(req, res, authOptions);
  const userID = session?.user?._id;

  if (!userID) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.method === "GET") {
    // ✅ Return all saved posts by this user
    const savedPosts = await Saved.find({ author: userID }).populate({
      path: "post",
      populate: {
        path: "author",
        select: "username name2 sigil image", // customize fields
      },
    });

    const posts = savedPosts.map(entry => ({
      ...entry.post.toObject(),
      savedByMe: true, // ✅ explicitly set
    }));

    return res.json({ posts });
  }

  if (req.method === "POST") {
    const postId = req.body.id;

    const existingsaves = await Saved.findOne({ author: userID, post: postId });

    if (existingsaves) {
      await existingsaves.deleteOne();
      await updateSavedCount(postId);
      res.json({ saved: false });
    } else {
      await Saved.create({ author: userID, post: postId });
      await updateSavedCount(postId);
      res.json({ saved: true });
    }
  }
}
