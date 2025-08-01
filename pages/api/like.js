import { initMongoose } from "@/lib/mongoose";
import { authOptions } from "./auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import Like from "@/models/Like";
import Post from "@/models/Post";



async function updateLikesCount(postId) {
    const post = await Post.findById(postId);
    post.likesCount = await Like.countDocuments({ post: postId });
    //eventough if we increase the value in db , it will automatically count the docs and become normal..
    await post.save();
}



export default async function handle(req, res) {
    await initMongoose();
    const session = await getServerSession(req, res, authOptions);
    const postId = req.body.id;
    const userID = session?.user?._id;
  
    console.log("Session:", session); // 🔍 Debug
    console.log("User ID:", userID); // 🔍 Debug
  
    if (!userID) {
      return res.status(401).json({ error: "Unauthorized" });
    }
  
    const existingLike = await Like.findOne({ author: userID, post: postId });
  
    if (existingLike) {
      await existingLike.deleteOne();
      await updateLikesCount(postId);
      res.json({ liked: false });
    } else {
      await Like.create({ author: userID, post: postId });
      await updateLikesCount(postId);
      res.json({ liked: true });
    }
  }
  