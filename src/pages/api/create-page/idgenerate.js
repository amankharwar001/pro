import ImagesData from '@/models/homePage/ImagesData';
import CreatePageId from '@/models/create-page/createid';
import CreatePageStatus from "@/models/create-page/PageStatus";
import heroSectionCreatePage from "@/models/create-page/herosection";
import CreatePageSEO from '@/models/create-page/SEO';



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
                    const heading = await heroSectionCreatePage.findOne({ where: { id: id } });
                    const status = await CreatePageStatus.findOne({ where: { id: id } });
                    
                    const seo = await CreatePageSEO.findOne({ where: { id: id } });

                    if (page) {
                        res.status(200).json({
                            id: page.id,
                            heading: heading ? heading.heading : null,
                            status: status ? status.status : null,
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
                            const heading = await heroSectionCreatePage.findOne({ where: { id: page.id } });
                            const status = await CreatePageStatus.findOne({ where: { id: page.id } });
                            
                            const seo = await CreatePageSEO.findOne({ where: { id: page.id } });

                            return {
                                id: page.id,
                                heading: heading ? heading.heading : null,
                                status: status ? status.status : null,
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
                    res.status(204).end(); 
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
