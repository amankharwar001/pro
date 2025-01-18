import HeroSection from '@/models/homePage/HeroSection.js'; // Ensure the path is correct
import SingleImage from '@/models/homePage/ImagesData';

export default async function handler(req, res) {
  try {
    if (req.method === 'POST') {
      const { heading, text, btn, btnLink } = req.body;

      // Validate required fields
      if (!heading || !text || !btn || !btnLink) {
        return res.status(400).json({
          success: false,
          message: 'All fields (heading, text, btn, btnLink) are required.',
        });
      }

      // Check if a HeroSection already exists
      let heroSection = await HeroSection.findOne();

      if (heroSection) {
        // If it exists, update it
        await heroSection.update({ heading, text, btn, btnLink });

        return res.status(200).json({
          success: true,
          message: 'HeroSection updated successfully!',
          data: heroSection,
        });
      } else {
        // If not, create a new HeroSection
        heroSection = await HeroSection.create({ heading, text, btn, btnLink });

        return res.status(201).json({
          success: true,
          message: 'HeroSection created successfully!',
          data: heroSection,
        });
      }

    } else if (req.method === 'PUT') {
      const { id, heading, text, btn, btnLink } = req.body;

      // Ensure required fields are present
      if (!id || !heading || !text || !btn || !btnLink) {
        return res.status(400).json({
          success: false,
          message: 'All fields (id, heading, text, btn, btnLink) are required.',
        });
      }

      // Find the HeroSection by its ID
      const heroSection = await HeroSection.findByPk(id);
      if (!heroSection) {
        return res.status(404).json({
          success: false,
          message: 'HeroSection not found.',
        });
      }

      // Update the HeroSection
      await heroSection.update({ heading, text, btn, btnLink });

      return res.status(200).json({
        success: true,
        message: 'HeroSection updated successfully!',
        data: heroSection,
      });

    } else if (req.method === 'GET') {
      const heroSections = await HeroSection.findOne()

      return res.status(200).json({
        success: true,
        data: heroSections,
      });

    } else {
      return res.status(405).json({
        success: false,
        message: `Method ${req.method} Not Allowed`,
      });
    }
  } catch (error) {
    console.error('API Error:', error);

    return res.status(500).json({
      success: false,
      message: 'An error occurred while processing the request.',
      error: error.message,
    });
  }
}
