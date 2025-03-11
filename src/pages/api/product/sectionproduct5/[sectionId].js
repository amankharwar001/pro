import section5Product from "@/models/productPage/Section5Product";

export default async function handler(req, res) {
  if (req.headers['x-system-key'] !== process.env.NEXT_PUBLIC_SYSTEM_KEY) {
    return res.status(401).json({ message: 'Unauthorized Access' });
  }
  const { sectionId } = req.query;  // Getting sectionId from q uery params

  // Handle PUT request to update the existing entry
  if (req.method === 'PUT') {
    try {
      const { heading, text, info } = req.body;

      // Validate input fields
      if (!heading ) {
        return res.status(400).json({ error: 'Heading, text, and info are required' });
      }

      // Find the existing entry based on sectionId
      let existingEntry = await section5Product.findOne({ where: { heroSectionId: sectionId } });

      if (existingEntry) {
        // Update the existing entry
        const updatedEntry = await existingEntry.update({
          heading: heading,
          text: text,
          info: info,
        });

        return res.status(200).json(updatedEntry);  // Return the updated entry
      } else {
        // Return 404 if no entry is found
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

      // Validate input fields
      if (!heading ) {
        return res.status(400).json({ error: 'Heading, text, and info are required' });
      }

      // Check if the entry already exists based on sectionId
      const existingEntry = await section5Product.findOne({ where: { heroSectionId: sectionId } });

      if (existingEntry) {
        return res.status(400).json({ error: 'Entry already exists. Use PUT to update it.' });
      } else {
        // Create a new entry with the sectionId
        const newEntry = await section5Product.create({
          heading: heading,
          text: text,
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

  // Handle GET request to fetch the only entry
  else if (req.method === 'GET') {
    try {
      const entry = await section5Product.findOne({ where: { heroSectionId: sectionId } });

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
