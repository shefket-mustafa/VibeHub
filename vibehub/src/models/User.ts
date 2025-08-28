import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
    email: {type: String, required: true, unique: true},
    username: {type: String, required: true, },
    passwordHash: {type: String, required: true}
}, { timestamps: true })

export const User = models.User || model("User", userSchema);