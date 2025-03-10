import ImagesData from "@/models/homePage/ImagesData";
import heroSectionContactPage from '@/models/contactPage/HeroSection';
import GetInTouch from "@/models/getInTouch";
import CommonSEO from "@/models/commonseo/SEO";

export default async function handler(req, res) {
  if (req.headers['x-system-key'] !== process.env.NEXT_PUBLIC_SYSTEM_KEY) {
    return res.status(401).json({ message: 'Unauthorized Access' });
  }
  if (req.method === 'GET') {
    try {
      // Fetch data from all tables concurrently
      const [heroSectionContact, getInTouchData] = await Promise.all([
        heroSectionContactPage.findAll(), 
        GetInTouch.findAll()
      ]);
      const seoData = await CommonSEO.findOne({ where: { pageType: "contact" }});
      const heroSectionImage = await  ImagesData.findAll({ where: { referenceType: "herosection_contact_page",referenceId:1 } });
      const getInTouchImage = await  ImagesData.findAll({ where: { referenceType: "get_in_touch",referenceId:[2,3,4]} });

    // Combine all data into a single response object
    const responseData = {
      heroSection: {heroSectionContact,Images:heroSectionImage},
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
