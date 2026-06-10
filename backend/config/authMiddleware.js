import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const protectAdmin = async (req, res, next) => {
  let token;

  // Check if token exists in Authorization header ('Bearer <token>')
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Isolate token from prefix string
      token = req.headers.authorization.split(' ')[1];

      // Decode and verify the signature token integrity
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach user record context to the request pipeline (excluding password string)
      req.user = await User.findById(decoded.id).select('-password');
      
      return next(); // Token valid, advance to the route controller
    } catch (error) {
      return res.status(401).json({ message: 'Authorization verification failed. Token invalid.' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized. Access token is missing.' });
  }
};

export default protectAdmin;