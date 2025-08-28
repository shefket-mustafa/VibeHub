import { Schema, model } from "mongoose";

const userSchema = new Schema({
    email: {type: String, required: true, unique: true},
    username: {type: String, required: true, },
    passwordHash: {type: String, required: true}
}, { timestamps: true })

export default model("User", userSchema);