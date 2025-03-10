


import section3Product from "@/models/productPage/Section3Products";

export default async function handler(req, res) {
  const { sectionId } = req.query;  // Getting the sectionId from the query

  // Handle PUT request to update the existing entry
  if (req.method === 'PUT') {
    try {
      const { heading, text, info } = req.body;

      // Find the entry by sectionId (use sectionId in query)
      let existingEntry = await section3Product.findOne({ where: { heroSectionId: sectionId } });

      if (existingEntry) {
        // If an entry exists, update it
        const updatedEntry = await existingEntry.update({
          heading: heading,
          text: text,
          info: info,
        });

        return res.status(200).json(updatedEntry);  // Return the updated entry
      } else {
        // If no entry exists, return 404 (no new data should be inserted with PUT)
        return res.status(404).json({ error: 'No data found to update' });
      }
    } catch (error) {
      console.error('Error handling data:', error);
      return res.status(500).json({ error: 'Failed to update data' });
    }
  }

  // Handle POST request to create a new entry if no entry exists
  else if (req.method === 'POST') {
    try {
      const { heading, text, info } = req.body;

      // Check if the entry already exists by sectionId
      const existingEntry = await section3Product.findOne({ where: { heroSectionId: sectionId } });

      if (existingEntry) {
        return res.status(400).json({ error: 'Entry already exists. Use PUT to update it.' });
      } else {
        // Create a new entry with sectionId
        const newEntry = await section3Product.create({
          heading: heading,
          text: text,
          info: info,
          heroSectionId: sectionId,  // Include sectionId when creating new entry
        });

        return res.status(201).json(newEntry);  // Return the newly created entry
      }
    } catch (error) {
      console.error('Error creating data:', error);
      return res.status(500).json({ error: 'Failed to create data' });
    }
  }

  // Handle GET request to fetch the only entry for a specific sectionId
  else if (req.method === 'GET') {
    try {
      // Fetch entry using sectionId from query params
      const entry = await section3Product.findOne({ where: { heroSectionId: sectionId } });

      if (!entry) {
        return res.status(404).json({ error: 'No data found' });
      }

      return res.status(200).json(entry);  // Return the existing entry
    } catch (error) {
      console.error('Error reading data:', error);
      return res.status(500).json({ error: 'Failed to fetch data' });
    }
  }

  // Handle unsupported HTTP methods
  else {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}
