import HeroSectionProductPage from "@/models/productPage/HeroSectionProductPage";
import SEOProductPage from "@/models/productPage/SEO";
import ProductPageStatus from "@/models/productPage/Status";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      // Fetch all products with active status
      const activeStatuses = await ProductPageStatus.findAll({
        where: { status: "active" },
        attributes: ["productId"], // Only fetch the productId field
      });

      if (activeStatuses.length === 0) {
        return res.status(404).json({ error: "No active products found" });
      }

      const activeProductIds = activeStatuses.map((status) => status.productId);

      // Fetch products and related data for active IDs
      const products = await Promise.all(
        activeProductIds.map(async (id) => {
          const product = await HeroSectionProductPage.findOne({ where: { id } });
          const seo = await SEOProductPage.findOne({ where: { heroSectionId: id } });

          return {
            id: product?.id || null,
            nickname: product?.nickname || null,
            status: "active", // Since we're only querying active products
            seo: seo?.slug || null,
          };
        })
      );

      // Filter out any null products (if some products don't exist in HeroSectionProductPage)
      const filteredProducts = products.filter((product) => product.id);

      return res.status(200).json(filteredProducts);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    // If the method is not GET, return Method Not Allowed
    return res.status(405).json({ error: "Method Not Allowed" });
  }
}
