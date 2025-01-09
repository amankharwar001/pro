import HeroSectionPrivacyPage from '@/models/privacyPage/HeroSection';

export default async function handler(req, res) {
  try {
    if (req.method === 'POST') {
      const { title, heading, text, btn, btnLink } = req.body;

      // Validate required fields
      if (!title || !heading || !text || !btn || !btnLink) {
        return res.status(400).json({
          success: false,
          message: 'All fields (title, heading, text, btn, btnLink) are required.',
        });
      }

      // Check if a record already exists
      let heroSection = await HeroSectionPrivacyPage.findOne();

      if (heroSection) {
        // Update the existing record
        await heroSection.update({ title, heading, text, btn, btnLink });

        return res.status(200).json({
          success: true,
          message: 'HeroSection updated successfully!',
          data: heroSection,
        });
      } else {
        // Create a new record
        heroSection = await HeroSectionPrivacyPage.create({
          title,
          heading,
          text,
          btn,
          btnLink,
        });

        return res.status(201).json({
          success: true,
          message: 'HeroSection created successfully!',
          data: heroSection,
        });
      }
    } else if (req.method === 'GET') {
      // Fetch the existing HeroSection data
      const heroSection = await HeroSectionPrivacyPage.findOne();

      return res.status(200).json({
        success: true,
        data: heroSection,
      });
    } else {
      // Handle unsupported methods
      return res.status(405).json({
        success: false,
        message: `Method ${req.method} Not Allowed.`,
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
