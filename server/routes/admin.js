
const User = require('../models/User');
const UserFile = require('../models/UserFile');
const express = require('express');
const path = require('path');
const router = express.Router();

// router.get('/getfiles', async (req, res) => {
//     try {
//         //const files = await UserFile.find().populate('userId', 'name email');  
//         const files = await UserFile.find({ modified: false });
//         //res.status(200).json(files); 
//         res.json(files);
//     } catch (error) {
//         console.error('Failed to retrieve files:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });
router.get('/getfiles', async (req, res) => {
    try {
        // Fetch all files without the modified filter to test
        const files = await UserFile.find();
        res.json(files);
    } catch (error) {
        console.error('Failed to retrieve files:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


router.get('/download/:fileId', async (req, res) => {
    const { fileId } = req.params;

    try {
        const file = await UserFile.findById(fileId);
        if (file) {
            res.download(file.path, file.originalname);
          } else {
            res.status(404).json({ message: 'File not found' });
          }
        } catch (err) {
          res.status(500).json({ error: err.message });
        }
      });
//         if (!file) {
//             return res.status(404).json({ message: 'File not found' });
//         }

//         res.download(file.filePath, file.fileName, (err) => {
//             if (err) {
//                 console.error('File download error:', err);
//                 res.status(500).json({ message: 'Failed to download file' });
//             }
//         });
//     } catch (error) {
//         console.error('Error fetching file:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });
router.post('/modify/:id', async (req, res) => {
    try {
      const file = await UserFile.findById(req.params.id);
      if (file) {
        // Simulating modification
        file.modified = true;
        await file.save();
        res.json({ message: 'File modified successfully', file });
      } else {
        res.status(404).json({ message: 'File not found' });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  module.exports = router;