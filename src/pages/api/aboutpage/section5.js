
import AboutSection5 from "@/models/aboutPage/Section5";

export default async function handler (req, res) {
    const { method } = req;
    if (req.headers['x-system-key'] !== process.env.NEXT_PUBLIC_SYSTEM_KEY) {
        return res.status(401).json({ message: 'Unauthorized Access' });
      }

    switch (method) {
        case 'GET':
            try {
                const aboutSection5 = await AboutSection5.findOne(); 
                if (!aboutSection5) {
                    return res.json({});
                }
                return res.json(aboutSection5);
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
                let aboutSection5 = await AboutSection5.findOne(); 
                if (aboutSection5) {
                    // Update if exists
                    aboutSection5.card = card;
                    await aboutSection5.save();
                } else {
                    // Create new if doesn't exist
                    aboutSection5 = await AboutSection5.create({ card });
                }
                return res.json(aboutSection5);
            } catch (error) {
                return res.status(500).json({ error: error.message });
            }
            break;

        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
};
