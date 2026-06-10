import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  customer: {
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    serviceType: { type: String, required: true, enum: ['delivery', 'pickup', 'dinein'] },
    details: { type: String }
  },
  items: [
    {
      title: { type: String, required: true },
      price: { type: Number, required: true }, // Must be a clean number
      quantity: { type: Number, required: true }
    }
  ],
  grandTotal: { type: Number, required: true }, // Must be a clean number
  status: { type: String, default: 'Pending', enum: ['Pending', 'Preparing', 'Completed', 'Cancelled'] }
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);