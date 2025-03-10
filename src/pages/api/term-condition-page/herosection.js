import heroSectionTermConditionPage from "@/models/termConditionPage/HeroSection";


export default async function handler(req, res) {
  if (req.headers['x-system-key'] !== process.env.NEXT_PUBLIC_SYSTEM_KEY) {
    return res.status(401).json({ message: 'Unauthorized Access' });
  }
  try {
    if (req.method === 'POST') {
      const { title, heading, text, btn, btnLink } = req.body;

      // Validate required fields
      if (!title || !heading || !text ) {
        return res.status(400).json({
          success: false,
          message: ' (title, heading, text) are required.',
        });
      }

      // Check if a record already exists
      let heroSection = await heroSectionTermConditionPage.findOne();

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
        heroSection = await heroSectionTermConditionPage.create({
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
      const heroSection = await heroSectionTermConditionPage.findOne();

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
