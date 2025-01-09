

import BlogStatus from '@/models/blogPage/BlogStatus';
import Category from '@/models/blogPage/Category';
import CommonBlogContent from '@/models/blogPage/CommonBlogContent';
import SEOBlogPage from '@/models/blogPage/SEO';
import ImagesData from '@/models/homePage/ImagesData';
const { Op } = require('sequelize');

export default async function handler(req, res) {
    switch (req.method) {
        case 'GET':
            try {
                // Fetch all categories
                const categories = await Category.findAll();

                if (!categories || categories.length === 0) {
                    return res.status(404).json({ message: "No categories found" });
                }

                // Map through categories and fetch related blog content
                const categoryData = await Promise.all(
                    categories.map(async (category) => {
                        // Fetch blog content where selectedCategories contains the category ID
                        const blogs = await CommonBlogContent.findAll({
                            where: {
                                selectedCategories: {
                                    [Op.contains]: [category.id] // Sequelize-specific syntax for array field matching
                                }
                            }
                        });

                        // Extract and fetch additional details for each blog
                        const blogDetails = await Promise.all(
                            blogs.map(async (blog) => {
                                // Fetch the status of each blog and only include those with an active status
                                const status = await BlogStatus.findOne({
                                    where: { blogId: blog.blogId }
                                });

                                // Only include blogs that are active
                                if (status && status.status === 'active') {
                                    const images = await ImagesData.findAll({
                                        where: { referenceType: blog.blogId }
                                    });
                                    const seo = await SEOBlogPage.findOne({
                                        where: { blogId: blog.blogId }
                                    });

                                    return {
                                        id: blog.blogId,
                                        heading: blog.heading || null,
                                        status: status.status,
                                        image: images || [],
                                        seoSlug: seo?.slug || null,
                                    };
                                }

                                return null; // Return null if the blog is not active
                            })
                        );

                        // Filter out any null blog details (i.e., non-active blogs)
                        const activeBlogDetails = blogDetails.filter(blog => blog !== null);

                        return {
                            category: category.category,
                            blogCount: activeBlogDetails.length,
                            blogs: activeBlogDetails,
                        };
                    })
                );

                // Respond with all category data and their respective active blogs
                res.status(200).json(categoryData);
            } catch (error) {
                console.error("Error fetching categories or blogs:", error);
                res.status(500).json({ message: "Internal server error", error: error.message });
            }
            break;

        default:
            res.setHeader('Allow', ['GET']);
            res.status(405).json({ message: `Method ${req.method} Not Allowed` });
            break;
    }
}
