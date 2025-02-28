import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import SingleImage from '../models/homePage/ImagesData.js';  // Sequelize model for SingleImage

// Multer storage configuration for dynamic directories based on referenceType
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const referenceType = req.params.referenceType; // Using referenceType in the route
        const uploadDir = path.resolve('uploads', referenceType);  // Create a directory per referenceType

        // Create the directory if it doesn't exist
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        cb(null, uploadDir); // Store files in the corresponding referenceType folder
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);  // Ensure unique filenames
    },
});

const upload = multer({ storage });

// Middleware to handle the image upload for the route
const uploadImage = upload.single('image');  // 'image' is the key for file upload

// Route to upload or update an image for a specific referenceType
const uploadImageRoute = async (req, res) => {
    const { referenceType } = req.params;  // Get referenceType from the route
    const { altText=null, referenceId } = req.body;  // altText, referenceId should be part of form data

    if (!req.file) {
        return res.status(400).json({
            success: false,
            error: 'No file uploaded',
            referenceType: referenceType,
           
        });
    }

    if ( !referenceId || !referenceType) {
        return res.status(400).json({
            success: false,
            error: 'Missing referenceId, or referenceType',
        });
    }

    try {
        // Check if an image already exists for the referenceType
        const existingImage = await SingleImage.findOne({ where: { referenceType, referenceId } });

        if (existingImage) {
            // Delete the old image file from the filesystem
            const oldFilePath = path.resolve(existingImage.filePath);
            if (fs.existsSync(oldFilePath)) {
                fs.unlinkSync(oldFilePath);  // Delete the file from the file system
            }

            // Update the image record in the database
            existingImage.filePath = `uploads/${referenceType}/${req.file.filename}`;
            existingImage.altText = altText;
            await existingImage.save();  // Save the updated record

            return res.status(200).json({
                success: true,
                image: {
                    id: existingImage.id,
                    filePath: existingImage.filePath,
                    altText: existingImage.altText,
                    referenceType: existingImage.referenceType,
                    referenceId: existingImage.referenceId,
                },
            });
        }

        // If no existing image, create a new record
        const imageUrl = `uploads/${referenceType}/${req.file.filename}`;

        const imageRecord = await SingleImage.create({
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

    } catch (error) {
        console.error('Error uploading image:', error.message);
        res.status(500).json({ success: false, error: error.message, });
    }
};


const getImages = async (req, res) => {
    const { referenceType } = req.params;  // Get referenceType from the URL path
    const { referenceId } = req.query;    // Get referenceId from the query string

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
        const images = await SingleImage.findAll({
            where: filter,  // Use dynamic filter object
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


// Route to update an existing image
const updateImage = async (req, res) => {
    const { referenceType, id } = req.params; // Get referenceType and image ID from URL params
    const { altText=null } = req.body; // altText should be part of the request body

    try {
        // Find the image record in the database
        const image = await SingleImage.findByPk(id);

        if (!image) {
            return res.status(404).json({
                success: false,
                error: 'Image not found',
            });
        }

        // If a new image file is uploaded, replace the old file
        if (req.file) {
            const oldFilePath = path.resolve(image.filePath);

            // Delete the old image file
            if (fs.existsSync(oldFilePath)) {
                fs.unlinkSync(oldFilePath);
            }

            // Update the file path to the new image
            image.filePath = `uploads/${referenceType}/${req.file.filename}`;
        }

        // Update alt text if provided
        if (altText) {
            image.altText = altText;
        }

        // Save the updated image record to the database
        await image.save();

        res.status(200).json({
            success: true,
            image: {
                id: image.id,
                filePath: image.filePath,
                altText: image.altText,
                referenceType: image.referenceType,
                referenceId: image.referenceId,
            },
        });
    } catch (error) {
        console.error('Error updating image:', error.message);
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};






// Route to delete an image by ID
const deleteImage = async (req, res) => {
    const { id } = req.params;  // Get image ID from URL params

    try {
        // Find the image record in the database
        const image = await SingleImage.findByPk(id);

        if (!image) {
            return res.status(404).json({
                success: false,
                error: 'Image not found',
            });
        }

        // Delete the image file from the filesystem
        const filePath = path.resolve(image.filePath);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);  // Delete the file from the file system
        } else {
            console.warn(`File not found at: ${filePath}`);
        }

        // Delete the image record from the database
        await image.destroy();

        res.status(200).json({
            success: true,
            message: 'Image deleted successfully',
        });
    } catch (error) {
        console.error('Error deleting image:', error.message);
        res.status(500).json({ success: false, error: error.message });
    }
};

// Export routes and middleware
export {
    uploadImage,       // Export the uploadImage middleware
    uploadImageRoute,  // Export the image upload route handler
    updateImage,
    getImages,
    deleteImage,       // Export the delete image function
};


