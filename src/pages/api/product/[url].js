// import ImagesData from "@/models/homePage/ImagesData";
// import HeroSectionProductPage from "@/models/productPage/HeroSectionProductPage";
// import Section2Product from "@/models/productPage/Section2Product";
// import Section3Product from "@/models/productPage/Section3Products";
// import Section4Product from "@/models/productPage/Section4Product";
// import Section5Product from "@/models/productPage/Section5Product";
// import Section6Product from "@/models/productPage/Section6Product";
// import Section7Product from "@/models/productPage/Section7Product";
// import SEOProductPage from "@/models/productPage/SEO";

// export default async function handler(req, res) {
//   const { url } = req.query;  // Get the id from the query

//   try {
//     const urlfilter = await SEOProductPage.findOne({ where: { slug:url } });
//     const id = urlfilter.heroSectionId;

//     // Fetch main entry
//     const heroSectionData = await HeroSectionProductPage.findOne({ where: { id } });
//     if (!heroSectionData) {
//       return res.status(404).json({ error: 'Main data not found' });
//     }

//     // Fetch related sections data
//     const section2Data = await Section2Product.findOne({ where: { heroSectionId: id } });
//     const section3Data = await Section3Product.findOne({ where: { heroSectionId: id } });
//     const section4Data = await Section4Product.findOne({ where: { heroSectionId: id } });
//     const section5Data = await Section5Product.findOne({ where: { heroSectionId: id } });
//     const section6Data = await Section6Product.findOne({ where: { heroSectionId: id } });
//     const section7Data = await Section7Product.findOne({ where: { heroSectionId: id } });
//     const seoData = await SEOProductPage.findOne({ where: { heroSectionId: id } });

//     // Fetch related sections data
//     const heroSectionImages = await ImagesData.findAll({ where: { referenceType: id,referenceId: [1] } });
//     const section2Images = await  ImagesData.findAll({ where: { referenceType: id,referenceId: [21,22,23,24] } });
//     const section3Images = await  ImagesData.findAll({ where: { referenceType: id,referenceId: [3,31,32] } });
//     const section4Images = await  ImagesData.findAll({ where: { referenceType: id,referenceId: [4] } });
//     const section5Images = await  ImagesData.findAll({ where: { referenceType: id,referenceId: [5,51,52,53] } });
//     const section6Images = await  ImagesData.findAll({ where: { referenceType: id,referenceId: [61,62,63] } });


//     // Combine all data into a single response object
//     const responseData = {
//       heroSection: {heroSectionData,Images:heroSectionImages},
//       section2: {section2Data,Images:section2Images},
//       section3: {section3Data,Images:section3Images},
//       section4: {section4Data,Images:section4Images},
//       section5: {section5Data,Images:section5Images},
//       section6: {section6Data,Images:section6Images},
//       section7: section7Data,
//       seo: seoData
//     };

//     return res.status(200).json(responseData);
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     return res.status(500).json({ error: 'Failed to fetch data', details: error.message });
//   }
// }


// here is some information where you can integrate this.....
// http://localhost:3000/api/product/your-slug
// http://localhost:3000/product/<dynamicendpoint>





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
  const { url } = req.query; // Get the URL slug

  try {
    const urlfilter = await SEOProductPage.findOne({ where: { slug: url } });
    const id = urlfilter.heroSectionId;

    // Fetch all hide/unhide statuses
    const sectionsStatus = await HideUnhideStatus.findAll();

    // Helper function to check section activity
    const isSectionActive = (sectionName) => {
      const section = sectionsStatus.find(s => s.SectionName === sectionName);
      return section && section.Status === 'Active';
    };

    // Fetch main entry if active
    const heroSectionData =await HeroSectionProductPage.findOne({ where: { id } });

    if (!heroSectionData) {
      return res.status(404).json({ error: 'Main data not found or inactive' });
    }

    // Fetch related sections data if active
    const section2Data = isSectionActive(`product_section2${id}`)
      ? await Section2Product.findOne({ where: { heroSectionId: id } })
      : null;

    const section3Data = isSectionActive(`product_section3${id}`)
      ? await Section3Product.findOne({ where: { heroSectionId: id } })
      : null;

    const section4Data = isSectionActive(`product_section4${id}`)
      ? await Section4Product.findOne({ where: { heroSectionId: id } })
      : null;

    const section5Data = isSectionActive(`product_section5${id}`)
      ? await Section5Product.findOne({ where: { heroSectionId: id } })
      : null;

    const section6Data = isSectionActive(`product_section6${id}`)
      ? await Section6Product.findOne({ where: { heroSectionId: id } })
      : null;

    const section7Data = isSectionActive(`product_section7${id}`)
      ? await Section7Product.findOne({ where: { heroSectionId: id } })
      : null;

    const seoData = await SEOProductPage.findOne({ where: { heroSectionId: id } });

    // Fetch images for active sections
    const heroSectionImages = await ImagesData.findAll({ where: { referenceType: id, referenceId: [1] } });

    const section2Images = isSectionActive(`product_section2${id}`)
      ? await ImagesData.findAll({ where: { referenceType: id, referenceId: [21, 22, 23, 24] } })
      : [];

    const section3Images = isSectionActive(`product_section3${id}`)
      ? await ImagesData.findAll({ where: { referenceType: id, referenceId: [3, 31, 32] } })
      : [];

    const section4Images = isSectionActive(`product_section4${id}`)
      ? await ImagesData.findAll({ where: { referenceType: id, referenceId: [4] } })
      : [];

    const section5Images = isSectionActive(`product_section5${id}`)
      ? await ImagesData.findAll({ where: { referenceType: id, referenceId: [5, 51, 52, 53] } })
      : [];

    const section6Images = isSectionActive(`product_section6${id}`)
      ? await ImagesData.findAll({ where: { referenceType: id, referenceId: [61, 62, 63] } })
      : [];

    // Combine all data into a single response object
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
