

// pages/api/blogs.js
import BlogStatus from '@/models/blogPage/BlogStatus';
import CommonBlogContent from '@/models/blogPage/CommonBlogContent';
import ImagesData from '@/models/homePage/ImagesData';
import SEOBlogPage from "@/models/blogPage/SEO";
import CreatePageId from '@/models/create-page/createid';
export default async function handler(req, res) {
    if (req.headers['x-system-key'] !== process.env.NEXT_PUBLIC_SYSTEM_KEY) {
        return res.status(401).json({ message: 'Unauthorized Access' });
      }
    const { id } = req.query;

    switch (req.method) {
        case 'POST':
            try {
                const newPage = await CreatePageId.create();
                res.status(201).json(newPage);
            } catch (error) {
                res.status(500).json({ message: error.message });
            }
            break;

        case 'GET':
            if (id) {
                try {
                    // Fetch a single blog by ID
                    const page = await CreatePageId.findByPk(id);
                    const heading = await CommonBlogContent.findOne({ where: { blogId: id } });
                    const status = await BlogStatus.findOne({ where: { blogId: id } });
                    const image = await ImagesData.findAll({ where: { referenceType: blog.id } });
                    const seo = await SEOBlogPage.findOne({ where: { blogId: id } });

                    if (page) {
                        res.status(200).json({
                            id: page.id,
                            heading: heading ? heading.heading : null,
                            status: status ? status.status : null,
                            image: image ? image : null,
                            seo:seo? seo.slug : null
                        });
                    } else {
                        res.status(404).json({ message: 'page not found' });
                    }
                } catch (error) {
                    res.status(500).json({ message: error.message });
                }
            } else {
                try {
                    // Fetch all blogs
                    const pages = await CreatePageId.findAll();

                    // For each blog, fetch its heading and status
                    const result = await Promise.all(
                        pages.map(async (page) => {
                            const heading = await CommonBlogContent.findOne({ where: { blogId: page.id } });
                            const status = await BlogStatus.findOne({ where: { blogId: page.id } });
                            const image = await ImagesData.findAll({ where: { referenceType: page.id } });
                            const seo = await SEOBlogPage.findOne({ where: { blogId: page.id } });

                            return {
                                id: page.id,
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
                const deleted = await CreatePageId.destroy({
                    where: { id }
                });
                if (deleted) {
                    res.status(204).end(); // No content, successfully deleted
                } else {
                    res.status(404).json({ message: 'page not found' });
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
