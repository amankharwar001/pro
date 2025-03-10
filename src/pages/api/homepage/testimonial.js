

import Testimonial from "@/models/homePage/Testimonial";  

export default async function handler(req, res) {
  if (req.headers['x-system-key'] !== process.env.NEXT_PUBLIC_SYSTEM_KEY) {
    return res.status(401).json({ message: 'Unauthorized Access' });
  }
  if (req.method === 'GET') {
    try {
      const section = await Testimonial.findOne();
      if (!section) {
        return res.status(404).json({ success: false, message: 'Section not found' });
      }

      return res.status(200).json({
        success: true,
        data: section, // Sequelize automatically returns JSON for 'info'
      });

    } catch (error) {
      console.error("Error during GET operation:", error);
      return res.status(500).json({ success: false, message: error.message });
    }
  } 
  
  else if (req.method === 'PUT') {
    try {
      const { heading, content, info } = req.body;

      if (!heading || !content || !Array.isArray(info)) {
        return res.status(400).json({ success: false, message: 'All fields (heading, content, info) are required' });
      }

      let section = await Testimonial.findOne();
      if (!section) {
        return res.status(404).json({ success: false, message: 'Section not found to update' });
      }

      section.heading = heading;
      section.content = content;
      section.info = info; // Sequelize handles JSON automatically
      await section.save();

      return res.status(200).json({
        success: true,
        message: 'Section updated successfully',
        data: section,
      });

    } catch (error) {
      console.error("Error during PUT operation:", error);
      return res.status(500).json({ success: false, message: error.message });
    }
  } 
  
  else if (req.method === 'POST') {
    try {
      const { heading, content, info } = req.body;

      if (!heading || !content || !Array.isArray(info)) {
        return res.status(400).json({ success: false, message: 'All fields (heading, content, info) are required' });
      }

      let section = await Testimonial.findOne();
      if (section) {
        return res.status(400).json({ success: false, message: 'Section already exists. Use PUT to update it.' });
      }

      section = await Testimonial.create({ heading, content, info });

      return res.status(201).json({
        success: true,
        message: 'Section created successfully',
        data: section,
      });

    } catch (error) {
      console.error("Error during POST operation:", error);
      return res.status(500).json({ success: false, message: error.message });
    }
  } 
  
  else {
    res.setHeader('Allow', ['GET', 'PUT', 'POST']);
    return res.status(405).json({ success: false, message: `Method ${req.method} not allowed` });
  }
}
