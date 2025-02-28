import ImagesData from "@/models/homePage/ImagesData";
import CommonSEO from "@/models/commonseo/SEO";
import heroSectionTermConditionPage from '@/models/termConditionPage/HeroSection';
import CommonTermConditionPage from "@/models/commontermpolicypage";



export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Fetch data from all tables concurrently
      const heroSection = await heroSectionTermConditionPage.findOne();
      const seoData = await CommonSEO.findOne({ where: { pageType: "term-condition" } });
      const heroSectionImage = await ImagesData.findAll({
        where: { referenceType: "herosection_term_condition_page", referenceId: 1 },
      });
      const Content = await CommonTermConditionPage.findOne({where:{referenceType:"term_condition_policy"}});

      // Combine all data into a single response object
      const responseData = {
        heroSection: { ...heroSection.toJSON(), images: heroSectionImage },
        content:Content.content,
        seoData,
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
