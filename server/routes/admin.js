// Admin file routes
router.get('/admin/files', adminAuth, async (req, res) => {
    try {
        const files = await UserFile.find().populate('userId', 'name email');  
        res.status(200).json(files);
    } catch (error) {
        console.error('Failed to retrieve files:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/admin/files/download/:fileId', adminAuth, async (req, res) => {
    const { fileId } = req.params;

    try {
        const file = await UserFile.findById(fileId);
        if (!file) {
            return res.status(404).json({ message: 'File not found' });
        }

        res.download(file.filePath, file.fileName, (err) => {
            if (err) {
                console.error('File download error:', err);
                res.status(500).json({ message: 'Failed to download file' });
            }
        });
    } catch (error) {
        console.error('Error fetching file:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
