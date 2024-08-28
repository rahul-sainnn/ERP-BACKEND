const Employee = require('../models/employeeModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register Employee
exports.registerEmployee = async (req, res) => {
    const { name, email, password, role,attendees,profilePhoto } = req.body;

    try {
        const employee = await Employee.create({
            name,
            email,
            password,
            role,
            attendees, // Adding attendees
            profilePhoto, // Adding profile photo

        });
        res.status(201).json({
            success: true,
            data: employee,
        });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};








// Employee Login
exports.loginEmployee = async (req, res) => {
    const { email, password } = req.body;

    try {
        const employee = await Employee.findOne({ email }).select('+password');

        if (!employee) {
            return res.status(404).json({ success: false, error: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, employee.password);

        if (!isMatch) {
            return res.status(401).json({ success: false, error: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: employee._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRE,
        });

        res.status(200).json({
             success: true,
              token,
              data: employee, // Include employee details

             });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Get All Employees
exports.getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json({ success: true, data: employees });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Get Employee by ID
exports.getEmployeeById = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);

        if (!employee) {
            return res.status(404).json({ success: false, error: 'Employee not found' });
        }

        res.status(200).json({ success: true, data: employee });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};


// Update Employee
exports.updateEmployee = async (req, res) => {
    try {
        const profilePhoto = req.file ? req.file.path : undefined; // Get Cloudinary URL

        const updateData = { ...req.body };
        if (profilePhoto) updateData.profilePhoto = profilePhoto; // Update profile photo if available

        const employee = await Employee.findByIdAndUpdate(req.params.id, updateData, {
            new: true,
            runValidators: true,
        });

        if (!employee) {
            return res.status(404).json({ success: false, error: 'Employee not found' });
        }

        res.status(200).json({ success: true, data: employee });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Delete Employee
exports.deleteEmployee = async (req, res) => {
    try {
        const employee = await Employee.findByIdAndDelete(req.params.id);

        if (!employee) {
            return res.status(404).json({ success: false, error: 'Employee not found' });
        }

        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
