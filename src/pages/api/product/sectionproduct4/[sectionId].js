// import section4Product from "@/models/productPage/Section4Product";

// export default async function handler(req, res) {
//   const { sectionId } = req.query;  // Getting the sectionId from the query

//   // Handle PUT request to update the existing entry
//   if (req.method === 'PUT') {
//     try {
//       const { heading, text } = req.body;

//       // Find the entry by heroSectionId (using heroSectionId in the query)
//       let existingEntry = await section4Product.findOne({ where: { heroSectionId: sectionId } });

//       if (existingEntry) {
//         // If an entry exists, update it
//         const updatedEntry = await existingEntry.update({
//           heading: heading,
//           text: text,
//         });

//         return res.status(200).json(updatedEntry);  // Return the updated entry
//       } else {
//         // If no entry exists, return 404 (no new data should be inserted with PUT)
//         return res.status(404).json({ error: 'No data found to update' });
//       }
//     } catch (error) {
//       console.error('Error handling data:', error);
//       return res.status(500).json({ error: 'Failed to update data' });
//     }
//   }

//   // Handle POST request to create a new entry if no entry exists
//   else if (req.method === 'POST') {
//     try {
//       const { heading, text } = req.body;

//       // Check if the entry already exists by heroSectionId
//       const existingEntry = await section4Product.findOne({ where: { heroSectionId: sectionId } });

//       if (existingEntry) {
//         return res.status(400).json({ error: 'Entry already exists. Use PUT to update it.' });
//       } else {
//         // Create a new entry with heroSectionId
//         const newEntry = await section4Product.create({
//           heading: heading,
//           text: text,
//           heroSectionId: sectionId,  // Include heroSectionId when creating new entry
//         });

//         return res.status(201).json(newEntry);  // Return the newly created entry
//       }
//     } catch (error) {
//       console.error('Error creating data:', error);
//       return res.status(500).json({ error: 'Failed to create data' });
//     }
//   }

//   // Handle GET request to fetch the only entry for a specific heroSectionId
//   else if (req.method === 'GET') {
//     try {
//       // Fetch entry using heroSectionId from query params
//       const entry = await section4Product.findOne({ where: { heroSectionId: sectionId } });

//       if (!entry) {
//         return res.status(404).json({ error: 'No data found' });
//       }

//       return res.status(200).json(entry);  // Return the existing entry
//     } catch (error) {
//       console.error('Error reading data:', error);
//       return res.status(500).json({ error: 'Failed to fetch data' });
//     }
//   }

//   // Handle unsupported HTTP methods
//   else {
//     return res.status(405).json({ error: 'Method Not Allowed' });
//   }
// }






import section4Product from '@/models/productPage/Section4Product';

export default async function handler(req, res) {
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
      console.log("section 4 api is here",section4)
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
