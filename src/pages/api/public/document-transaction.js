import ImagesData from "@/models/homePage/ImagesData";
// import HeroSectionPrivacyPage from '@/models/privacyPage/HeroSection';
import CommonSEO from "@/models/commonseo/SEO";
import CommonTermConditionPage from "@/models/commontermpolicypage";
import HeroSectionDocumentTransaction from '@/models/document-transaction/HeroSectionDocumentTransaction';

export default async function handler(req, res) {
  if (req.headers['x-system-key'] !== process.env.NEXT_PUBLIC_SYSTEM_KEY) {
    return res.status(401).json({ message: 'Unauthorized Access' });
  }
  if (req.method === 'GET') {
    try {
      // Fetch data from all tables concurrently
      const heroSection = await HeroSectionDocumentTransaction.findOne();
      const seoData = await CommonSEO.findOne({ where: { pageType: "document_transaction_content" } });
      const heroSectionImage = await ImagesData.findAll({
        where: { referenceType: "document_transaction_content", referenceId: 1 },
      });
      const Content = await CommonTermConditionPage.findOne({where:{referenceType:"document_transaction_content"}});

      // Combine all data into a single response object
      const responseData = {
        heroSection: { ...heroSection.toJSON(), images: heroSectionImage?heroSectionImage:null },
        content: Content ? Content.content:null,
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
