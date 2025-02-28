
import Section5 from '@/models/homePage/Section5';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        // Fetch the single Section5 entry
        try {
            const section = await Section5.findOne(); // Retrieve the first (and only) entry
            if (!section) {
                return res.status(404).json({ success: false, message: 'Section not found' });
            }
            res.status(200).json({ success: true, data: section });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    } else if (req.method === 'PUT') {
        // Update the single Section5 entry
        try {
            const { heading, content, boxes } = req.body;

            // Find the single entry
            let section = await Section5.findOne();

            if (!section) {
                // If the entry doesn't exist, create a new one
                section = await Section5.create({ heading, content, boxes });
                return res.status(201).json({ success: true, data: section });
            }

            // If the entry exists, update it
            await section.update({ heading, content, boxes });
            res.status(200).json({ success: true, data: section });
        } catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    } else {
        res.setHeader('Allow', ['GET', 'PUT']);
        res.status(405).json({ success: false, message: `Method ${req.method} not allowed` });
    }
}






// api testing and form of datagoes PUT
// {
//     "heading": "Updated Heading",
//     "content": "Updated content",
//     "boxes": [
//       { "heading": "Updated Box 1", "content": "here is data and i am aman Content 1" },
//       { "heading": "Updated Box 2", "content": "Updated Content 2" }
//       { "heading": "Updated Box 3", "content": "Updated Content 2" }
//     ]
//   }
  