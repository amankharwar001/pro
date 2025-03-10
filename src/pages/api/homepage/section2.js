import Section2 from '@/models/homePage/Section2';
import ImagesData from '@/models/homePage/ImagesData';

export default async function Section2Api(req, res) {
  try {
    if (req.method === 'GET') {
      // Fetch section data
      const section = await Section2.findOne();

      // Fetch all images
      const images = await ImagesData.findAll();


      if (!section) {
        return res.status(404).json({ message: 'No content found' });
      }

      // Filter images by referenceType (for example, 'hero_section')
      const filteredImages = images.filter(image => image.referenceType === 'homepage_section_2');

      return res.status(200).json({ section, images: filteredImages });
    }

    if (req.method === 'POST') {
      const { heading } = req.body;

      if (!heading) {
        return res.status(400).json({ error: 'Heading is required' });
      }

      // Check if content exists and update if necessary
      const existingSection = await Section2.findOne();
      
      if (existingSection) {
        // If content exists, update it
        existingSection.heading = heading;
        await existingSection.save();  // Update the existing record
        return res.status(200).json({
          message: 'Content updated successfully',
          section: existingSection,
        });
      }

      // Create new content if it does not exist
      const section = await Section2.create({ heading });
      return res.status(201).json({ message: 'Content created successfully', section });
    }

    if (req.method === 'PUT') {
      const { heading } = req.body;

      if (!heading) {
        return res.status(400).json({ error: 'Heading is required' });
      }

      // Find existing content
      let section = await Section2.findOne();
      if (!section) {
        return res.status(404).json({ error: 'Content not found. Please create it first using POST.' });
      }

      // Update the content
      section.heading = heading;
      await section.save();

      return res.status(200).json({ message: 'Content updated successfully', section });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
