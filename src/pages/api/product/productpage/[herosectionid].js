import heroSectionProductPage from "@/models/productPage/HeroSectionProductPage";


export default async function handler(req, res) {
  if (req.headers["x-system-key"] !== process.env.NEXT_PUBLIC_SYSTEM_KEY) {
    return res.status(401).json({ message: "Unauthorized Access" });
  }
 

  const { herosectionid } = req.query;

  try {
    if (req.method === "GET") {
      
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

   
    return res.status(405).json({ error: "Method Not Allowed" });

  } catch (error) {
    console.error("Error handling data:", error);
    return res.status(500).json({ error: "Server Error" });
  }
}
