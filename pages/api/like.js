import { initMongoose } from "@/lib/mongoose";

import { authOptions } from "./auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import Like from "@/models/Like";
import Post from "@/models/Post";



async function updateLikesCount(postId) {
    const post = await Post.findById(postId);
    post.likesCount = await Like.countDocuments({ post: postId });
    await post.save();
}



export default async function handle(req,res){
    await initMongoose();
    const session = await getServerSession(req,res,authOptions);
    const postId = req.body.id;
    const userID = session?.user?._id;

    const existingLike=await Like.findOne({author:userID,post:postId})
    
    if (existingLike){
        await existingLike.deleteOne();
        await updateLikesCount(postId);

        res.json({ like: null });

    }
    else{
        const like = await Like.create({author:userID, post:postId});
        await updateLikesCount(postId);
        res.json({like})
    }}