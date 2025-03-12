// import heroSectionProductPage from "@/models/productPage/HeroSectionProductPage";

// export default async function handler(req, res) {
//   if (req.headers['x-system-key'] !== process.env.NEXT_PUBLIC_SYSTEM_KEY) {
//     return res.status(401).json({ message: 'Unauthorized Access' });
//   }
//   const { herosectionid } = req.query;  // Get the herosectionid from the query

//   // If it's a PUT request, update the existing entry
//   if (req.method === 'PUT') {
//     try {
//       const { nickname,title, heading, text, btn, btnLink } = req.body;

//       // Find the entry based on the herosectionid
//       let existingEntry = await heroSectionProductPage.findOne({ where: { id: herosectionid } });

//       if (existingEntry) {
//         // If an entry exists, update it
//         const updatedEntry = await existingEntry.update({
//           nickname:nickname,
//           title: title,
//           heading: heading,
//           text: text,
//           btn: btn,
//           btnLink: btnLink,
//         });

//         return res.status(200).json(updatedEntry);  // Return the updated entry
//       } else {
//         // If no entry exists, return 404
//         return res.status(404).json({ error: 'No data found to update' });
//       }
//     } catch (error) {
//       console.error('Error handling data:', error);
//       return res.status(500).json({ error: 'Failed to update data' });
//     }
//   }

//   // If it's a POST request, create a new entry (if no data exists yet)
//   else if (req.method === 'POST') {
//     try {
//       const { nickname,title, heading, text, btn, btnLink } = req.body;

//       // Check if an entry already exists for the given herosectionid
//       const existingEntry = await heroSectionProductPage.findOne({ where: { id: herosectionid } });

//       if (existingEntry) {
//         return res.status(400).json({ error: 'Entry already exists. Use PUT to update it.' });
//       } else {
//         // Create a new entry
//         const newEntry = await heroSectionProductPage.create({
//           id: herosectionid,  // Use herosectionid for the id
//           nickname:nickname,
//           title: title,
//           heading: heading,
//           text: text,
//           btn: btn,
//           btnLink: btnLink,
//         });

//         return res.status(201).json(newEntry);  // Return the newly created entry
//       }
//     } catch (error) {
//       console.error('Error creating data:', error);
//       return res.status(500).json({ error: 'Failed to create data' });
//     }
//   }

//   // If it's a GET request, fetch the entry by herosectionid
//   else if (req.method === 'GET') {
//     try {
//       const entry = await heroSectionProductPage.findOne({ where: { id: herosectionid } });

//       if (!entry) {
//         return res.status(404).json({ error: 'No data found' });
//       }

//       return res.status(200).json(entry);  // Return the existing entry
//     } catch (error) {
//       console.error('Error reading data:', error);
//       return res.status(500).json({ error: 'Failed to fetch data' });
//     }
//   }

//   // If any other HTTP method is used, return Method Not Allowed
//   else {
//     return res.status(405).json({ error: 'Method Not Allowed' });
//   }
// }











import heroSectionProductPage from "@/models/productPage/HeroSectionProductPage";

export default async function handler(req, res) {
  if (req.headers["x-system-key"] !== process.env.NEXT_PUBLIC_SYSTEM_KEY) {
    return res.status(401).json({ message: "Unauthorized Access" });
  }

  const { herosectionid } = req.query; // Get herosectionid from query

  try {
    if (req.method === "GET") {
      // ✅ Fetch entry by ID
      if (!herosectionid) {
        return res.status(400).json({ error: "herosectionid is required" });
      }

      const entry = await heroSectionProductPage.findOne({ where: { id: herosectionid } });

      if (!entry) {
        return res.status(404).json({ error: "No data found" });
      }

      return res.status(200).json(entry);
    }

    if (req.method === "POST") {
      // ✅ Create a new entry
      const { id, nickname, title, heading, text, btn, btnLink } = req.body;

      if (!id) {
        return res.status(400).json({ error: "ID is required for creation" });
      }

      const existingEntry = await heroSectionProductPage.findOne({ where: { id } });

      if (existingEntry) {
        return res.status(400).json({ error: "Entry already exists. Use PUT to update it." });
      }

      const newEntry = await heroSectionProductPage.create({
        id,
        nickname,
        title,
        heading,
        text,
        btn,
        btnLink,
      });

      return res.status(201).json(newEntry);
    }

    if (req.method === "PUT") {
      // ✅ Update an existing entry
      if (!herosectionid) {
        return res.status(400).json({ error: "herosectionid is required for update" });
      }

      const { nickname, title, heading, text, btn, btnLink } = req.body;
      const existingEntry = await heroSectionProductPage.findOne({ where: { id: herosectionid } });

      if (!existingEntry) {
        return res.status(404).json({ error: "No data found to update" });
      }

      const updatedEntry = await existingEntry.update({
        nickname,
        title,
        heading,
        text,
        btn,
        btnLink,
      });

      return res.status(200).json(updatedEntry);
    }

    if (req.method === "DELETE") {
      // ✅ Delete an entry
      if (!herosectionid) {
        return res.status(400).json({ error: "herosectionid is required for deletion" });
      }

      const existingEntry = await heroSectionProductPage.findOne({ where: { id: herosectionid } });

      if (!existingEntry) {
        return res.status(404).json({ error: "No data found to delete" });
      }

      await existingEntry.destroy();
      return res.status(200).json({ message: "Entry deleted successfully" });
    }

    // ❌ Method Not Allowed
    return res.status(405).json({ error: "Method Not Allowed" });

  } catch (error) {
    console.error("Error handling data:", error);
    return res.status(500).json({ error: "Server Error" });
  }
}
