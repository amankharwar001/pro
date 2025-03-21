import HeroSectionAboutPage from '@/models/aboutPage/HeroSection.js';
import AboutSection2 from '@/models/aboutPage/Section2.js';
import AboutSection3 from '@/models/aboutPage/Section3.js';
import AboutSection4 from '@/models/aboutPage/Section4.js';
import AboutSection5 from '@/models/aboutPage/Section5.js';
import CommonSEO from '@/models/commonseo/SEO';
import ImagesData from '@/models/homePage/ImagesData.js';
import HideUnhideStatus from '@/models/hideUnhide';

const fetchDataSafely = async (fetchFunction, fallback = null) => {
    
    try {
        return await fetchFunction();
    } catch (error) {
        console.error(`Error fetching data:`, error);
        return fallback;
    }
};

const aboutPagePublic = async (req, res) => {
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

        // Fetch data only for active sections
        const heroSection = await fetchDataSafely(() => HeroSectionAboutPage.findAll(), []);
        const section2 = isSectionActive('about_section2') ? await fetchDataSafely(() => AboutSection2.findAll(), []) : [];
        const section3 = isSectionActive('about_section3') ? await fetchDataSafely(() => AboutSection3.findAll(), []) : [];
        const section4 = isSectionActive('about_section4') ? await fetchDataSafely(() => AboutSection4.findAll(), []) : [];
        const section5 = isSectionActive('about_section5') ? await fetchDataSafely(() => AboutSection5.findAll(), []) : [];
        const seoData = await fetchDataSafely(() => CommonSEO.findOne({ where: { pageType: "about" } }), []);

        // Fetch images for active sections
        const heroSectionImages = await fetchDataSafely(() =>
            ImagesData.findAll({ where: { referenceType: ['aboutpage_herosection'] } }), []
        );
        const section2Images = isSectionActive('about_section2') ? await fetchDataSafely(() =>
            ImagesData.findAll({ where: { referenceType: ['about_section_primaryImage', 'about_section_secondaryImage'] } }), []
        ) : [];
        const section3Images = isSectionActive('about_section3') ? await fetchDataSafely(() =>
            ImagesData.findAll({ where: { referenceType: 'aboutpage_section_3', referenceId: [1, 2, 3, 4, 5, 6] } }), []
        ) : [];
        const section4Images = isSectionActive('about_section4') ? await fetchDataSafely(() =>
            ImagesData.findAll({ where: { referenceType: ['about_section4_primaryImage', 'about_section4_secondaryImage', 'aboutpage_section_4'], referenceId: [1, 2] } }), []
        ) : [];

        // Combine data into a single response object
        const aboutPageData = {
            heroSection: heroSection[0] ? { ...heroSection[0].dataValues, images: heroSectionImages } : null,
            section2: section2[0] ? { ...section2[0].dataValues, images: section2Images } : null,
            section3: section3[0] ? { ...section3[0].dataValues, images: section3Images } : null,
            section4: section4[0] ? { ...section4[0].dataValues, images: section4Images } : null,
            section5: section5[0] ? { ...section5[0].dataValues } : null,
            seoData: seoData,
        };

        return res.status(200).json({ success: true, data: aboutPageData });
    } catch (error) {
        console.error('Error processing about page data:', error);
        return res.status(500).json({ success: false, message: 'Failed to fetch about page data', error: error.message });
    }
};

export default aboutPagePublic;
