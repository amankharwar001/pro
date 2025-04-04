import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import section4Product from '../../models/productPage/Section4Product.js';

const router = express.Router();

// Multer Storage Configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.resolve('uploads/productSection4');
        fs.mkdirSync(uploadDir, { recursive: true });
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

// **📍 Get Section 4 Data**
router.get('/api/admin/product/section4/:heroSectionId', async (req, res) => {
    try {
        const { heroSectionId } = req.params;
        const section = await section4Product.findOne({ where: { heroSectionId } });
        
        if (!section) {
            return res.status(404).json({ success: false, error: 'No data found' });
        }
        return res.status(200).json({ success: true, section });
    } catch (error) {
        console.error('Error fetching section:', error);
        return res.status(500).json({ success: false, error: error.message });
    }
});

// **📍 Create or Update Section 4 Entry**
router.post('/api/admin/product/section4/:heroSectionId', upload.any(), async (req, res) => {
    try {
        const { heroSectionId } = req.params;
        const { section4 } = req.body;
        const parsedSection4 = typeof section4 === 'string' ? JSON.parse(section4) : section4;

        if (!Array.isArray(parsedSection4)) {
            return res.status(400).json({ success: false, error: 'section4 must be an array' });
        }

        let fileIndex = 0;
        parsedSection4.forEach((item) => {
            if (item.image && typeof item.image === "object" && Object.keys(item.image).length === 0) {
                if (req.files[fileIndex]) {
                    item.image = `/uploads/productSection4/${req.files[fileIndex].filename}`;
                    fileIndex++;
                }
            }
        });

        let section = await section4Product.findOne({ where: { heroSectionId } });

        if (section) {
            await section.update({ section4: parsedSection4 });
            return res.status(200).json({ success: true, message: 'Section 4 updated successfully', section });
        } else {
            section = await section4Product.create({ heroSectionId, section4: parsedSection4 });
            return res.status(201).json({ success: true, message: 'Section 4 created successfully', section });
        }
    } catch (error) {
        console.error('Error handling section:', error);
        return res.status(500).json({ success: false, error: error.message });
    }
});

// **📍 Delete Section 4 Entry**
router.delete('/api/admin/product/section4/:heroSectionId', async (req, res) => {
    try {
        const { heroSectionId } = req.params;
        const section = await section4Product.findOne({ where: { heroSectionId } });
        
        if (!section) {
            return res.status(404).json({ success: false, error: 'Section not found' });
        }

        await section.destroy();
        return res.status(200).json({ success: true, message: 'Section 4 deleted successfully' });
    } catch (error) {
        console.error('Error deleting section:', error);
        return res.status(500).json({ success: false, error: error.message });
    }
});

export default router;
