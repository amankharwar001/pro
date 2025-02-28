import multer from 'multer';
import path from 'path';
import fs from 'fs';
import sharp from 'sharp'; // Import sharp for image compression and resizing
import BlogImageData from '../models/blogPage/BlogImage.js';

// Multer storage configuration for dynamic directories based on referenceType
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const referenceType = req.params.referenceType; // Using referenceType in the route
        const uploadDir = path.resolve('uploads/blogImages', referenceType); // Create a directory per referenceType

        // Create the directory if it doesn't exist
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        cb(null, uploadDir); // Store files in the corresponding referenceType folder
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Ensure unique filenames
    },
});

const upload = multer({ storage });

// Middleware for image compression and resizing
const compressAndResizeImage = async (req, res, next) => {
    if (!req.file) return next(); // Skip if no file is uploaded

    try {
        const compressedFilePath = `${req.file.destination}/compressed-${req.file.filename}`;

        // Compress and resize the image
        await sharp(req.file.path)
            .resize({ width: 800 }) // Resize image to width 800px (you can adjust the size)
            .jpeg({ quality: 70 }) // Set JPEG quality to 70% to reduce size
            .toFile(compressedFilePath);

        // Replace the original file with the compressed and resized one
        fs.unlinkSync(req.file.path); // Remove the original file
        req.file.path = compressedFilePath;
        req.file.filename = `compressed-${req.file.filename}`;

        next(); // Proceed to the next middleware
    } catch (error) {
        console.error('Error compressing and resizing the image:', error.message);
        res.status(500).json({ success: false, error: 'Error compressing and resizing the image' });
    }
};

// Middleware to handle the image upload for the route
const blogUploadImage = upload.single('image'); // 'image' is the key for file upload

// Route to upload or update an image for a specific referenceType
const blogUploadImageRoute = async (req, res) => {
    const { referenceType } = req.params;
    const { altText, referenceId } = req.body; // altText, referenceId should be part of form data
    if (!req.file) {
        return res.status(400).json({
            success: false,
            error: 'No file uploaded',
            referenceType: referenceType,
            altText: altText,
        });
    }

    if (!altText || !referenceId || !referenceType) {
        return res.status(400).json({
            success: false,
            error: 'Missing altText, referenceId, or referenceType',
        });
    }

    // If no existing image, create a new record
    const imageUrl = `uploads/blogImages/${referenceType}/${req.file.filename}`;

    const imageRecord = await BlogImageData.create({
        filePath: imageUrl,
        altText: altText,
        referenceId: referenceId,
        referenceType: referenceType,
    });

    res.status(201).json({
        success: true,
        image: {
            id: imageRecord.id,
            filePath: imageRecord.filePath,
            altText: imageRecord.altText,
            referenceType: imageRecord.referenceType,
            referenceId: imageRecord.referenceId,
        },
    });
};

// Route to retrieve images based on referenceType and referenceId
const blogGetImages = async (req, res) => {
    const { referenceType } = req.params; // Get referenceType from the URL path
    const { referenceId } = req.query; // Get referenceId from the query string

    try {
        // If referenceType or referenceId is provided in either URL params or query params, use them
        if (!referenceType && !referenceId) {
            return res.status(400).json({ success: false, error: 'Either Reference Type or Reference ID is required' });
        }

        // Construct the filter object based on available values
        const filter = {};
        if (referenceType) filter.referenceType = referenceType;
        if (referenceId) filter.referenceId = referenceId;

        // Fetch images based on the constructed filter object
        const images = await BlogImageData.findAll({
            where: filter, // Use dynamic filter object
        });

        // If no images are found, return a not found response
        if (images.length === 0) {
            return res.status(404).json({ success: false, message: 'No image found for the provided reference' });
        }

        // Return the images in an array format
        res.status(200).json({
            success: true,
            images: images.map((image) => ({
                id: image.id,
                filePath: image.filePath,
                altText: image.altText,
                referenceType: image.referenceType,
                referenceId: image.referenceId,
            })),
        });
    } catch (error) {
        console.error('Error fetching image:', error.message);
        res.status(500).json({ success: false, error: error.message });
    }
};

// Export routes and middleware
export {
    blogUploadImage, // Export the uploadImage middleware
    compressAndResizeImage, // Export the compressAndResizeImage middleware
    blogUploadImageRoute, // Export the image upload route handler
    blogGetImages, // Export the image retrieval route handler
};
