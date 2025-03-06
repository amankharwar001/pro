import HeroSectionAboutPage from '@/models/aboutPage/HeroSection';


export default async function handler(req, res) {
  try {
    const { method } = req;

    if (method === 'POST') {
      const { id, title, heading, text, btn, btnLink } = req.body;

      // Validate required fields
      if ( !heading  ) {
        return res.status(400).json({
          success: false,
          message: ' (title, heading, text) are required.',
        });
      }

      try {
        let heroSection;

        if (id) {
          // Update existing record
          heroSection = await HeroSectionAboutPage.findById(id);

          if (!heroSection) {
            return res.status(404).json({
              success: false,
              message: 'HeroSection not found.',
            });
          }

          // Update the heroSection
          await heroSection.update({ title, heading, text, btn, btnLink });
          return res.status(200).json({
            success: true,
            message: 'HeroSection updated successfully!',
            data: heroSection,
          });
        } else {
          // Check if a heroSection already exists
          const existingHeroSection = await HeroSectionAboutPage.findOne();

          if (existingHeroSection) {
            // Update the existing record instead of creating a new one
            await existingHeroSection.update({ title, heading, text, btn, btnLink });
            return res.status(200).json({
              success: true,
              message: 'HeroSection updated successfully!',
              data: existingHeroSection,
            });
          } else {
            // Create new record
            heroSection = await HeroSectionAboutPage.create({
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
        }
      } catch (error) {
        console.error('API Error:', error);

        return res.status(500).json({
          success: false,
          message: 'An error occurred while processing the request.',
          error: error.message,
        });
      }
    } else if (method === 'GET') {
      // Fetch existing HeroSection data
      const heroSection = await HeroSectionAboutPage.findOne();

      if (!heroSection) {
        return res.status(404).json({
          success: false,
          message: 'HeroSection not found.',
        });
      }

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
