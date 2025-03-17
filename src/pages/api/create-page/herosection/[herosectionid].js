// import heroSectionCreatePage from "@/models/create-page/herosection";


// export default async function handler(req, res) {
//   if (req.headers['x-system-key'] !== process.env.NEXT_PUBLIC_SYSTEM_KEY) {
//     return res.status(401).json({ message: 'Unauthorized Access' });
//   }
//   const { herosectionid } = req.query;  // Get the herosectionid from the query

//   // If it's a PUT request, update the existing entry
//   if (req.method === 'PUT') {
//     try {
//       const { sectionType, nickname, title, heading, text, btn, btnLink } = req.body;

//       // Find the entry based on the herosectionid
//       let existingEntry = await heroSectionCreatePage.findOne({ where: { id: herosectionid } });

//       if (existingEntry) {
//         // If an entry exists, update it
//         const updatedEntry = await existingEntry.update({
//           sectionType: sectionType,
//           nickname: nickname,
//           title: title,
//           heading: heading,
//           text: text,
//           btn: btn,
//           btnLink: btnLink,
//         });

//         return res.status(200).json(updatedEntry);
//       } else {

//         return res.status(404).json({ error: 'No data found to update' });
//       }
//     } catch (error) {
//       console.error('Error handling data:', error);
//       return res.status(500).json({ error: 'Failed to update data' });
//     }
//   }


//   else if (req.method === 'POST') {
//     try {
//       const { sectionType, nickname, title, heading, text, btn, btnLink } = req.body;


//       const existingEntry = await heroSectionCreatePage.findOne({ where: { id: herosectionid } });

//       if (existingEntry) {
//         return res.status(400).json({ error: 'Entry already exists. Use PUT to update it.' });
//       } else {

//         const newEntry = await heroSectionCreatePage.create({
//           id: herosectionid,
//           sectionType: sectionType,
//           nickname: nickname,
//           title: title,
//           heading: heading,
//           text: text,
//           btn: btn,
//           btnLink: btnLink,
//         });

//         return res.status(201).json(newEntry);
//       }
//     } catch (error) {
//       console.error('Error creating data:', error);
//       return res.status(500).json({ error: 'Failed to create data aman' });
//     }
//   }


//   else if (req.method === 'GET') {
//     try {
//       const entry = await heroSectionCreatePage.findOne({ where: { id: herosectionid } });

//       if (!entry) {
//         return res.status(404).json({ error: 'No data found' });
//       }

//       return res.status(200).json(entry);
//     } catch (error) {
//       console.error('Error reading data:', error);
//       return res.status(500).json({ error: 'Failed to fetch data' });
//     }
//   }


//   else {
//     return res.status(405).json({ error: 'Method Not Allowed' });
//   }
// }









































import heroSectionCreatePage from "@/models/create-page/herosection";
import CreatePageSEO from "@/models/create-page/SEO";

export default async function handler(req, res) {
  if (req.headers["x-system-key"] !== process.env.NEXT_PUBLIC_SYSTEM_KEY) {
    return res.status(401).json({ message: "Unauthorized Access" });
  }

  const generateSlug = (text) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const { herosectionid } = req.query; // Get the herosectionid from the query

  // PUT Request: Update existing entry
  if (req.method === "PUT") {
    try {
      const { sectionType, nickname, title, heading, text, btn, btnLink } = req.body;
      console.log("PUT Request Received for ID:", herosectionid);

      let existingEntry = await heroSectionCreatePage.findOne({ where: { id: herosectionid } });
      console.log("Existing Entry Found:", existingEntry);

      if (!existingEntry) {
        console.log("No data found to update.");
        return res.status(404).json({ error: "No data found to update" });
      }

      const updatedEntry = await existingEntry.update({
        sectionType,
        nickname,
        title,
        heading,
        text,
        btn,
        btnLink,
      });

      console.log("Entry Updated Successfully:", updatedEntry);
      return res.status(200).json(updatedEntry);
    } catch (error) {
      console.error("Error handling PUT request:", error);
      return res.status(500).json({ error: "Failed to update data" });
    }
  }

  // POST Request: Create new entry
  else if (req.method === "POST") {
    try {
      const { sectionType, nickname, title, heading, text, btn, btnLink } = req.body;
      console.log("POST Request Received for ID:", herosectionid);

      const existingEntry = await heroSectionCreatePage.findOne({ where: { id: herosectionid } });
      console.log("Checking if entry already exists:", existingEntry);

      if (existingEntry) {
        console.log("Entry already exists. Returning error.");
        return res.status(400).json({ error: "Entry already exists. Use PUT to update it." });
      }

      console.log("Creating new Hero Section Entry...");
      const newEntry = await heroSectionCreatePage.create({
        id: herosectionid,
        sectionType,
        nickname,
        title,
        heading,
        text,
        btn,
        btnLink,
      });
      console.log("Hero Section Entry Created:", newEntry);

      if (heading) {
        console.log("Generating slug for heading:", heading);
        const slug = generateSlug(heading);
        console.log("Generated Slug:", slug);

        try {
          console.log("Saving SEO Entry...");
          const seoEntry = await CreatePageSEO.create({
            id: herosectionid, // Assigning ID
            title: heading,
            slug: slug,
          });
          console.log("SEO Entry Created Successfully:", seoEntry);
        } catch (seoError) {
          console.error("Error saving SEO entry:", seoError);
        }
      } else {
        console.log("No heading provided, skipping SEO entry.");
      }

      return res.status(201).json(newEntry);
    } catch (error) {
      console.error("Error creating POST entry:", error);
      return res.status(500).json({ error: "Failed to create data" });
    }
  }

  // GET Request: Fetch entry
  else if (req.method === "GET") {
    try {
      console.log("GET Request Received for ID:", herosectionid);
      const entry = await heroSectionCreatePage.findOne({ where: { id: herosectionid } });
      console.log("Fetched Entry:", entry);

      if (!entry) {
        console.log("No data found.");
        return res.status(404).json({ error: "No data found" });
      }

      return res.status(200).json(entry);
    } catch (error) {
      console.error("Error reading data:", error);
      return res.status(500).json({ error: "Failed to fetch data" });
    }
  }

  // Unsupported request method
  else {
    console.log("Method Not Allowed:", req.method);
    return res.status(405).json({ error: "Method Not Allowed" });
  }
}
