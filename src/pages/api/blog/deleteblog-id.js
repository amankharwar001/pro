import BlogStatus from '@/models/blogPage/BlogStatus';
import ImagesData from '@/models/homePage/ImagesData';
import CreateBlogId from '@/models/blogPage/IdGenerate';
import SEOBlogPage from "@/models/blogPage/SEO";
import ContentBlog from '@/models/blogPage/content';
import CommonBlogContent from '@/models/blogPage/CommonBlogContent';

export default async function handler(req, res) {
    const { id } = req.query;

    if (req.method !== 'DELETE') {
        return res.status(405).json({ message: `Method ${req.method} not allowed` });
    }

    if (!id) {
        return res.status(400).json({ message: 'Blog ID is required' });
    }

    try {
        // Check if the blog ID exists in CreateBlogId model
        const blogExists = await CreateBlogId.findOne({ where: { id } });
        
        if (!blogExists) {
            return res.status(404).json({ message: `Blog with ID ${id} not found` });
        }

        // Create a function for deleting a record and catching errors
        const deleteRecord = async (model, whereCondition) => {
            try {
                await model.destroy(whereCondition);
            } catch (err) {
                console.error(`Error deleting record from ${model.name}:`, err);
                throw new Error(`Failed to delete ${model.name}`);
            }
        };

        // Delete related records
        await Promise.all([
            deleteRecord(BlogStatus, { where: { blogId: id } }),
            deleteRecord(CommonBlogContent, { where: { blogId: id } }),
            deleteRecord(ImagesData, { where: { referenceType: id } }),
            deleteRecord(SEOBlogPage, { where: { blogId: id } }),
            deleteRecord(ContentBlog, { where: { blogId: id } }),
        ]);

        // Delete the main blog record
        const blogDeleted = await CreateBlogId.destroy({ where: { id } });

        if (blogDeleted) {
            return res.status(200).json({ message: `Blog with ID ${id} deleted successfully` });
        } else {
            return res.status(404).json({ message: `Blog with ID ${id} not found` });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error deleting blog and associated data', error: error.message, id });
    }
}
