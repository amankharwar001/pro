// // import BlogPageHeading from "@/models/blogPage/Main";
// import heroSectionCreatePage from "@/models/create-page/herosection";
// import CreatePageSEO from "@/models/create-page/SEO";
// export default async function handler(req, res) {
//     if (req.headers['x-system-key'] !== process.env.NEXT_PUBLIC_SYSTEM_KEY) {
//         return res.status(401).json({ message: 'Unauthorized Access' });
//     }
//     try {
//         if (req.method === "GET") {
//             // Fetch heading from the database
//             const heading = await heroSectionCreatePage.findAll();
//             const seoData = await CreatePageSEO.findAll();
//             if (heading) {
//                 return res.status(200).json({ heading: heading,seoData:seoData });
//             }
//             return res.status(404).json({ message: "Heading not found" });
//         } else {
//             return res.status(405).json({ message: "Method not allowed" });
//         }
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ message: "Internal server error" });
//     }
// }





// import heroSectionCreatePage from "@/models/create-page/herosection";
// import CreatePageSEO from "@/models/create-page/SEO";

// export default async function handler(req, res) {
//     if (req.headers['x-system-key'] !== process.env.NEXT_PUBLIC_SYSTEM_KEY) {
//         return res.status(401).json({ message: 'Unauthorized Access' });
//     }

//     try {
//         if (req.method === "GET") {
           
//             const headingData = await heroSectionCreatePage.findAll();
//             const seoData = await CreatePageSEO.findAll();

//             if (!headingData || headingData.length === 0) {
//                 return res.status(404).json({ message: "Headings not found" });
//             }

            
//             const seoMap = {};
//             seoData.forEach(seo => {
//                 seoMap[seo.id] = seo;
//             });

            
//             const mergedData = headingData.map(heading => ({
//                 ...heading.toJSON(),  
//                 seoData: seoMap[heading.id] || null 
//             }));

//             return res.status(200).json({ data: mergedData });
//         } else {
//             return res.status(405).json({ message: "Method not allowed" });
//         }
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ message: "Internal server error" });
//     }
// }






// import heroSectionCreatePage from "@/models/create-page/herosection";
// import CreatePageSEO from "@/models/create-page/SEO";

// export default async function handler(req, res) {
//     if (req.headers['x-system-key'] !== process.env.NEXT_PUBLIC_SYSTEM_KEY) {
//         return res.status(401).json({ message: 'Unauthorized Access' });
//     }

//     try {
//         if (req.method === "GET") {
//             const headingData = await heroSectionCreatePage.findAll();
//             const seoData = await CreatePageSEO.findAll();

//             if (!headingData || headingData.length === 0) {
//                 return res.status(404).json({ message: "Headings not found" });
//             }

//             // Convert seoData array into an object with id as key for fast lookup
//             const seoMap = {};
//             seoData.forEach(seo => {
//                 seoMap[seo.id] = seo.slug; // Store only the slug
//             });

//             // Merge and filter only required fields
//             const filteredData = headingData.map(heading => ({
//                 nickname: heading.nickname,
//                 heading: heading.heading,
//                 slug: seoMap[heading.id] || null 
//             }));

//             return res.status(200).json({ data: filteredData });
//         } else {
//             return res.status(405).json({ message: "Method not allowed" });
//         }
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ message: "Internal server error" });
//     }
// }








import heroSectionCreatePage from "@/models/create-page/herosection";
import CreatePageSEO from "@/models/create-page/SEO";

export default async function handler(req, res) {
    if (req.headers['x-system-key'] !== process.env.NEXT_PUBLIC_SYSTEM_KEY) {
        return res.status(401).json({ message: 'Unauthorized Access' });
    }

    try {
        if (req.method === "GET") {
            const headingData = await heroSectionCreatePage.findAll();
            const seoData = await CreatePageSEO.findAll();

            if (!headingData || headingData.length === 0) {
                return res.status(404).json({ message: "Headings not found" });
            }

            // Convert seoData array into an object with id as key for fast lookup
            const seoMap = {};
            seoData.forEach(seo => {
                seoMap[seo.id] = seo.slug; // Store only the slug
            });

            // Merge and filter only required fields
            const filteredData = headingData.map(heading => ({
                sectionType: heading.sectionType,
                nickname: heading.nickname,
                heading: heading.heading,
                slug: seoMap[heading.id] || null 
            }));

            return res.status(200).json({ data: filteredData });
        } else {
            return res.status(405).json({ message: "Method not allowed" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
