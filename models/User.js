import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name:{type: String, unique: true, required: true},
    email:{type: String, unique: true, required: true},
    password:{type: String, required: true},
    img:{type: String,},
    subscribers:{type: Number, default: 0,},
    subscribedUsers:{type: [String],}
},{timestamps: true})

export default mongoose.model("User", UserSchema)