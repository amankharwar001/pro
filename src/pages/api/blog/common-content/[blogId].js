import CommonBlogContent from '@/models/blogPage/CommonBlogContent';
import CreateBlogId from '@/models/blogPage/IdGenerate';

export default async function handler(req, res) {
  const { blogId } = req.query;  // Get the blogId from query params

  if (!blogId) {
    return res.status(400).json({ error: 'blogId is required' });
  }

  try {
    // Check if the blogId exists in the CreateBlogId table
    const blogExists = await CreateBlogId.findOne({
      where: { id: blogId },
    });

    if (!blogExists) {
      return res.status(400).json({ error: 'Invalid blogId. No such blog exists.' });
    }

    // Handle PUT request to update the existing entry
    if (req.method === 'PUT') {
      const { heading, selectedCategories } = req.body;

      // Validate heading and categories before updating
      if (!heading || !selectedCategories) {
        return res.status(400).json({ error: 'Heading and selectedCategories are required' });
      }

      // Find the existing entry in the database
      const existingEntry = await CommonBlogContent.findOne({
        where: { blogId },
      });

      if (existingEntry) {
        // Update the entry if it exists
        const updatedEntry = await existingEntry.update({
          heading,
          selectedCategories,
        });
        return res.status(200).json(updatedEntry);
      } else {
        // If no entry exists, return 404
        return res.status(404).json({ error: 'Blog content not found to update' });
      }
    }

    // Handle POST request to create a new entry if no entry exists
    else if (req.method === 'POST') {
      const { heading, selectedCategories } = req.body;

      // Validate heading and categories before creating
      if (!heading || !selectedCategories) {
        return res.status(400).json({ error: 'Heading and selectedCategories are required' });
      }

      // Check if the blog content already exists for the blogId
      const existingEntry = await CommonBlogContent.findOne({
        where: { blogId },
      });

      if (existingEntry) {
        return res.status(400).json({ error: 'Blog content already exists. Use PUT to update it.' });
      } else {
        // Create a new blog content if it doesn't exist
        const newEntry = await CommonBlogContent.create({
          blogId,
          heading,
          selectedCategories,
        });

        return res.status(201).json(newEntry);
      }
    }

    // Handle GET request to fetch the blog content by blogId
    else if (req.method === 'GET') {
      const entry = await CommonBlogContent.findOne({
        where: { blogId },
      });

      if (!entry) {
        return res.status(404).json({ error: 'No blog content found' });
      }

      return res.status(200).json(entry);
    }

    // Handle unsupported HTTP methods
    else {
      return res.status(405).json({ error: 'Method Not Allowed' });
    }
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}
