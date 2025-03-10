import FooterCTA from '@/models/adminSetting/footerCta';

export default async function handler(req, res) {
  if (req.headers['x-system-key'] !== process.env.NEXT_PUBLIC_SYSTEM_KEY) {
    return res.status(401).json({ message: 'Unauthorized Access' });
  }
  try {
    if (req.method === 'POST') {
      const { heading, text, btn, btnLink } = req.body;

      // Validate required fields
      if (!heading || !text ) {
        return res.status(400).json({
          success: false,
          message: ' (heading, text,) are required.',
        });
      }

      // Check if a HeroSection already exists
      let footerCta = await FooterCTA.findOne();

      if (footerCta) {
        // If it exists, update it
        await footerCta.update({ heading, text, btn, btnLink });

        return res.status(200).json({
          success: true,
          message: 'footerCta updated successfully!',
          data: footerCta,
        });
      } else {
        // If not, create a new footerCta
        footerCta = await FooterCTA.create({ heading, text, btn, btnLink });

        return res.status(201).json({
          success: true,
          message: 'footerCta created successfully!',
          data: footerCta,
        });
      }

    } else if (req.method === 'PUT') {
      const { id, heading, text, btn, btnLink } = req.body;

      // Ensure required fields are present
      if (!id || !heading || !text  ) {
        return res.status(400).json({
          success: false,
          message: 'All fields (id, heading, text, btn, btnLink) are required.',
        });
      }

      // Find the HeroSection by its ID
      const footerCta = await FooterCTA.findByPk(id);
      if (!footerCta) {
        return res.status(404).json({
          success: false,
          message: 'HeroSection not found.',
        });
      }

      // Update the HeroSection
      await footerCta.update({ heading, text, btn, btnLink });

      return res.status(200).json({
        success: true,
        message: 'HeroSection updated successfully!',
        data: footerCta,
      });

    } else if (req.method === 'GET') {
      const footerCta = await FooterCTA.findOne()

      return res.status(200).json({
        success: true,
        data: footerCta,
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
