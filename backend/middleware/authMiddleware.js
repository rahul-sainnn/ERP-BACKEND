const jwt = require('jsonwebtoken');
const Employee = require('../models/employeeModel');


 exports.isAuthenticated = async (req, res, next) => {
  try {
    console.log('Authorization Header:', req.headers.authorization);
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ success: false, message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await Employee.findById(decoded.id);
    console.log('Decoded User:', req.user);

    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Invalid token' });
    }

    next();
  } catch (error) {
    console.error('Authentication Error:', error);
    res.status(401).json({ success: false, message: 'Authentication failed', error: error.message });
  }
};




exports.isAdmin = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new ErrorHandler(`Role: ${req.user.role} is not allowed to access this resource`, 403));
    }
    next();
  };
};

