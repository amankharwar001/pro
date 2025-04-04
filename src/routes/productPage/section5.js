// import express from 'express';
// import multer from 'multer';
// import path from 'path';
// import fs from 'fs';
// import section5Product from '../../models/productPage/Section5Product.js';

//  const router = express.Router();

// // Middleware for authentication
// router.use((req, res, next) => {
//     if (req.headers['x-system-key'] !== process.env.SYSTEM_KEY) {
//         return res.status(401).json({ success: false, error: 'Unauthorized Access' });
//     }
//     next();
// });

// // Multer Storage Configuration
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         const uploadDir = path.resolve('uploads/productSection5');
//         fs.mkdirSync(uploadDir, { recursive: true });
//         cb(null, uploadDir);
//     },
//     filename: (req, file, cb) => {
//         cb(null, `${Date.now()}-${file.originalname}`);
//     },
// });

// const upload = multer({ storage });

// // **📍 Get Section 5 Data**
// router.get('/api/admin/product/section5/:heroSectionId', async (req, res) => {
//     try {
//         const { heroSectionId } = req.params;
//         const section = await section5Product.findOne({ where: { heroSectionId } });
        
//         if (!section) {
//             return res.status(404).json({ success: false, error: 'No data found' });
//         }
//         return res.status(200).json({ success: true, section });
//     } catch (error) {
//         console.error('Error fetching section:', error);
//         return res.status(500).json({ success: false, error: error.message });
//     }
// });

// // **📍 Create or Update Section 5 Entry**
// router.post('/api/admin/product/section5/:heroSectionId', upload.any(), async (req, res) => {
//     try {
//         const { heroSectionId } = req.params;
//         const { heading, text, info } = req.body;
//         const parsedInfo = typeof info === 'string' ? JSON.parse(info) : info;

//         if (!heading || !text || !Array.isArray(parsedInfo)) {
//             return res.status(400).json({ success: false, error: 'All fields are required and info must be an array' });
//         }

//         let fileIndex = 0;
//         parsedInfo.forEach((item) => {
//             if (item.image && typeof item.image === "object" && Object.keys(item.image).length === 0) {
//                 if (req.files[fileIndex]) {
//                     item.image = `/uploads/productSection5/${req.files[fileIndex].filename}`;
//                     fileIndex++;
//                 }
//             }
//         });

//         let section = await section5Product.findOne({ where: { heroSectionId } });

//         if (section) {
//             await section.update({ heading, text, info: parsedInfo });
//             return res.status(200).json({ success: true, message: 'Section 5 updated successfully', section });
//         } else {
//             section = await section5Product.create({ heading, text, heroSectionId, info: parsedInfo });
//             return res.status(201).json({ success: true, message: 'Section 5 created successfully', section });
//         }
//     } catch (error) {
//         console.error('Error handling section:', error);
//         return res.status(500).json({ success: false, error: error.message });
//     }
// });

// // **📍 Delete Section 5 Entry**
// router.delete('/api/admin/product/section5/:heroSectionId', async (req, res) => {
//     try {
//         const { heroSectionId } = req.params;
//         const section = await section5Product.findOne({ where: { heroSectionId } });
        
//         if (!section) {
//             return res.status(404).json({ success: false, error: 'Section not found' });
//         }

//         await section.destroy();
//         return res.status(200).json({ success: true, message: 'Section 5 deleted successfully' });
//     } catch (error) {
//         console.error('Error deleting section:', error);
//         return res.status(500).json({ success: false, error: error.message });
//     }
// });

// export default router;







import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import section5Product from '../../models/productPage/Section5Product.js';

 const router = express.Router();


// Multer Storage Configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.resolve('uploads/productSection5');
        fs.mkdirSync(uploadDir, { recursive: true });
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

// **📍 Get Section 5 Data**
router.get('/api/admin/product/section5/:heroSectionId', async (req, res) => {
    try {
        const { heroSectionId } = req.params;
        const section = await section5Product.findOne({ where: { heroSectionId } });
        
        if (!section) {
            return res.status(404).json({ success: false, error: 'No data found' });
        }
        return res.status(200).json({ success: true, section });
    } catch (error) {
        console.error('Error fetching section:', error);
        return res.status(500).json({ success: false, error: error.message });
    }
});

// **📍 Create or Update Section 5 Entry**
router.post('/api/admin/product/section5/:heroSectionId', upload.any(), async (req, res) => {
    try {
        const { heroSectionId } = req.params;
        const { heading, text, info } = req.body;
        const parsedInfo = typeof info === 'string' ? JSON.parse(info) : info;

        if (!heading || !text || !Array.isArray(parsedInfo)) {
            return res.status(400).json({ success: false, error: 'All fields are required and info must be an array' });
        }

        let fileIndex = 0;
        parsedInfo.forEach((item) => {
            if (item.image && typeof item.image === "object" && Object.keys(item.image).length === 0) {
                if (req.files[fileIndex]) {
                    item.image = `/uploads/productSection5/${req.files[fileIndex].filename}`;
                    fileIndex++;
                }
            }
        });

        let section = await section5Product.findOne({ where: { heroSectionId } });

        if (section) {
            await section.update({ heading, text, info: parsedInfo });
            return res.status(200).json({ success: true, message: 'Section 5 updated successfully', section });
        } else {
            section = await section5Product.create({ heading, text, heroSectionId, info: parsedInfo });
            return res.status(201).json({ success: true, message: 'Section 5 created successfully', section });
        }
    } catch (error) {
        console.error('Error handling section:', error);
        return res.status(500).json({ success: false, error: error.message });
    }
});

// **📍 Delete Section 5 Entry**
router.delete('/api/admin/product/section5/:heroSectionId', async (req, res) => {
    try {
        const { heroSectionId } = req.params;
        const section = await section5Product.findOne({ where: { heroSectionId } });
        
        if (!section) {
            return res.status(404).json({ success: false, error: 'Section not found' });
        }

        await section.destroy();
        return res.status(200).json({ success: true, message: 'Section 5 deleted successfully' });
    } catch (error) {
        console.error('Error deleting section:', error);
        return res.status(500).json({ success: false, error: error.message });
    }
});

export default router;







