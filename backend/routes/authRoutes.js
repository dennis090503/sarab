import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

// POST /api/auth/login - Match credentials and issue safe JWT token
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (user && (await user.matchPassword(password))) {
      // Issue token containing user database reference ID expiring in 1 day
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
      
      res.json({
        success: true,
        token,
        username: user.username
      });
    } else {
      res.status(401).json({ message: 'Invalid administrative username or password credentials.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Login processing error.', error: error.message });
  }
});

// POST /api/auth/seed-admin - Seed default staff user account (Run once)
router.post('/seed-admin', async (req, res) => {
  try {
    const userExists = await User.findOne({ username: 'admin' });
    if (userExists) return res.json({ message: 'Admin account already prepared.' });

    const defaultAdmin = new User({
      username: 'admin',
      password: 'adminpassword123' // This will be auto-hashed by our User model pre-save hook!
    });

    await defaultAdmin.save();
    res.status(201).json({ success: true, message: 'Admin user account created! (User: admin / Pass: adminpassword123)' });
  } catch (error) {
    res.status(500).json({ message: 'Admin seeding failed.', error: error.message });
  }
});

export default router;