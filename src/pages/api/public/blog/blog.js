import ImagesData from "@/models/homePage/ImagesData";
import BlogPageHeading from "@/models/blogPage/Main";


export default async function handler(req, res) {
    try {
        if (req.method === "GET") {
            // Fetch heading from the database
            const heading = await BlogPageHeading.findOne({ where: { id: 1 } });
            const hero_section = await  ImagesData.findOne({ where: { referenceType: "blog_herosection_image" } });
            if (heading || hero_section) {
                return res.status(200).json({ headingName: heading.headingName ,image:hero_section});
            }
            return res.status(404).json({ message: "Heading not found" });
        }else {
            return res.status(405).json({ message: "Method not allowed" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
