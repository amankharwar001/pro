

import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import Image from '../models/homePage/ImagesData.js';  // Sequelize model for Image
import { Op } from 'sequelize';

// Multer storage configuration for dynamic directories
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const section = req.params.section;  // Default to 'general' if no section is provided
        const uploadDir = path.resolve('uploads', section);

        // Create the directory if it doesn't exist
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        cb(null, uploadDir);  // Store files in the corresponding section folder
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);  // Ensure unique filenames
    },
});

const upload = multer({ storage });

// Middleware to handle multiple image uploads for the route
const handleMultipleImageUploads = upload.array('images');  // 'images' is the key for multiple file upload
const handleSingleImageUpload=upload.single('image')
// Route to upload or update multiple images for a specific section (Create)
const uploadMultipleImagesRoute = async (req, res) => {
    const { section } = req.params;  // Get section from the dynamic route
    const { altText } = req.body;  // altText should be part of form data in the request

  
    if (!req.files || req.files.length === 0) {
        return res.status(400).json({
            success: false,
            error: 'No files uploaded',
            section: section,
            altText: altText,
        });
    }

    try {
        // Store each image file
        const imageRecords = [];

        for (const file of req.files) {
            const imageUrl = `uploads/${section}/${file.filename}`;

            // Create a new record for each uploaded image
            const imageRecord = await Image.create({
                filePath: imageUrl,
                altText: altText,
                section: section,
            });

            imageRecords.push(imageRecord);
        }

        res.status(201).json({
            success: true,
            images: imageRecords.map((image) => ({
                id: image.id,
                filePath: image.filePath,
                altText: image.altText,
                section: image.section,
            })),
        });

    } catch (error) {
        console.error('Error uploading images:', error.message);
        res.status(500).json({ success: false, error: error.message,filePath: imageUrl,
            altText: altText,
            section: section, });
    }
};


// Route to fetch images for a specific section (Read)
const fetchImagesBySection = async (req, res) => {
    const { section } = req.params;

    
    try {
        // Fetch images from the database for the specific section
        const images = await Image.findAll({
            where: {
                section: {
                    [Op.iLike]: section,  // Case-insensitive match
                },
            },
        });

        // Check if any images were found
        if (images.length === 0) {
            return res.status(404).json({
                success: false,
                message: `No images found for section: ${section}`,
            });
        }

        // Return the list of images in the response
        res.status(200).json({
            success: true,
            images: images.map((image) => ({
                id: image.id,
                filePath: image.filePath,
                altText: image.altText,
                section: image.section,
            })),
        });
    } catch (error) {
        console.error('Error fetching images:', error.message);
        res.status(500).json({ success: false, error: error.message });
    }
};


const updateImageAltText = async (req, res) => {
    const { id } = req.params; // Extract image id from params
    const { altText } = req.body; // Extract altText from the request body

    try {
        // Validate input
        if (!id || !altText) {
            return res.status(400).json({
                success: false,
                message: 'ID and altText are required',
            });
        }

        // Use `findByPk` to find the image by primary key
        const image = await Image.findByPk(id);

        if (!image) {
            return res.status(404).json({
                success: false,
                message: 'Image not found',
            });
        }

        // Update only the `altText` field
        image.altText = altText;

        // Save the changes
        await image.save();

        return res.status(200).json({
            success: true,
            message: 'Alt text updated successfully',
            data: image,
        });
    } catch (error) {
        console.error('Error updating alt text:', error.message);
        return res.status(500).json({
            success: false,
            message: 'Error updating alt text',
            error: error.message,
        });
    }
};






// Route to delete an image by ID (Delete)
const deleteImageById = async (req, res) => {
    const { id } = req.params;  // Get image ID from URL params

    try {
        // Find the image record in the database
        const image = await Image.findByPk(id);

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
    handleMultipleImageUploads,  // Export the new middleware name
    uploadMultipleImagesRoute,   // Export the new route handler
    fetchImagesBySection,        // Export the new fetch route
    updateImageAltText,          // Export the update image route
    handleSingleImageUpload,
    deleteImageById,             // Export the new delete image function
};

















