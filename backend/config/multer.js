    // backend/config/multer.js

    const multer = require('multer');
    const { CloudinaryStorage } = require('multer-storage-cloudinary');
    const cloudinary = require('./cloudinaryConfig');

    const storage = new CloudinaryStorage({
        cloudinary: cloudinary,
        params: {
            folder: 'employee_profiles',
            allowed_formats: ['jpg', 'png'],
        },
    });

    const upload = multer({ storage });

    module.exports = upload;
