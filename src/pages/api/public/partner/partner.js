import ImagesData from "@/models/homePage/ImagesData";
// import HeroSectionPatnerPage from '@/models/contactPage/HeroSection';
import GetInTouch from "@/models/getInTouch";
import CommonSEO from "@/models/commonseo/SEO";
import HeroSectionPatnerPage from '@/models/partnerPage/HeroSection';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Fetch data from all tables concurrently
      const [heroSectionPartner, getInTouchData] = await Promise.all([
        HeroSectionPatnerPage.findAll(), 
        GetInTouch.findAll()
      ]);
      const seoData = await CommonSEO.findOne({ where: { pageType: "partner-page" }});
      const heroSectionImage = await  ImagesData.findAll({ where: { referenceType: "herosection_partner_page",referenceId:1 } });
      const getInTouchImage = await  ImagesData.findAll({ where: { referenceType: "get_in_touch",referenceId:[2,3,4]} });

    // Combine all data into a single response object
    const responseData = {
      heroSection: {heroSectionPartner,Images:heroSectionImage},
      getInTouchData: {getInTouchData,Images:getInTouchImage},
      seoData:seoData
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
