import ContentBlog from '@/models/blogPage/content';
import CreateBlogId from '@/models/blogPage/IdGenerate';

export default async function handler(req, res) {
  const { blogId } = req.query;

  // Validate `blogId`
  if (!blogId) {
    return res.status(400).json({ error: 'blogId is required' });
  }

  try {
    if (req.method === 'GET') {
      // Fetch content for the given `blogId`
      const section = await ContentBlog.findOne({
        where: { blogId },
        include: [
          {
            model: CreateBlogId,
            as: 'CreateBlogId', // Include associated blog data
          },
        ],
      });

      if (!section) {
        return res.status(404).json({ message: 'No content found for the given blogId' });
      }

      return res.status(200).json({ section });
    }

    if (req.method === 'POST') {
      const { content } = req.body;

      // Validate `content`
      if (!content) {
        return res.status(400).json({ error: 'Content is required' });
      }

      // Check if content for the `blogId` already exists
      const existingSection = await ContentBlog.findOne({ where: { blogId } });

      if (existingSection) {
        // If content exists, update it
        existingSection.content = content;
        await existingSection.save();

        return res.status(200).json({
          message: 'Content updated successfully',
          section: existingSection,
        });
      }

      // Create new content if it does not exist
      const section = await ContentBlog.create({ content, blogId });
      return res.status(201).json({
        message: 'Content created successfully',
        section,
      });
    }

    if (req.method === 'PUT') {
      const { content } = req.body;

      // Validate `content`
      if (!content) {
        return res.status(400).json({ error: 'Content is required' });
      }

      // Find existing content for the `blogId`
      const section = await ContentBlog.findOne({ where: { blogId } });

      if (!section) {
        return res.status(404).json({ error: 'Content not found. Please create it first using POST.' });
      }

      // Update the content
      section.content = content;
      await section.save();

      return res.status(200).json({
        message: 'Content updated successfully',
        section,
      });
    }

    if (req.method === 'DELETE') {
      // Delete content for the given `blogId`
      const deleted = await ContentBlog.destroy({ where: { blogId } });

      if (!deleted) {
        return res.status(404).json({ error: 'Content not found for the given blogId' });
      }

      return res.status(200).json({ message: 'Content deleted successfully' });
    }

    // Method not allowed
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}
