
// script models 
import HeadScript from "@/models/Script/HeadScript";
import BodyScript from "@/models/Script/BodyScript";
import FooterScript from "@/models/Script/FooterScript";

// Utility function to safely fetch data
const fetchDataSafely = async (fetchFunction, fallback = null) => {
    if (req.headers['x-system-key'] !== process.env.NEXT_PUBLIC_SYSTEM_KEY) {
        return res.status(401).json({ message: 'Unauthorized Access' });
      }
    try {
        return await fetchFunction();
    } catch (error) {
        console.error(`Error fetching data:`, error);
        return fallback;
    }
};

// API endpoint to get header, footer, body, and scripts
const contentPublic = async (req, res) => {
    if (req.method !== 'GET') {
        res.setHeader('Allow', ['GET']);
        return res.status(405).json({ success: false, message: `Method ${req.method} not allowed` });
    }

    try {
        // Fetch header, footer, body, script, and SEO data
        const headerData = await fetchDataSafely(() => HeadScript.findAll(), []);
        const bodyData = await fetchDataSafely(() => BodyScript.findAll(), []);
        const footerData = await fetchDataSafely(() => FooterScript.findAll(), []);
        
        // Combine data into a single response object
        const contentResponse = {
            header: headerData ? headerData : null,
            footer: footerData ? footerData : null,
            body: bodyData ? bodyData : null,
            
        };

        return res.status(200).json({ success: true, contentResponse });
    } catch (error) {
        console.error('Error processing content data:', error);
        return res.status(500).json({ success: false, message: 'Failed to fetch content data', error: error.message });
    }
};

export default contentPublic;
