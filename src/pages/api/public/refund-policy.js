import ImagesData from "@/models/homePage/ImagesData";
import CommonSEO from "@/models/commonseo/SEO";
import heroSectionRefundPolicyPage from '@/models/refundPolicyPage/HeroSection';
import CommonTermConditionPage from "@/models/commontermpolicypage";


export default async function handler(req, res) {
  if (req.headers['x-system-key'] !== process.env.NEXT_PUBLIC_SYSTEM_KEY) {
    return res.status(401).json({ message: 'Unauthorized Access' });
  }
  if (req.method === 'GET') {
    try {
      // Fetch data from all tables concurrently
      const heroSection = await heroSectionRefundPolicyPage.findOne();
      const seoData = await CommonSEO.findOne({ where: { pageType: "refund-policy" } });
      const heroSectionImage = await ImagesData.findAll({
        where: { referenceType: "herosection_refund_policy_page", referenceId: 1 },
      });
      const Content = await CommonTermConditionPage.findOne({where:{referenceType:"refund_policy"}});

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
