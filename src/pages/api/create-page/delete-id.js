import CreatePageSEO from "@/models/create-page/SEO";
import CreatePageId from '@/models/create-page/createid';
import ImagesData from '@/models/homePage/ImagesData';
import heroSectionCreatePage from "@/models/create-page/herosection";
import CreatePageContent from '@/models/create-page/contentpage';
import CreatePageStatus from "@/models/create-page/PageStatus";


export default async function handler(req, res) {
    if (req.headers['x-system-key'] !== process.env.NEXT_PUBLIC_SYSTEM_KEY) {
        return res.status(401).json({ message: 'Unauthorized Access' });
      }
    const { id } = req.query;
    console.log("delete id pages show is here",id)

    if (req.method !== 'DELETE') {
        return res.status(405).json({ message: `Method ${req.method} not allowed` });
    }

    if (!id) {
        return res.status(400).json({ message: 'Blog ID is required' });
    }

    try {
        // Check if the blog ID exists in CreatePageId model
        const blogExists = await CreatePageId.findOne({ where: { id } });
        
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
            deleteRecord(CreatePageStatus, { where: { id: id } }),
            deleteRecord(heroSectionCreatePage, { where: { id: id } }),
            deleteRecord(ImagesData, { where: { referenceType: id } }),
            deleteRecord(CreatePageSEO, { where: { id: id } }),
            deleteRecord(CreatePageContent, { where: { id: id } }),
        ]);

        // Delete the main blog record
        const blogDeleted = await CreatePageId.destroy({ where: { id } });

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
