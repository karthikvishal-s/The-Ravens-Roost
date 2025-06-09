import { Schema } from "mongoose";
import mongoose from "mongoose";

const SavedSchema = new Schema({
    author:{type:mongoose.Schema.Types.ObjectId, ref:"User"},

    post:{type:mongoose.Schema.Types.ObjectId, ref:"Post"}},
    {timestamps:true});

const Saved = mongoose.models?.Saved || mongoose.model("Saved", SavedSchema);

export default Saved;