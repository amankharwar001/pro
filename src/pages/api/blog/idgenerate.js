

// pages/api/blogs.js
import BlogStatus from '@/models/blogPage/BlogStatus';
import CommonBlogContent from '@/models/blogPage/CommonBlogContent';
import CreateBlogId from '@/models/blogPage/IdGenerate';
import ImagesData from '@/models/homePage/ImagesData';
import SEOBlogPage from "@/models/blogPage/SEO";
export default async function handler(req, res) {
    const { id } = req.query;

    switch (req.method) {
        case 'POST':
            try {
                const newBlog = await CreateBlogId.create();
                res.status(201).json(newBlog);
            } catch (error) {
                res.status(500).json({ message: error.message });
            }
            break;

        case 'GET':
            if (id) {
                try {
                    // Fetch a single blog by ID
                    const blog = await CreateBlogId.findByPk(id);
                    const heading = await CommonBlogContent.findOne({ where: { blogId: id } });
                    const status = await BlogStatus.findOne({ where: { blogId: id } });
                    const image = await ImagesData.findAll({ where: { referenceType: blog.id } });
                    const seo = await SEOBlogPage.findOne({ where: { blogId: id } });

                    if (blog) {
                        res.status(200).json({
                            id: blog.id,
                            heading: heading ? heading.heading : null,
                            status: status ? status.status : null,
                            image: image ? image : null,
                            seo:seo? seo.slug : null
                        });
                    } else {
                        res.status(404).json({ message: 'Blog not found' });
                    }
                } catch (error) {
                    res.status(500).json({ message: error.message });
                }
            } else {
                try {
                    // Fetch all blogs
                    const blogs = await CreateBlogId.findAll();

                    // For each blog, fetch its heading and status
                    const result = await Promise.all(
                        blogs.map(async (blog) => {
                            const heading = await CommonBlogContent.findOne({ where: { blogId: blog.id } });
                            const status = await BlogStatus.findOne({ where: { blogId: blog.id } });
                            const image = await ImagesData.findAll({ where: { referenceType: blog.id } });
                            const seo = await SEOBlogPage.findOne({ where: { blogId: blog.id } });

                            return {
                                id: blog.id,
                                heading: heading ? heading.heading : null,
                                status: status ? status.status : null,
                                image: image ? image : null,
                                seo:seo? seo.slug : null
                            };
                        })
                    );

                    res.status(200).json(result);
                } catch (error) {
                    res.status(500).json({ message: error.message });
                }
            }
            break;

        case 'DELETE':
            try {
                const deleted = await CreateBlogId.destroy({
                    where: { id }
                });
                if (deleted) {
                    res.status(204).end(); // No content, successfully deleted
                } else {
                    res.status(404).json({ message: 'Blog not found' });
                }
            } catch (error) {
                res.status(500).json({ message: error.message });
            }
            break;

        default:
            res.setHeader('Allow', ['POST', 'GET', 'DELETE']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
            break;
    }
}
