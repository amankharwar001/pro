
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
import HideUnhideStatus from '@/models/hideUnhide';

const fetchDataSafely = async (fetchFunction, fallback = null) => {
    
    try {
        return await fetchFunction();
    } catch (error) {
        console.error(`Error fetching data:`, error);
        return fallback;
    }
};

const homepagePublic = async (req, res) => {
    if (req.headers['x-system-key'] !== process.env.NEXT_PUBLIC_SYSTEM_KEY) {
        return res.status(401).json({ message: 'Unauthorized Access' });
      }
    if (req.method !== 'GET') {
        res.setHeader('Allow', ['GET']);
        return res.status(405).json({ success: false, message: `Method ${req.method} not allowed` });
    }

    try {
        const sectionsStatus = await HideUnhideStatus.findAll();

        const isSectionActive = (sectionName) => {
            const section = sectionsStatus.find(s => s.SectionName === sectionName);
            return section && section.Status === 'Active';
        };

        // Fetch sections only if their status is active
        const heroSection = await fetchDataSafely(() => HomeHeroSection.findAll(), []);
        const section11 = isSectionActive('homepage_section11') ? await fetchDataSafely(() => Section11.findAll(), []) : [];
        const section2 = isSectionActive('homepage_section2') ? await fetchDataSafely(() => Section2.findAll(), []) : [];
        const section3 = isSectionActive('homepage_section3') ? await fetchDataSafely(() => Section3.findAll(), []) : [];
        const section4 = isSectionActive('homepage_section4') ? await fetchDataSafely(() => Section4.findAll(), []) : [];
        const section5 = isSectionActive('homepage_section5') ? await fetchDataSafely(() => Section5.findAll(), []) : [];
        const section6 = isSectionActive('homepage_section6') ? await fetchDataSafely(() => Section6.findAll(), []) : [];
        const section7 = isSectionActive('homepage_section7') ? await fetchDataSafely(() => Section7.findAll(), []) : [];
        const section8 = isSectionActive('homepage_section8') ? await fetchDataSafely(() => Section8.findAll(), []) : [];
        const section9 = isSectionActive('homepage_section9') ? await fetchDataSafely(() => Section9.findAll(), []) : [];
        const testimonials = isSectionActive('homepage_section10') ? await fetchDataSafely(() => Testimonial.findAll(), []) : [];
        const faq = isSectionActive('homepage_section12') ? await fetchDataSafely(() => HomeFAQ.findAll(), []) : [];
        const seoData = await fetchDataSafely(() => CommonSEO.findOne({ where: { pageType: "home" } }), []);

        // Fetch images for each section
        const heroSectionImages = await fetchDataSafely(() => ImagesData.findAll({ where: { referenceType: ['hero_section'] } }), []);
        const section2Images = isSectionActive('homepage_section2') ? await fetchDataSafely(() => ImagesData.findAll({ where: { referenceType: ['homepage_section_2'] } }), []) : [];
        const section2_2Images = isSectionActive('homepage_section2') ? await fetchDataSafely(() => ImagesData.findAll({ where: { referenceType: ['homepage_section_2_2'] } }), []) : [];
        const section3Images = isSectionActive('homepage_section3') ? await fetchDataSafely(() => ImagesData.findAll({ where: { referenceType: ['home_section3_1', 'home_section3_2', 'homepage_section_3'] } }), []) : [];
        const section4Images = isSectionActive('homepage_section4') ? await fetchDataSafely(() => ImagesData.findAll({ where: { referenceType: ['homepage_section4', 'homepage_section4_png1','homepage_section4_png2',"homepage_section4_png3"] } }), []) : [];
        const section5Images = isSectionActive('homepage_section5') ? await fetchDataSafely(() => ImagesData.findAll({ where: { referenceType: ['homepage_section5_1', 'homepage_section5_2', 'homepage_section5_3'] } }), []) : [];
        // const section6Images = isSectionActive('homepage_section6') ? await fetchDataSafely(() => ImagesData.findAll({ where: { referenceType: ['homepage_section6_1', 'homepage_section6_2', 'homepage_section6_3','homepage_section6_4','homepage_section6_5','homepage_section6_6','homepage_section6_7','homepage_section6_8','homepage_section6_9','homepage_section6_10','homepage_section6_11'] } }), []) : [];
        const section6Images = isSectionActive('homepage_section6')
            ? await fetchDataSafely(() => ImagesData.findAll({
                where: {
                    referenceType: [
                        'homepage_section6_1',
                        'homepage_section6_2',
                        'homepage_section6_3',
                        'homepage_section6_4',
                        'homepage_section6_5',
                        'homepage_section6_6',
                        'homepage_section6_7',
                        'homepage_section6_8',
                        'homepage_section6_9',
                        'homepage_section6_10',
                        'homepage_section6_11',
                        'homepage_section6_12',
                        'homepage_section6_13',
                        'homepage_section6_14',
                        'homepage_section6_15',
                        'homepage_section6_16',
                        'homepage_section6_17',
                        'homepage_section6_18',
                        'homepage_section6_19',
                        'homepage_section6_20'
                    ]
                },
                order: [['referenceType', 'ASC']] 
            }), [])
            : [];

        const section7Images = isSectionActive('homepage_section7') ? await fetchDataSafely(() => ImagesData.findAll({ where: { referenceType: ['homepage_section7_primary', 'homepage_section7_1'] } }), []) : [];
        const section8Images = isSectionActive('homepage_section8') ? await fetchDataSafely(() => ImagesData.findAll({ where: { referenceType: ['homepage_section_8_primary' ] } }), []) : [];
        const section8ImagesGroup = isSectionActive('homepage_section8') ? await fetchDataSafely(() => ImagesData.findAll({ where: { referenceType: ['homepage_section_8'] } }), []) : [];
        const section9Images = isSectionActive('homepage_section9') ? await fetchDataSafely(() => ImagesData.findAll({ where: { referenceType: ['homepage_section_9'] } }), []) : [];
        const section11Images = isSectionActive('homepage_section11') ? await fetchDataSafely(() => ImagesData.findAll({ where: { referenceType: ['homepage_section_11_primary'] } }), []) : [];
        const testimonialsImages = isSectionActive('homepage_section10') ? await fetchDataSafely(() => ImagesData.findAll({ where: { referenceType: ['homepage_testimonial_primary','homepage_testimonial'] } }), []) : [];

        // Combine section data and image data
        const homepageData = {
            heroSection: heroSection[0] ? { ...heroSection[0].dataValues, images: heroSectionImages } : null,
            section11: section11[0] ? { ...section11[0].dataValues, images: section11Images } : null,
            section2: section2[0] ? { ...section2[0].dataValues, images: [section2Images,section2_2Images] } : null,
            section3: section3[0] ? { ...section3[0].dataValues, images: section3Images } : null,
            section4: section4[0] ? { ...section4[0].dataValues, images: section4Images } : null,
            section5: section5[0] ? { ...section5[0].dataValues, images: section5Images } : null,
            section6: section6[0] ? { ...section6[0].dataValues, images: section6Images } : null,
            section7: section7[0] ? { ...section7[0].dataValues, images: section7Images } : null,
            section8: section8[0] ? { ...section8[0].dataValues, images: section8Images,multiImages:section8ImagesGroup } : null,
            section9: section9[0] ? { ...section9[0].dataValues, images: section9Images } : null,
            testimonials: testimonials[0] ? { ...testimonials[0].dataValues, images: testimonialsImages } : null,
            faq: faq[0],
            seoData: seoData
        };

        return res.status(200).json({ success: true, data: homepageData });
    } catch (error) {
        console.error('Error processing homepage data:', error);
        return res.status(500).json({ success: false, message: 'Failed to fetch homepage data', error: error.message });
    }
};

export default homepagePublic;
