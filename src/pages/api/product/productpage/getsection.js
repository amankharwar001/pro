import HeroSectionProductPage from "@/models/productPage/HeroSectionProductPage";
import SEOProductPage from "@/models/productPage/SEO";
import ProductPageStatus from "@/models/productPage/Status";

export default async function handler(req, res) {
  if (req.headers['x-system-key'] !== process.env.NEXT_PUBLIC_SYSTEM_KEY) {
    return res.status(401).json({ message: 'Unauthorized Access' });
  }
  if (req.method === "GET") {
    try {
      // Fetch all blogs
      const products = await HeroSectionProductPage.findAll();

      // For each blog, fetch its heading and status
      const result = await Promise.all(
          products.map(async (product) => {
              const heading = await HeroSectionProductPage.findOne({ where: { id:product.id } });
              const status = await ProductPageStatus.findOne({ where: { productId: product.id } });
              const seo = await SEOProductPage.findOne({ where: { heroSectionId: product.id } });

              return {
                  id: product.id,
                  nickname: heading ? heading.nickname : null,
                  status: status ? status.status: null,
                  seo:seo? seo.slug : null
              };
          })
      );

      res.status(200).json(result);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
  } 
  
  // If the method is not GET, return Method Not Allowed
  else {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
}
