import mongoose from "mongoose";

const RegisterSchema = new mongoose.Schema({
    name: String,
    email: String,
    phonenumber: Number,
    uid: String,
    emailverified: Boolean,
    admin: {
        type: String,
        enum: ["ADMIN", "CUSTOMER"],
        default: "ADMIN"
    },
}, { timestamps: true });

export default mongoose.models.Register ||
    mongoose.model("Register", RegisterSchema);
