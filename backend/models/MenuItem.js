import mongoose from 'mongoose';

const menuItemSchema = new mongoose.Schema({
  id: { type: Number, required: true }, // Add this to keep your frontend mapping happy!
  title: { type: String, required: true },
  category: { type: String, required: true },
  displayCategory: { type: String, required: true },
  price: { type: String, required: true }, 
  shortDesc: { type: String, required: true },
  longDesc: { type: String },
  img: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model('MenuItem', menuItemSchema);