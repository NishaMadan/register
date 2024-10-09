const multer = require('multer');
const path = require('path');
const UserFile = require('../models/UserFile');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');  
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); 
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'application/pdf' || file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only images and PDF files are allowed'), false);
    }
};

const upload = multer({ storage, fileFilter });

router.post('/upload', upload.single('file'), async (req, res) => {
    const { companyName, requirementDescription } = req.body;
    const userId = req.userId;  // Assuming you extract user ID from JWT

    if (!req.file) {
        return res.status(400).json({ message: 'File upload failed' });
    }

    try {
        const newFile = new UserFile({
            userId,
            companyName,
            requirementDescription,
            fileName: req.file.filename,
            filePath: req.file.path,
            fileType: req.file.mimetype
        });

        await newFile.save();
        res.status(201).json({ message: 'File uploaded successfully', file: newFile });
    } catch (error) {
        console.error('File upload error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
