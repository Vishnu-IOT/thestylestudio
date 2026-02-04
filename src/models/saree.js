import mongoose from "mongoose";

const SareeSchema = new mongoose.Schema({
    name: String,
    desc: String,
    discount: Number,
    price: Number,
    category: String,
    image: String,
    loom: {
        type: Boolean,
        default: false
    },

    status: {
        type: String,
        enum: ["active", "inactive", "archived"],
        default: "active"
    },
}, { timestamps: true });

export default mongoose.models.Saree ||
    mongoose.model("Saree", SareeSchema);
