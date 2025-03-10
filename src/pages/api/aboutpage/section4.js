
import AboutSection4 from "@/models/aboutPage/Section4";

export default async function handler (req, res) {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const aboutSection4 = await AboutSection4.findOne(); 
                if (!aboutSection4) {
                    return res.json({});
                }
                return res.json(aboutSection4);
            } catch (error) {
                return res.status(500).json({ error: error.message });
            }
            break;

        case 'POST':
            const {  card } = req.body;

            if ( !card || !Array.isArray(card)) {
                return res.status(400).json({ error: " and card (array of objects) are required" });
            }

            try {
                let aboutSection4 = await AboutSection4.findOne(); 
                if (aboutSection4) {
                    // Update if exists
                    aboutSection4.card = card;
                    await aboutSection4.save();
                } else {
                    // Create new if doesn't exist
                    aboutSection4 = await AboutSection4.create({ card });
                }
                return res.json(aboutSection4);
            } catch (error) {
                return res.status(500).json({ error: error.message });
            }
            break;

        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
};
