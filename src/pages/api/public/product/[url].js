
import ImagesData from "@/models/homePage/ImagesData";
import HeroSectionProductPage from "@/models/productPage/HeroSectionProductPage";
import Section2Product from "@/models/productPage/Section2Product";
import Section3Product from "@/models/productPage/Section3Products";
import Section4Product from "@/models/productPage/Section4Product";
import Section5Product from "@/models/productPage/Section5Product";
import Section6Product from "@/models/productPage/Section6Product";
import Section7Product from "@/models/productPage/Section7Product";
import SEOProductPage from "@/models/productPage/SEO";
import HideUnhideStatus from '@/models/hideUnhide';

export default async function handler(req, res) {
  if (req.headers['x-system-key'] !== process.env.NEXT_PUBLIC_SYSTEM_KEY) {
    return res.status(401).json({ message: 'Unauthorized Access' });
  }
  const { url } = req.query; // Get the URL slug

  try {
    const urlfilter = await SEOProductPage.findOne({ where: { slug: url } });

    let id;
    if (urlfilter) {
      id = urlfilter.heroSectionId;
    } else {
      // URL ko Hero Section heading format me convert karna (hyphen -> space)
      const formattedHeading = url.replace(/-/g, ' '); // Replace hyphens with spaces

      const heroSection = await HeroSectionProductPage.findOne({ where: { heading: formattedHeading } });
      if (!heroSection) {
        return res.status(404).json({ error: 'Invalid URL: No matching data found' });
      }
      id = heroSection.id;
    }

    // Fetch all hide/unhide statuses
    const sectionsStatus = await HideUnhideStatus.findAll();

    // Helper function to check section activity
    const isSectionActive = (sectionName) => {
      const section = sectionsStatus.find(s => s.SectionName === sectionName);
      return section?.Status === 'Active';
    };

    const heroSectionData = await HeroSectionProductPage.findOne({ where: { id } });

    if (!heroSectionData) {
      return res.status(404).json({ error: 'Main data not found or inactive' });
    }

    const section2Data = isSectionActive(`product_section2${id}`)
      ? await Section2Product.findOne({ where: { heroSectionId: id } }) || null
      : null;

    const section3Data = isSectionActive(`product_section3${id}`)
      ? await Section3Product.findOne({ where: { heroSectionId: id } }) || null
      : null;

    const section4Data = isSectionActive(`product_section4${id}`)
      ? await Section4Product.findOne({ where: { heroSectionId: id } }) || null
      : null;

    const section5Data = isSectionActive(`product_section5${id}`)
      ? await Section5Product.findOne({ where: { heroSectionId: id } }) || null
      : null;

    const section6Data = isSectionActive(`product_section6${id}`)
      ? await Section6Product.findOne({ where: { heroSectionId: id } }) || null
      : null;

    const section7Data = isSectionActive(`product_section7${id}`)
      ? await Section7Product.findOne({ where: { heroSectionId: id } }) || null
      : null;

    const seoData = await SEOProductPage.findOne({ where: { heroSectionId: id } });

    const heroSectionImages = await ImagesData.findAll({ where: { referenceType: id, referenceId: [1] } });

    const section2Images = section2Data
      ? await ImagesData.findAll({ where: { referenceType: id, referenceId: [21, 22, 23, 24] } })
      : [];

    const section3Images = section3Data
      ? await ImagesData.findAll({ where: { referenceType: id, referenceId: [3, 31, 32] } })
      : [];

    const section4Images = section4Data
      ? await ImagesData.findAll({ where: { referenceType: id, referenceId: [41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90] } })
      : [];

    const section5Images = section5Data
      ? await ImagesData.findAll({ where: { referenceType: id, referenceId: [5, 51, 52, 53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70] } })
      : [];

    const section6Images = section6Data
      ? await ImagesData.findAll({ where: { referenceType: id, referenceId: [61, 62, 63] } })
      : [];

    const responseData = {
      heroSection: heroSectionData ? { heroSectionData, Images: heroSectionImages } : null,
      section2: section2Data ? { section2Data, Images: section2Images } : null,
      section3: section3Data ? { section3Data, Images: section3Images } : null,
      section4: section4Data ? { section4Data, Images: section4Images } : null,
      section5: section5Data ? { section5Data, Images: section5Images } : null,
      section6: section6Data ? { section6Data, Images: section6Images } : null,
      section7: section7Data || null,
      seo: seoData,
    };

    return res.status(200).json(responseData);
  } catch (error) {
    console.error('Error fetching data:', error);
    return res.status(500).json({ error: 'Failed to fetch data', details: error.message });
  }
}
