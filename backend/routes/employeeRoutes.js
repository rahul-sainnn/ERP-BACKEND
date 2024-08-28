const express = require('express');
const {
    registerEmployee,
    loginEmployee,
    getAllEmployees,
    getEmployeeById,
    updateEmployee,
    deleteEmployee,
} = require('../controllers/employeeController');
const upload = require('../config/multer'); 
const { isAuthenticated, isAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', upload.single('profilePhoto'), registerEmployee); 
router.post('/login', loginEmployee);
router.get('/allEmployees',isAuthenticated,isAdmin("admin"), getAllEmployees);
router.get('/:id',isAuthenticated, getEmployeeById);
router.put('/:id', upload.single('profilePhoto'),isAuthenticated,isAdmin("admin"), updateEmployee); 
router.delete('/:id',isAuthenticated,isAdmin("admin"), deleteEmployee);

module.exports = router; 
