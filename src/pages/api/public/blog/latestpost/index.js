import BlogStatus from '@/models/blogPage/BlogStatus';
import CreateBlogId from '@/models/blogPage/IdGenerate';
import CommonBlogContent from '@/models/blogPage/commonBlogContent';
import ContentBlog from '@/models/blogPage/content';
import SEOBlogPage from '@/models/blogPage/SEO';
import ImagesData from '@/models/homePage/ImagesData';

export default async function handler(req, res) {
    switch (req.method) {
        case 'GET':
            try {
                // Fetch all blog IDs from CreateBlogId
                const allBlogs = await CreateBlogId.findAll();

                if (!allBlogs || allBlogs.length === 0) {
                    return res.status(404).json({ message: "No blogs found" });
                }

                // Fetch active blogs with additional details
                const activeBlogDetails = await Promise.all(
                    allBlogs.map(async (blog) => {
                        const status = await BlogStatus.findOne({
                            where: { blogId: blog.id },
                        });

                        if (status && status.status === 'active') {
                            const heading = await CommonBlogContent.findOne({ where: { blogId: blog.id } });
                            const images = await ImagesData.findAll({ where: { referenceType: blog.id } });
                            const content = await ContentBlog.findOne({ where: { blogId: blog.id } });
                            const seo = await SEOBlogPage.findOne({ where: { blogId: blog.id } });

                            return {
                                id: blog.id,
                                heading: heading ? heading.heading : null,
                                featureImage: images && images[0] ? images[0] : null,
                                createAt: content ? new Date(content.updatedAt).toISOString() : null,
                                status: 'active',
                                seoSlug: seo ? seo.slug : null,
                            };
                        }

                        return null;
                    })
                );

                // Filter out inactive blogs and sort by `createAt` in descending order
                const sortedBlogs = activeBlogDetails
                    .filter(blog => blog !== null && blog.createAt !== null)
                    .sort((a, b) => new Date(b.createAt) - new Date(a.createAt))
                    .slice(0, 5); // Take the top 5 blogs

                if (sortedBlogs.length === 0) {
                    return res.status(404).json({ message: "No active blogs found" });
                }

                // Format the `createAt` date for the response
                const formattedBlogs = sortedBlogs.map(blog => ({
                    ...blog,
                    createAt: new Date(blog.createAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                    }),
                }));

                // Respond with the top 5 blogs
                res.status(200).json(formattedBlogs);
            } catch (error) {
                console.error("Error fetching latest active blogs:", error);
                res.status(500).json({ message: "Internal server error", error: error.message });
            }
            break;

        default:
            res.setHeader('Allow', ['GET']);
            res.status(405).json({ message: `Method ${req.method} Not Allowed` });
            break;
    }
}
