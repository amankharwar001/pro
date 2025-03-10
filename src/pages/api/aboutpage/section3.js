import AboutSection3 from "@/models/aboutPage/Section3";

export default async function handler (req, res) {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const aboutSection3 = await AboutSection3.findOne();
                if (!aboutSection3) {
                    return res.json({});
                }
                return res.json(aboutSection3);
            } catch (error) {
                return res.status(500).json({ error: error.message });
            }
            break;

        case 'POST':
            const { heading, card } = req.body;

            if (!heading || !card || !Array.isArray(card)) {
                return res.status(400).json({ error: "Heading and card (array of objects) are required" });
            }

            try {
                let aboutSection3 = await AboutSection3.findOne();
                if (aboutSection3) {
                    // Update if exists
                    aboutSection3.heading = heading;
                    aboutSection3.card = card;
                    await aboutSection3.save();
                } else {
                    // Create new if doesn't exist
                    aboutSection3 = await AboutSection3.create({ heading, card });
                }
                return res.json(aboutSection3);
            } catch (error) {
                return res.status(500).json({ error: error.message });
            }
            break;

        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
};
