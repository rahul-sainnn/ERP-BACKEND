const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter employee name'],
    },
    email: {
        type: String,
        required: [true, 'Please enter employee email'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please enter employee password'],
        minlength: 6,
        select: false,
    },
    role: {
        type: String,
        enum: ['employee', 'manager', 'admin'],
        default: 'employee',
    },

    attendees: [
        {
            type: String, // You can define the type of attendee, e.g., String or a reference to another model
            
        }
    ],
    profilePhoto: {
        type: String, // URL of the profile photo
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Password encryption middleware
employeeSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
