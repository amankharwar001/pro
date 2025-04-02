

import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import Section6 from '../../models/homePage/Section6.js';

const router = express.Router();

// Multer Storage Configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.resolve('uploads/homeSection6');
        fs.mkdirSync(uploadDir, { recursive: true });
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

// **📍 Get Section 6 Data**
router.get('/api/admin/home/section6', async (req, res) => {
    try {
        const section = await Section6.findOne();
        if (!section) {
            return res.status(404).json({ success: false, error: 'Section 6 not found' });
        }
        return res.status(200).json({ success: true, section });
    } catch (error) {
        console.error('Error fetching section:', error);
        return res.status(500).json({ success: false, error: error.message });
    }
});

// router.post('/api/admin/home/section6', upload.array('images', 10), async (req, res) => {
//     try {
//         console.log('Received request:', req.body);

//         const { heading, content, bottomText, cards } = req.body;
//         const parsedCards = typeof cards === 'string' ? JSON.parse(cards) : cards;

//         if (!Array.isArray(parsedCards)) {
//             return res.status(400).json({ success: false, error: 'Cards must be an array' });
//         }

//         // ✅ Correct Image Mapping
//         parsedCards.forEach((card, index) => {
//             if (req.files[index]) {
//                 card.image = `/uploads/homeSection6/${req.files[index].filename}`;
//             }
//         });

//         const sectionData = { heading, content, bottomtext: bottomText, card: parsedCards };
//         let section = await Section6.findOne();

//         if (section) {
//             await Section6.update(sectionData, { where: { id: section.id } });
//             return res.status(200).json({ success: true, message: 'Section 6 updated successfully' });
//         } else {
//             section = await Section6.create(sectionData);
//             return res.status(201).json({ success: true, message: 'Section 6 created successfully', section });
//         }
//     } catch (error) {
//         console.error('Error saving section:', error);
//         return res.status(500).json({ success: false, error: error.message });
//     }
// });


router.post('/api/admin/home/section6',  upload.any(), async (req, res) => {
    try {
        console.log('Received request:', req.body);

        const { heading, content, bottomText, cards } = req.body;
        const parsedCards = typeof cards === 'string' ? JSON.parse(cards) : cards;

        if (!Array.isArray(parsedCards)) {
            return res.status(400).json({ success: false, error: 'Cards must be an array' });
        }

        // ✅ Ensure files are mapped correctly to respective cards
        let fileIndex = 0;
        parsedCards.forEach((card) => {
            if (card.image && typeof card.image === "object" && Object.keys(card.image).length === 0) {
                // Agar image empty object hai to replace karo
                if (req.files[fileIndex]) {
                    card.image = `/uploads/homeSection6/${req.files[fileIndex].filename}`;
                    fileIndex++; // ✅ Move to next file only when assigned
                }
            }
        });

        const sectionData = { heading, content, bottomtext: bottomText, card: parsedCards };
        let section = await Section6.findOne();

        if (section) {
            await Section6.update(sectionData, { where: { id: section.id } });
            return res.status(200).json({ success: true, message: 'Section 6 updated successfully' });
        } else {
            section = await Section6.create(sectionData);
            return res.status(201).json({ success: true, message: 'Section 6 created successfully', section });
        }
    } catch (error) {
        console.error('Error saving section:', error);
        return res.status(500).json({ success: false, error: error.message });
    }
});


export default router;
