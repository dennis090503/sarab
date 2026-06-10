import express from 'express';
import Order from '../models/Order.js';
import protectAdmin from '../config/authMiddleware.js'; // Import your route protector

const router = express.Router();

// 1. PUBLIC: POST /api/orders - Anyone can place an order
router.post('/', async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    const savedOrder = await newOrder.save();
    res.status(201).json({ success: true, orderId: savedOrder._id });
  } catch (error) {
    res.status(400).json({ message: 'Order formatting pipeline parsing failure.', error: error.message });
  }
});

// 2. PROTECTED: GET /api/orders - Only logged-in admin can fetch the logs queue
router.get('/', protectAdmin, async (req, res) => {
  try {
    const orders = await Order.find({}).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server order log fetch failure.' });
  }
});

// 3. PROTECTED: PATCH /api/orders/:id - Only logged-in admin can modify a status
router.patch('/:id', protectAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!updatedOrder) return res.status(404).json({ message: 'Order reference not found.' });
    res.json({ success: true, updatedOrder });
  } catch (error) {
    res.status(400).json({ message: 'Failed to update order status state.' });
  }
});

export default router;