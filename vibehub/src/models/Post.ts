import { Schema, Types, model, models } from "mongoose";

const postSchema = new Schema ({
    
    //ObjectId that points to a User document. then we can use populate("authorId", "email name") and get full user info in one query.
    authorId: {type: Types.ObjectId, ref: "User", required: true},
    authorName: {type: String, required: true},
    content: {type: String, maxLength: 200}
}, {timestamps: true})

// Reuse if it exists 
export const Post = models.Post || model("Post", postSchema);