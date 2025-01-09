import BlogStatus from "@/models/blogPage/BlogStatus";
import CommonBlogContent from "@/models/blogPage/commonBlogContent";
import ContentBlog from "@/models/blogPage/content";
import SEOBlogPage from "@/models/blogPage/SEO";
import ImagesData from "@/models/homePage/ImagesData";

export default async function handler(req, res) {
    const { url } = req.query; // Get the URL from the query parameters

    if (!url) {
        return res.status(400).json({ message: "URL query parameter is required" });
    }

    try {
        // Find the blog record using the slug
        const urlFilter = await SEOBlogPage.findOne({ where: { slug: url }});

        if (!urlFilter) {
            return res.status(404).json({ message: "Blog not found for the given URL" });
        }

        const id = urlFilter.blogId;

        try {
            // Fetch the SEO details using the blog ID
            const seo = await SEOBlogPage.findOne({ where: { blogId: id } });
            const heading = await CommonBlogContent.findOne({ where: { blogId: id } });
            const status = await BlogStatus.findOne({ where: { blogId: id } });
            const content = await ContentBlog.findOne({where: { blogId:id }});
            const image = await ImagesData.findAll({ where: { referenceType: id} });

            // Return the SEO slug, or null if not found
            return res.status(200).json({
                heading: heading ? heading.heading : null,
                featureImage: image ? image[0] : null,
                content: content ? content : null,
                createAt: content ? new Date(content.updatedAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  }) : null,
                status: status ? status.status : null,
                seo: seo ? seo : null,
            });
        } catch (innerError) {
            return res.status(500).json({ message: "Error fetching SEO details", error: innerError.message });
        }
    } catch (outerError) {
        return res.status(500).json({ message: "Error fetching blog by URL", error: outerError.message });
    }
}
