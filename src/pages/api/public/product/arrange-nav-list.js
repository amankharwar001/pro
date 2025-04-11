
import ProductArrangement from "@/models/productPage/ProductArrangement"; 
import HeroSectionProductPage from "@/models/productPage/HeroSectionProductPage";
import SEOProductPage from "@/models/productPage/SEO";
import ProductPageStatus from "@/models/productPage/Status";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const arrangementData = await ProductArrangement.findOne();

      if (!arrangementData || !Array.isArray(arrangementData.info)) {
        return res.status(200).json({ data: [] });
      }

      const productIds = arrangementData.info; // Selected product IDs

      
      // Fetch full product details for each ID
      const selectedProducts = await Promise.all(
        productIds.map(async (id) => {
          const heading = await HeroSectionProductPage.findOne({ where: { id } });
          const status = await ProductPageStatus.findOne({ where: { productId: id } });
          const seo = await SEOProductPage.findOne({ where: { heroSectionId: id } });

          return {
            id,
            nickname: heading ? heading.nickname : null,
            status: status ? status.status : null,
            seo: seo ? seo.slug : null,
          };
        })
      );

      return res.status(200).json({ data: selectedProducts });
    } catch (error) {
      console.error("Error fetching product arrangement:", error);
      return res.status(500).json({ error: "Failed to fetch product arrangement" });
    }
  } 
  
  return res.status(405).json({ error: "Method Not Allowed" });
}
