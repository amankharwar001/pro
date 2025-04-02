import express from 'express';
import next from 'next';
import sequelize from './src/db/dbConnect.js';  // Database connection
// import section6Routes from './src/routes/homePage/section6.js';
import section6 from './src/routes/homePage/section6.js'
// single image uploader
import { uploadImageRoute, getImages, uploadImage, deleteImage,updateImage } from './src/routes/imageRoutes.js';  // Importing image routes

// blog images uploader
import {
    blogUploadImage,       
    blogUploadImageRoute,  
    blogGetImages,
    
} from './src/routes/blogImages.js';  

// multi images uploader
import {
    handleMultipleImageUploads,
    uploadMultipleImagesRoute,
    fetchImagesBySection,
    updateImageAltText,
    deleteImageById,
} from './src/routes/multiImageRoutes.js';  
import syncDatabase from './src/db/syncDatabase.js';

import fs from 'fs';
import path from 'path';


const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const server = express();
await syncDatabase() // sync all tables

// Middleware
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
// Serve images from the dynamic upload directory
const serveImages = express.static('uploads');
// Error handling middleware for better response on invalid file uploads
server.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        return res.status(400).json({ success: false, error: 'Multer error: ' + err.message });
    } else if (err) {
        return res.status(500).json({ success: false, error: 'Server error: ' + err.message });
    }
    next();
});
server.use(section6);

// single Image upload here
// server.post('/api/upload/:section', uploadImage, uploadImageRoute);
server.post('/api/upload/:referenceType', uploadImage, uploadImageRoute);
server.get('/api/images/:referenceType', getImages);
server.put('/api/images/update/:referenceType/:id', uploadImage, updateImage);
server.delete('/api/images/:id', deleteImage);

// single Image upload here
// server.post('/api/upload/:section', uploadImage, uploadImageRoute);
server.post('/api/blogupload/:referenceType', blogUploadImage, blogUploadImageRoute);
server.get('/api/blog-images/:referenceType', blogGetImages);


//multiple image upload here
server.post('/api/multiupload/:section', handleMultipleImageUploads, uploadMultipleImagesRoute);
server.get('/api/multiimages/:section', fetchImagesBySection);
server.put('/api/multiimages/:id', updateImageAltText);
server.delete('/api/multiimages/:id', deleteImageById);



// Serve images from the dynamic upload directory
server.use('/uploads', serveImages);

// Next.js handler for pages
server.all('*', (req, res) => handle(req, res));

// Ensure that the upload directories exist
const ensureUploadDirExists = (section) => {
    const uploadDir = path.resolve('uploads', section);
    if (!fs.existsSync(uploadDir)) {
        
        fs.mkdirSync(uploadDir, { recursive: true });
    }
};

// Start server
app.prepare().then(() => {
    sequelize.sync().then(() => {
        const port = 3000;  // You can change the port if needed

        // Ensure upload directories exist for the 'general' section (or any section you expect)
        ensureUploadDirExists('general');  // You might want to loop through all possible sections if necessary

        server.listen(port, () => {
            console.log(
                `> Ready website on port:${port} in ${dev ? 'development' : 'production'} mode`
            );
        });
    }).catch((error) => {
        console.error('Error syncing database:', error.message);
    });
});

