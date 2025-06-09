import { initMongoose } from "@/lib/mongoose";
import Post from "@/models/Post";
import User from "@/models/User";
import Like from "@/models/Like";
import Saved from "@/models/Saved";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function handler(req, res) {
  await initMongoose();
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const userId = session.user._id || session.user.id;

  if (req.method === "GET") {
    const { id } = req.query;

    // Fetch single post
    if (id) {
      try {
        const post = await Post.findById(id).populate("author", "name2 username image sigil name");
        if (!post) return res.status(404).json({ error: "Post not found" });
        return res.status(200).json({ post });
      } catch (err) {
        return res.status(500).json({ error: "Error fetching post" });
      }
    }

    // Fetch all posts
    try {
      const parent = req.query.parent || null;
      const posts = await Post.find({parent})
        .populate("author", "name2 username image sigil name")
        .sort({ createdAt: -1 })
        .limit(20)
        .exec();

      const postsLikedByMe = await Like.find({
        author: userId,
        post: posts.map((p) => p._id),
      });

      const postsSavedByMe = await Saved.find({
        author: userId,
        post: posts.map((p) => p._id),
      });

      const idsLikedByMe = postsLikedByMe.map((like) => like.post.toString());
      const idsSavedByMe = postsSavedByMe.map((save) => save.post.toString());

      return res.status(200).json({
        posts,
        idsLikedByMe,
        idsSavedByMe,
      });
    } catch (err) {
      return res.status(500).json({ error: "Error fetching posts" });
    }
  }

  if (req.method === "POST") {
    console.log("POST /api/posts called");
    const { text, parent} = req.body;

    if (!text?.trim()) {
      return res.status(400).json({ error: "Post text is required" });
    }

    try {
      const post = await Post.create({
        author: userId,
        text,
        parent,

      });
      


      if (parent) {
        const parentPost = await Post.findById(parent);
        if (parentPost) {
          parentPost.commentsCount = await Post.countDocuments({ parent });
          await parentPost.save();
        }
      }
      




      return res.status(201).json(post);
    } catch (err) {
      return res.status(500).json({ error: "Error creating post" });
    }
  }

  res.setHeader("Allow", ["GET", "POST"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
