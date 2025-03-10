import Section9 from "@/models/homePage/Section9"; // Correct model import

export default async function handler(req, res) {
    if (req.headers['x-system-key'] !== process.env.NEXT_PUBLIC_SYSTEM_KEY) {
        return res.status(401).json({ message: 'Unauthorized Access' });
      }
    if (req.method === 'GET') {
        // Fetch Section9 data
        try {
            const sectionData = await Section9.findOne();
            if (!sectionData) {
                return res.status(404).json({ success: false, message: 'Section 12 not found' });
            }
            res.status(200).json({ success: true, data: sectionData });
        } catch (error) {
            console.error("Error during GET operation:", error);
            res.status(500).json({ success: false, message: 'Failed to fetch Section 12 data', error: error.message });
        }
    } else if (req.method === 'PUT') {
        // Update Section9 data
        try {
            const { heading, content, btn, btnLink, info, bottomtext } = req.body;

            // Validate input
            if (!heading || !content ) {
                return res.status(400).json({ success: false, message: 'Invalid data format. Ensure all required fields are provided.' });
            }

            // Validate each item in the info array
            // for (let i = 0; i < info.length; i++) {
            //     const { heading, content } = info[i];
            //     if (!heading || !content) {
            //         return res.status(400).json({ success: false, message: `Item ${i + 1} in info is missing required fields` });
            //     }
            // }
            for (let i = 0; i < info.length; i++) {
                const { heading, content } = info[i];
                if (!heading.trim() && !content.trim()) {
                    return res.status(400).json({ success: false, message: `Item ${i + 1} in info must have at least one field (heading or content)` });
                }
            }
            

            // Find existing Section9 data
            let section = await Section9.findOne();
            if (!section) {
                // Create new Section9 entry if none exists
                section = await Section9.create({ heading, content, btn, btnLink, info, bottomtext });
                return res.status(201).json({ success: true, message: 'Section 12 created successfully', data: section });
            }

            // Update existing Section9 data
            section.heading = heading;
            section.content = content;
            section.btn = btn;
            section.btnLink = btnLink;
            section.info = info;
            section.bottomtext = bottomtext;
            await section.save();

            res.status(200).json({ success: true, message: 'Section 12 updated successfully', data: section });

        } catch (error) {
            console.error("Error during PUT operation:", error);
            res.status(500).json({ success: false, message: 'Failed to update Section 12 data', error: error.message });
        }
    } else {
        // Method not allowed
        res.setHeader('Allow', ['GET', 'PUT']);
        res.status(405).json({ success: false, message: `Method ${req.method} not allowed` });
    }
}






// info:[
//     {
//         heading:"heading1",
//         text:"text1"
//     },
//     {
//         heading:"heading2",
//         text:"text1"
//     },
//     {
//         heading:"heading3",
//         text:"text1"
//     },
//     {
//         heading:"heading4",
//         text:"text1"
//     },

// ]