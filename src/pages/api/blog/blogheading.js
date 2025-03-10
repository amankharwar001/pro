import BlogPageHeading from "@/models/blogPage/Main";


export default async function handler(req, res) {
    if (req.headers['x-system-key'] !== process.env.NEXT_PUBLIC_SYSTEM_KEY) {
        return res.status(401).json({ message: 'Unauthorized Access' });
      }
    try {
        if (req.method === "GET") {
            // Fetch heading from the database
            const heading = await BlogPageHeading.findOne({ where: { id: 1 } });
            if (heading) {
                return res.status(200).json({ headingName: heading.headingName });
            }
            return res.status(404).json({ message: "Heading not found" });
        } else if (req.method === "PUT") {
            // Update heading in the database
            const { headingName } = req.body;
            let heading = await BlogPageHeading.findOne({ where: { id: 1 } });

            if (heading) {
                heading.headingName = headingName;
                await heading.save();
            } else {
                heading = await BlogPageHeading.create({ headingName });
            }

            return res.status(200).json({ message: "Heading updated successfully" });
        } else {
            return res.status(405).json({ message: "Method not allowed" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
