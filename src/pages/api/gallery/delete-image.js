// pages/api/deleteImage.js
import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { imagePath } = req.body;

    // Make sure the path is within the public/uploads folder
    const fullPath = path.join(process.cwd(), imagePath);

    try {
      // Check if the file exists
      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath); // Delete the file
        return res.status(200).json({ message: 'Image deleted successfully' });
      } else {
        return res.status(404).json({ message: 'Image not found' });
      }
    } catch (error) {
      return res.status(500).json({ message: 'Error deleting image', error });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
