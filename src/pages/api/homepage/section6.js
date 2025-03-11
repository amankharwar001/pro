import Section6 from "@/models/homePage/Section6"; // Import Sequelize model

export default async function handler(req, res) {
    if (req.headers['x-system-key'] !== process.env.NEXT_PUBLIC_SYSTEM_KEY) {
        return res.status(401).json({ message: 'Unauthorized Access' });
      }
    if (req.method === 'GET') {
        // Fetch Section6 data
        try {
            const section = await Section6.findOne();
            if (!section) {
                return res.status(404).json({ success: false, message: 'Section not found' });
            }
            res.status(200).json({ success: true, data: section });
        } catch (error) {
            console.error("Error during GET operation:", error);
            res.status(500).json({ success: false, message: 'Failed to fetch Section6 data', error: error.message });
        }
    } else if (req.method === 'PUT') {
        // Update or create Section6 data
        try {
            const { heading, content, card, bottomtext } = req.body;

            // Validate input
            if (!heading || !content || !bottomtext || !Array.isArray(card) || card.length === 0) {
                return res.status(400).json({ success: false, message: 'Invalid data format. Ensure heading, content, bottomtext, and card array are provided.' });
            }

            // Validate each card object (without bottomtextlink)
            for (let i = 0; i < card.length; i++) {
                const { title, content, info, btnname, btnlink } = card[i];
                if (!title || !content || !info || !btnname || !btnlink) {
                    return res.status(400).json({ success: false, message: `Card ${i + 1} is missing required fields` });
                }
            }

            // Find existing Section6 data
            let section = await Section6.findOne();
            if (!section) {
                // Create new entry if none exists
                section = await Section6.create({ heading, content, card, bottomtext });
                return res.status(201).json({ success: true, message: 'Section created successfully', data: section });
            }

            // Update existing entry
            section.heading = heading;
            section.content = content;
            section.card = card;
            section.bottomtext = bottomtext;

            await section.save(); // Save the updated section

            res.status(200).json({ success: true, message: 'Section updated successfully', data: section });

        } catch (error) {
            console.error("Error during PUT operation:", error);
            res.status(500).json({ success: false, message: 'Failed to update Section6 data', error: error.message });
        }
    } else {
        // Method not allowed
        res.setHeader('Allow', ['GET', 'PUT']);
        res.status(405).json({ success: false, message: `Method ${req.method} not allowed` });
    }
}



// put method
// {
//     "heading": "Updated Heading",
//     "content": "Updated Content",
//     "bottomtext": "This is the bottom text.",
//     "card": [
//       {
//         "title": "Card Title 1",
//         "content": "Card Content 1",
//         "info": "Card Info 1",
//         "btnname": "Learn More",
//         "btnlink": "/learn-more"
//       },
//       {
//         "title": "Card Title 2",
//         "content": "Card Content 2",
//         "info": "Card Info 2",
//         "btnname": "Get Started",
//         "btnlink": "/get-started"
//       },
//       {
//         "title": "Card Title 3",
//         "content": "Card Content 3",
//         "info": "Card Info 3",
//         "btnname": "Get Started",
//         "btnlink": "/get-started"
//       }
//     ]
//   }
  