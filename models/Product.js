import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  image: String,
  category: String
}, { timestamps: true });

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);