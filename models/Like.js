import { Schema } from "mongoose";
import mongoose from "mongoose";

const LikeSchema = new Schema({
    author:{type:mongoose.Schema.Types.ObjectId, ref:"User"},

    post:{type:mongoose.Schema.Types.ObjectId, ref:"Post"}},
    {timestamps:true});

const Like = mongoose.models?.Like || mongoose.model("Like", LikeSchema);

export default Like;