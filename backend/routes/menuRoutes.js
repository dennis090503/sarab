import express from 'express';
import MenuItem from '../models/MenuItem.js';
import protectAdmin from '../config/authMiddleware.js'; // Import your JWT protector

const router = express.Router();

// 1. PUBLIC: GET all menu records from database
router.get('/', async (req, res) => {
  try {
    const items = await MenuItem.find({});
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Server context menu data fetch error.' });
  }
});

// 2. PROTECTED: POST /api/menu - Add a brand new dish with auto-incremented ID
router.post('/', protectAdmin, async (req, res) => {
  try {
    // Look up the highest existing 'id' value in the collection
    const highestItem = await MenuItem.findOne().sort({ id: -1 });
    
    // If items exist, increment that ID by 1; otherwise, start at 1
    const nextId = highestItem && highestItem.id ? highestItem.id + 1 : 1;

    // Attach the sequential numeric id to the payload body
    const extendedBody = {
      ...req.body,
      id: nextId
    };

    const newDish = new MenuItem(extendedBody);
    const savedDish = await newDish.save();
    res.status(201).json({ success: true, item: savedDish });
  } catch (error) {
    res.status(400).json({ message: 'Failed to create menu item.', error: error.message });
  }
});

// 3. PROTECTED: PUT /api/menu/:id - Edit an existing dish's price, text, description, or tags
router.put('/:id', protectAdmin, async (req, res) => {
  try {
    const updatedDish = await MenuItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedDish) return res.status(404).json({ message: 'Menu item target not found.' });
    res.json({ success: true, item: updatedDish });
  } catch (error) {
    res.status(400).json({ message: 'Failed to update menu item.', error: error.message });
  }
});

// 4. PROTECTED: DELETE /api/menu/:id - Remove a dish from the system permanently
router.delete('/:id', protectAdmin, async (react, res) => {
  try {
    const deletedDish = await MenuItem.findByIdAndDelete(req.params.id);
    if (!deletedDish) return res.status(404).json({ message: 'Menu item target not found.' });
    res.json({ success: true, message: 'Dish successfully deleted from catalog matrix.' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to execute item deletion error context.' });
  }
});

// Seed data endpoint (Kept for fallback emergencies)
router.post('/seed', async (req, res) => {
  try {
    await MenuItem.deleteMany({});
    // Sample items here... (kept clean for space)
    res.status(201).json({ success: true, message: "Database seeded successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Seeding failed" });
  }
});

export default router;