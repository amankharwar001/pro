import ImagesData from "@/models/homePage/ImagesData";
import Section3 from "@/models/homePage/Section3";


export default async function handler(req, res) {
    if (req.headers['x-system-key'] !== process.env.NEXT_PUBLIC_SYSTEM_KEY) {
        return res.status(401).json({ message: 'Unauthorized Access' });
      }
    if (req.method === 'GET') {
        // Fetch Section3 data
        try {
            const section = await Section3.findOne();
            const images = await ImagesData.findAll({
                where: {
                    referenceType: ['hero_section3_1', 'hero_section3_2', 'homepage_section_3']
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
        // Update or create Section3 data
        try {
            const { heading, content, agentBrief, leadNo, leadName } = req.body;

            // Validate input
            if (!heading || !content || !agentBrief || !leadNo || !leadName) {
                return res.status(400).json({ success: false, message: 'All fields are required' });
            }

            let section = await Section3.findOne();
            if (!section) {
                // Create new entry if none exists
                section = await Section3.create({ heading, content, agentBrief, leadNo, leadName });
                return res.status(201).json({ success: true, data: section });
            }

            // Update existing entry
            await section.update({ heading, content, agentBrief, leadNo, leadName });
            res.status(200).json({ success: true, data: section });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    } else {
        // Method not allowed
        res.setHeader('Allow', ['GET', 'PUT']);
        res.status(405).json({ success: false, message: `Method ${req.method} not allowed` });
    }
}


// PUT method
// {
//     "heading": "Updated Section asdfasdf3 Heading",
//     "content": "Updated content for Section 3.",
//     "agentBrief": "Updated brief about the agent.",
//     "leadNo": "kjghas",
//     "leadName": "Jane Doe"
//   }