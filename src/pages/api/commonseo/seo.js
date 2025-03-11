import CommonSEO from "@/models/commonseo/SEO";

export default async function handler(req, res) {
  if (req.headers['x-system-key'] !== process.env.NEXT_PUBLIC_SYSTEM_KEY) {
    return res.status(401).json({ message: 'Unauthorized Access' });
  }
  const { pageType } = req.query; // pageType ko query se fetch karenge

  if (!pageType) {
    return res.status(400).json({ error: "pageType is required in the query" });
  }

  // Handle GET Request: Fetch SEO data based on pageType
  if (req.method === "GET") {
    try {
      const seoData = await CommonSEO.findOne({ where: { pageType } });

      if (!seoData) {
        return res.status(404).json({ error: "No SEO data found for this pageType" });
      }

      return res.status(200).json(seoData);
    } catch (error) {
      console.error("Error fetching SEO data:", error);
      return res.status(500).json({ error: "Failed to fetch data" });
    }
  }

  // Handle POST Request: Create a new entry if it doesn't exist
  else if (req.method === "POST") {
    try {
      const { title, description, keyword } = req.body;

      // Input Validation
      if (!title || !description || !keyword) {
        return res.status(400).json({ error: "Title, description, and keyword are required" });
      }

      // Check if entry already exists for the pageType
      const existingEntry = await CommonSEO.findOne({ where: { pageType } });

      if (existingEntry) {
        return res.status(400).json({ error: "SEO data already exists for this pageType. Use PUT to update it." });
      }

      // Create a new entry
      const newEntry = await CommonSEO.create({
        title,
        description,
        pageType,
        keyword,
      });

      return res.status(201).json(newEntry);
    } catch (error) {
      console.error("Error creating SEO data:", error);
      return res.status(500).json({ error: "Failed to create data" });
    }
  }

  // Handle PUT Request: Update existing SEO data
  else if (req.method === "PUT") {
    try {
      const { title, description, keyword } = req.body;

      // Input Validation
      if (!title || !description || !keyword) {
        return res.status(400).json({ error: "Title, description, and keyword are required" });
      }

      // Check if entry exists for the pageType
      const existingEntry = await CommonSEO.findOne({ where: { pageType } });

      if (!existingEntry) {
        return res.status(404).json({ error: "No SEO data found for this pageType" });
      }

      // Update the existing entry
      existingEntry.title = title;
      existingEntry.description = description;
      existingEntry.keyword = keyword;
      await existingEntry.save();

      return res.status(200).json(existingEntry);
    } catch (error) {
      console.error("Error updating SEO data:", error);
      return res.status(500).json({ error: "Failed to update data" });
    }
  }

  // Handle Unsupported HTTP Methods
  else {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
}
