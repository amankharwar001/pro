











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
      

      let existingEntry = await heroSectionCreatePage.findOne({ where: { id: herosectionid } });
   

      if (!existingEntry) {
        
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
    

      const existingEntry = await heroSectionCreatePage.findOne({ where: { id: herosectionid } });
      

      if (existingEntry) {
        
        return res.status(400).json({ error: "Entry already exists. Use PUT to update it." });
      }

      
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
     

      if (heading) {
       
        const slug = generateSlug(heading);
        

        try {
         
          const seoEntry = await CreatePageSEO.create({
            id: herosectionid, // Assigning ID
            title: heading,
            slug: slug,
          });
          
        } catch (seoError) {
          console.error("Error saving SEO entry:", seoError);
        }
      } else {
       
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
      
      const entry = await heroSectionCreatePage.findOne({ where: { id: herosectionid } });
     

      if (!entry) {
        
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
   
    return res.status(405).json({ error: "Method Not Allowed" });
  }
}
