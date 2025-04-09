import ImagesData from "@/models/homePage/ImagesData";
import CommonTermConditionPage from "@/models/commontermpolicypage";
import heroSectionCreatePage from "@/models/create-page/herosection";
import CreatePageSEO from "@/models/create-page/SEO";
import CreatePageStatus from "@/models/create-page/PageStatus";
import CommonTermConditionPage2 from '@/models/commontermpolicypage/index2';

export default async function handler(req, res) {
  if (req.headers['x-system-key'] !== process.env.NEXT_PUBLIC_SYSTEM_KEY) {
    return res.status(401).json({ message: 'Unauthorized Access' });
  }
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ message: "URL query parameter is required" });
  }

  if (req.method === 'GET') {
    const urlFilter = await CreatePageSEO.findOne({ where: { slug: url } });

    if (!urlFilter) {
      return res.status(404).json({ message: "Blog not found for the given URL" });
    }

    const id = urlFilter.id;
    try {
      // Fetch data from all tables concurrently
      const heroSection = await heroSectionCreatePage.findOne({ where: { id: id } });
      const seoData = await CreatePageSEO.findOne({ where: { id: id } });
      const heroSectionImage = await ImagesData.findOne({ where: { referenceType: id, referenceId: 1 } });
      const status = await CreatePageStatus.findOne({ where: { id: id } });
      const Content = await CommonTermConditionPage.findOne({ where: { referenceType: id } });
      const Content2 = await CommonTermConditionPage2.findOne({ where: { referenceType: id } });

      // Combine all data into a single response object
      const responseData = {
        heroSection: { ...heroSection.toJSON(), images: heroSectionImage ? heroSectionImage : null },
        content: Content?.content || null,
        content2: Content2?.content || null,
        seoData,
        status
      };

      return res.status(200).json(responseData);
    } catch (error) {
      console.error('Error fetching data:', error);
      return res.status(500).json({ error: 'Failed to fetch data' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
