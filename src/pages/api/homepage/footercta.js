// pages/api/FooterCta.js
import FooterCta from "@/models/homePage/FooterCta";  // Import your Sequelize model

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // Fetch the first record from FooterCta
    try {
      const section = await FooterCta.findOne();
      if (!section) {
        return res.status(404).json({ success: false, message: 'Section not found' });
      }
      return res.status(200).json({ success: true, data: section });
    } catch (error) {
      console.error("Error during GET operation:", error);
      return res.status(500).json({ success: false, message: error.message });
    }
  } else if (req.method === 'PUT') {
    // Update the FooterCta record
    try {
      const { heading, content, btn, btnLink } = req.body;

      // Validate input data
      if (!heading || !content || !btn || !btnLink) {
        return res.status(400).json({ success: false, message: 'All fields (heading, content, btn, btnLink) are required' });
      }

      // Find the existing record (there should only be one)
      let section = await FooterCta.findOne();
      if (!section) {
        return res.status(404).json({ success: false, message: 'Section not found to update' });
      }

      // Update the existing record
      section.heading = heading;
      section.content = content;
      section.btn = btn;
      section.btnLink = btnLink;
      await section.save();

      return res.status(200).json({ success: true, message: 'Section updated successfully', data: section });

    } catch (error) {
      console.error("Error during PUT operation:", error);
      return res.status(500).json({ success: false, message: error.message });
    }
  } else if (req.method === 'POST') {
    // Create a new FooterCta record only if it doesn't exist
    try {
      const { heading, content, btn, btnLink } = req.body;

      // Validate input data
      if (!heading || !content || !btn || !btnLink) {
        return res.status(400).json({ success: false, message: 'All fields (heading, content, btn, btnLink) are required' });
      }

      // Check if the FooterCta record already exists
      let section = await FooterCta.findOne();
      if (section) {
        return res.status(400).json({ success: false, message: 'Section already exists. Use PUT to update it.' });
      }

      // Create a new record only if one doesn't exist
      section = await FooterCta.create({ heading, content, btn, btnLink });

      return res.status(201).json({ success: true, message: 'Section created successfully', data: section });

    } catch (error) {
      console.error("Error during POST operation:", error);
      return res.status(500).json({ success: false, message: error.message });
    }
  } else {
    // If method is not allowed
    res.setHeader('Allow', ['GET', 'PUT', 'POST']);
    return res.status(405).json({ success: false, message: `Method ${req.method} not allowed` });
  }
}




// PUT GET POST
// {
//     "heading": "New Section Heading",
//     "content": "Content for the new aman kharwar.",
//     "btn": "Learn More",
//     "btnLink": "/learn-more"
//   }