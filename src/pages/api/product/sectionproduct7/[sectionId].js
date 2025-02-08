import section7Product from "@/models/productPage/Section7Product";

export default async function handler(req, res) {
  const { sectionId } = req.query; // Get sectionId from the query parameters

  // Handle PUT request to update the existing entry
  if (req.method === 'PUT') {
    try {
      const { heading, text, btn, btnLink, info } = req.body;

      // Validate input fields
      if (!heading || !text || !btn || !btnLink || !info) {
        return res.status(400).json({ error: 'Heading, text, button, button link, and info are required' });
      }

      // Find the entry based on the sectionId
      let existingEntry = await section7Product.findOne({ where: { heroSectionId: sectionId } });

      if (existingEntry) {
        // If an entry exists, update it
        const updatedEntry = await existingEntry.update({
          heading: heading,
          text: text,
          btn: btn,
          btnLink: btnLink,
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
      const { heading, text, btn, btnLink, info } = req.body;

      // Validate input fields
      if (!heading || !text || !btn || !btnLink || !info) {
        return res.status(400).json({ error: 'Heading, text, button, button link, and info are required' });
      }

      // Check if the entry already exists
      const existingEntry = await section7Product.findOne({ where: { heroSectionId: sectionId } });

      if (existingEntry) {
        return res.status(400).json({ error: 'Entry already exists. Use PUT to update it.' });
      } else {
        // Create a new entry with sectionId
        const newEntry = await section7Product.create({
          heading: heading,
          text: text,
          btn: btn,
          btnLink: btnLink,
          info: info,
          heroSectionId: sectionId,  // Ensure sectionId is passed here
        });

        return res.status(201).json(newEntry);  // Return the newly created entry
      }
    } catch (error) {
      console.error('Error creating data:', error);
      return res.status(500).json({ error: 'Failed to create data' });
    }
  }

  // Handle GET request to fetch the only entry for this sectionId
  else if (req.method === 'GET') {
    try {
      const entry = await section7Product.findOne({ where: { heroSectionId: sectionId } });

      if (!entry) {
        return res.status(404).json({ error: 'No data found for this section' });
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
