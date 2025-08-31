import { initMongoose } from "@/lib/mongoose";
import { authOptions } from "./auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import Like from "@/models/Like";
import Post from "@/models/Post";

export default async function handle(req, res) {
  await initMongoose();
  const session = await getServerSession(req, res, authOptions);
  const postId = req.body.id;
  const userID = session?.user?._id;

  if (!userID) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // Check if user already liked
  const existingLike = await Like.findOne({ author: userID, post: postId });

  if (existingLike) {
    // Unlike: remove Like doc + decrement count
    await Like.deleteOne({ _id: existingLike._id });
    await Post.updateOne({ _id: postId }, { $inc: { likesCount: -1 } });

    return res.json({ liked: false });
  } else {
    // Like: create Like doc + increment count
    await Like.create({ author: userID, post: postId });
    await Post.updateOne({ _id: postId }, { $inc: { likesCount: 1 } });

    return res.json({ liked: true });
  }
}
