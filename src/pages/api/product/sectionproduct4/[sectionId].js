
import section4Product from '@/models/productPage/Section4Product';

export default async function handler(req, res) {
  if (req.headers['x-system-key'] !== process.env.NEXT_PUBLIC_SYSTEM_KEY) {
    return res.status(401).json({ message: 'Unauthorized Access' });
  }
  const { sectionId } = req.query;

  if (req.method === 'PUT') {
    try {
      const { section4 } = req.body;

      let existingEntry = await section4Product.findOne({ where: { heroSectionId: sectionId } });

      if (existingEntry) {
        const updatedEntry = await existingEntry.update({ section4 });
        return res.status(200).json(updatedEntry);
      } else {
        return res.status(404).json({ error: 'No data found to update' });
      }
    } catch (error) {
      console.error('Error handling data:', error);
      return res.status(500).json({ error: 'Failed to update data' });
    }
  }

  else if (req.method === 'POST') {
    try {
      const { section4 } = req.body;
      
      const existingEntry = await section4Product.findOne({ where: { heroSectionId: sectionId } });

      if (existingEntry) {
        return res.status(400).json({ error: 'Entry already exists. Use PUT to update it.' });
      } else {
        const newEntry = await section4Product.create({
          heroSectionId: sectionId,
          section4,
        });

        return res.status(201).json(newEntry);
      }
    } catch (error) {
      console.error('Error creating data:', error);
      return res.status(500).json({ error: 'Failed to create data' });
    }
  }

  else if (req.method === 'GET') {
    try {
      const entry = await section4Product.findOne({ where: { heroSectionId: sectionId } });

      if (!entry) {
        return res.status(404).json({ error: 'No data found' });
      }

      return res.status(200).json(entry);
    } catch (error) {
      console.error('Error reading data:', error);
      return res.status(500).json({ error: 'Failed to fetch data' });
    }
  }

  else {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}
