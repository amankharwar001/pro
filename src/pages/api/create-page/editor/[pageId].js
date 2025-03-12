
import CreatePageContent from '@/models/create-page/contentpage';

export default async function handler(req, res) {
  if (req.headers['x-system-key'] !== process.env.NEXT_PUBLIC_SYSTEM_KEY) {
    return res.status(401).json({ message: 'Unauthorized Access' });
  }
  const { pageId } = req.query;
  
  
  if (!pageId) {
    return res.status(400).json({ error: 'pageId is required' });
  }

  try {
    if (req.method === 'GET') {
      
      const section = await CreatePageContent.findOne({where: { pageId }});

      if (!section) {
        return res.status(404).json({ message: 'No content found for the given pageId' });
      }

      return res.status(200).json({ section });
    }

    if (req.method === 'POST') {
      const { content } = req.body;

      
      if (!content) {
        return res.status(400).json({ error: 'Content is required' });
      }

      
      const existingSection = await CreatePageContent.findOne({ where: { pageId } });

      if (existingSection) {
        
        existingSection.content = content;
        await existingSection.save();

        return res.status(200).json({
          message: 'Content updated successfully',
          section: existingSection,
        });
      }

      
      const section = await CreatePageContent.create({ content, pageId });
      return res.status(201).json({
        message: 'Content created successfully',
        section,
      });
    }

    if (req.method === 'PUT') {
      const { content } = req.body;

      
      if (!content) {
        return res.status(400).json({ error: 'Content is required' });
      }

      
      const section = await CreatePageContent.findOne({ where: { pageId } });

      if (!section) {
        return res.status(404).json({ error: 'Content not found. Please create it first using POST.' });
      }

      
      section.content = content;
      await section.save();

      return res.status(200).json({
        message: 'Content updated successfully',
        section,
      });
    }

    if (req.method === 'DELETE') {
      
      const deleted = await CreatePageContent.destroy({ where: { pageId } });

      if (!deleted) {
        return res.status(404).json({ error: 'Content not found for the given pageId' });
      }

      return res.status(200).json({ message: 'Content deleted successfully' });
    }

    
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}
