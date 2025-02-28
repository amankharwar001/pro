import Section2Product from "@/models/productPage/Section2Product";

export default async function handler(req, res) {
  const { sectionId } = req.query;

  if (!sectionId) {
    return res.status(400).json({ error: 'sectionId is required' });
  }

  // Handle PUT request to update the existing entry
  if (req.method === 'PUT') {
    try {
      const { title } = req.body;

      // Validate title before updating
      if (!title) {
        return res.status(400).json({ error: 'Title is required' });
      }

      // Find the existing entry in the database
      let existingEntry = await Section2Product.findOne({
        where: { heroSectionId: sectionId },
      });

      if (existingEntry) {
        // Update the entry if it exists
        const updatedEntry = await existingEntry.update({ title });
        return res.status(200).json(updatedEntry);
      } else {
        // If no entry exists, return 404
        return res.status(404).json({ error: 'No data found to update' });
      }
    } catch (error) {
      console.error('Error updating data:', error);
      return res.status(500).json({ error: 'Failed to update data', details: error.message });
    }
  }

  // Handle POST request to create a new entry if no entry exists
  else if (req.method === 'POST') {
    try {
      const { title } = req.body;

      // Validate title before creating
      if (!title) {
        return res.status(400).json({ error: 'Title is required' });
      }

      // Check if the entry already exists
      const existingEntry = await Section2Product.findOne({
        where: { heroSectionId: sectionId },
      });

      if (existingEntry) {
        return res.status(400).json({ error: 'Entry already exists. Use PUT to update it.' });
      } else {
        // Create a new entry if it doesn't exist
        const newEntry = await Section2Product.create({
          title,
          heroSectionId: sectionId,
        });

        return res.status(201).json(newEntry);
      }
    } catch (error) {
      console.error('Error creating data:', error);
      return res.status(500).json({ error: 'Failed to create data', details: error.message });
    }
  }

  // Handle GET request to fetch the only entry
  else if (req.method === 'GET') {
    try {
      const entry = await Section2Product.findOne({
        where: { heroSectionId: sectionId },
      });

      if (!entry) {
        return res.status(404).json({ error: 'No data found' });
      }

      return res.status(200).json(entry);
    } catch (error) {
      console.error('Error reading data:', error);
      return res.status(500).json({ error: 'Failed to fetch data', details: error.message });
    }
  }

  // Handle unsupported HTTP methods
  else {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}
