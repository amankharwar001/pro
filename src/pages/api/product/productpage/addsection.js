import heroSectionProductPage from "@/models/productPage/HeroSectionProductPage";
import SEOProductPage from "@/models/productPage/SEO";

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

  if (req.method === "POST") {
    try {
      const { nickname, title, heading, text, btn, btnLink } = req.body;

      
      const newEntry = await heroSectionProductPage.create({
        nickname,
        title,
        heading,
        text,
        btn,
        btnLink,
      });

      

      if (heading) {
        
        const slug = generateSlug(heading);
        console.log("🔹 Generated Slug:", slug);

        try {
         
          console.log("🔹 Saving SEO Entry...");
          const seoEntry = await SEOProductPage.create({
            title: heading,
            slug: slug,
            heroSectionId: newEntry.id,
          });

          console.log("✅ SEO Entry Created Successfully:", seoEntry);
        } catch (seoError) {
          console.error("❌ Error saving SEO entry:", seoError);
        }
      } else {
        console.log("⚠️ No heading provided, skipping SEO entry.");
      }

      return res.status(201).json(newEntry); // Return the newly created entry
    } catch (error) {
      console.error("❌ Error creating data:", error);
      return res.status(500).json({ error: "Failed to create data" });
    }
  } else {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
}
