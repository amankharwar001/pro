import ImagesData from "@/models/homePage/ImagesData";
import Section4 from "@/models/homePage/Section4";


export default async function handler(req, res) {
    if (req.headers['x-system-key'] !== process.env.NEXT_PUBLIC_SYSTEM_KEY) {
        return res.status(401).json({ message: 'Unauthorized Access' });
      }
    if (req.method === 'GET') {
        try {
            const section = await Section4.findOne();
            const images = await ImagesData.findAll({
                where: {
                    referenceType: ['hero_section4_1', 'homepage_section_4']
                }
            });
            if (!section) {
                return res.status(404).json({ success: false, message: 'Section not found' });
            }
            res.status(200).json({ success: true, data: section,images:images });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    } else if (req.method === 'PUT') {
        try {
            const { heading, content, leadDetails } = req.body;

            let section = await Section4.findOne();
            if (!section) {
                section = await Section4.create({ heading, content, leadDetails });
                return res.status(201).json({ success: true, data: section });
            }

            await section.update({ heading, content, leadDetails });
            res.status(200).json({ success: true, data: section });
        } catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    } else {
        res.setHeader('Allow', ['GET', 'PUT']);
        res.status(405).json({ success: false, message: `Method ${req.method} not allowed` });
    }
}




// section 4 put method
// {
//     "heading": "Hero Section",
//     "content": "This is the content of Section 4",
//     "leadDetails": [
//       { "leadName": "John Doe", "leadNo": 12345 },
//       { "leadName": "Jane Smith", "leadNo": 67890 }
//     ]
//   }
  