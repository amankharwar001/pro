import ImagesData from '@/models/homePage/ImagesData.js';
import HomeHeroSection from '@/models/homePage/HeroSection.js';
import Section11 from '@/models/homePage/Section11.js';
import Section2 from '@/models/homePage/Section2.js';
import Section3 from '@/models/homePage/Section3.js';
import Section4 from '@/models/homePage/Section4.js';
import Section5 from '@/models/homePage/Section5.js';
import Section6 from '@/models/homePage/Section6.js';
import Section7 from '@/models/homePage/Section7.js';
import Section8 from '@/models/homePage/Section8.js';
import Section9 from '@/models/homePage/Section9.js';
import Testimonial from '@/models/homePage/Testimonial.js';
import HomeFAQ from '@/models/homePage/HomeFAQ.js';
import CommonSEO from '@/models/commonseo/SEO';
// 
const fetchDataSafely = async (fetchFunction, fallback = null) => {
    try {
        return await fetchFunction();
    } catch (error) {
        console.error(`Error fetching data:`, error);
        return fallback;
    }
};

const homepagePublic = async (req, res) => {
    if (req.method !== 'GET') {
        res.setHeader('Allow', ['GET']);
        return res.status(405).json({ success: false, message: `Method ${req.method} not allowed` });
    }

    try {
        // Fetch all sections with individual try-catch wrappers
        const heroSection = await fetchDataSafely(() => HomeHeroSection.findAll(), []);
        const section11 = await fetchDataSafely(() => Section11.findAll(), []);
        const section2 = await fetchDataSafely(() => Section2.findAll(), []);
        const section3 = await fetchDataSafely(() => Section3.findAll(), []);
        const section4 = await fetchDataSafely(() => Section4.findAll(), []);
        const section5 = await fetchDataSafely(() => Section5.findAll(), []);
        const section6 = await fetchDataSafely(() => Section6.findAll(), []);
        const section7 = await fetchDataSafely(() => Section7.findAll(), []);
        const section8 = await fetchDataSafely(() => Section8.findAll(), []);
        const section9 = await fetchDataSafely(() => Section9.findAll(), []);
        const testimonials = await fetchDataSafely(() => Testimonial.findAll(), []);
        const faq = await fetchDataSafely(() => HomeFAQ.findAll(), []);
        const seoData = await fetchDataSafely(() => CommonSEO.findOne({ where: { pageType: "home" }}), []);

        // Fetch images with try-catch wrappers
        const heroSectionImages = await fetchDataSafely(() => ImagesData.findAll({ where: { referenceType: ['hero_section'] } }), []);
        const section2Images = await fetchDataSafely(() => ImagesData.findAll({ where: { referenceType: ['homepage_section_2'] } }), []);
        const section3Images = await fetchDataSafely(() => ImagesData.findAll({ where: { referenceType: ['home_section3_1', 'home_section3_2', 'homepage_section_3'] } }), []);
        const section4Images = await fetchDataSafely(() => ImagesData.findAll({ where: { referenceType: ['homepage_section4', 'homepage_section_4'] } }), []);
        const section5Images = await fetchDataSafely(() => ImagesData.findAll({ where: { referenceType: ['homepage_section5_1', 'homepage_section5_2', 'homepage_section5_3'] } }), []);
        const section6Images = await fetchDataSafely(() => ImagesData.findAll({ where: { referenceType: ['homepage_section1', 'homepage_section2', 'homepage_section3'] } }), []);
        const section7Images = await fetchDataSafely(() => ImagesData.findAll({ where: { referenceType: ['homepage_section7_primary', 'homepage_section7_1'] } }), []);
        const section8Images = await fetchDataSafely(() => ImagesData.findAll({ where: { referenceType: ['homepage_section_8_primary', 'homepage_section_8'] } }), []);
        const section9Images = await fetchDataSafely(() => ImagesData.findAll({ where: { referenceType: ['homepage_section_9'] } }), []);
        const section11Images = await fetchDataSafely(() => ImagesData.findAll({ where: { referenceType: ['homepage_section_11_primary'] } }), []);
        const testimonialsImages = await fetchDataSafely(() => ImagesData.findAll({ where: { referenceType: ['homepage_testimonial'] } }), []);
        // Combine data into a single response object
        const homepageData = {
            heroSection: heroSection[0] ? { ...heroSection[0].dataValues, images: heroSectionImages } : null,
            section11: section11[0] ? { ...section11[0].dataValues, images: section11Images } : null,
            section2: section2[0] ? { ...section2[0].dataValues, images: section2Images } : null,
            section3: section3[0] ? { ...section3[0].dataValues, images: section3Images } : null,
            section4: section4[0] ? { ...section4[0].dataValues, images: section4Images } : null,
            section5: section5[0] ? { ...section5[0].dataValues, images: section5Images } : null,
            section6: section6[0] ? { ...section6[0].dataValues, images: section6Images } : null,
            section7: section7[0] ? { ...section7[0].dataValues, images: section7Images } : null,
            section8: section8[0] ? { ...section8[0].dataValues, images: section8Images } : null,
            section9: section9[0] ? { ...section9[0].dataValues, images: section9Images } : null,
            testimonials: testimonials[0] ? { ...testimonials[0].dataValues, images: testimonialsImages } : null,
            faq: faq[0],
            seoData:seoData
        };

        return res.status(200).json({ success: true, data: homepageData });
    } catch (error) {
        console.error('Error processing homepage data:', error);
        return res.status(500).json({ success: false, message: 'Failed to fetch homepage data', error: error.message });
    }
};

export default homepagePublic;
 
//    h 