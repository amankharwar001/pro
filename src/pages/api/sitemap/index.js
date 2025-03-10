
import SEOProductPage from "@/models/productPage/SEO";
import ProductPageStatus from "@/models/productPage/Status";
import SEOBlogPage from "@/models/blogPage/SEO";

export default async function handler(req, res) {
  if (req.headers['x-system-key'] !== process.env.NEXT_PUBLIC_SYSTEM_KEY) {
    return res.status(401).json({ message: 'Unauthorized Access' });
  }
  const baseUrl = process.env.NEXT_PUBLIC_BASE_PATH ;

  try {
    // Fetch all products with active status
    const activeStatuses = await ProductPageStatus.findAll({
      where: { status: "active" },
      attributes: ["productId"], // Only fetch the productId field
    });

    const activeProductIds = activeStatuses.map((status) => status.productId);

    // Fetch product SEO slugs
    const productPages = await Promise.all(
      activeProductIds.map(async (id) => {
        const seo = await SEOProductPage.findOne({ where: { heroSectionId: id } });
        return seo?.slug ? `product/${seo.slug}` : null;
      })
    );

    // Fetch blog SEO slugs
    const blogSEOs = await SEOBlogPage.findAll({
      attributes: ["slug"], // Only fetch the slug field
    });
    const blogPages = blogSEOs.map((seo) => (seo.slug ? `blog/${seo.slug}` : null));

    // Filter out null pages
    const filteredProductPages = productPages.filter((page) => page);
    const filteredBlogPages = blogPages.filter((page) => page);

    // Combine static and dynamic pages
    const staticPages = [
      "",
      "about",
      "contact",
      "partner",
      "refund-policy",
      "privacy-policy",
      "term-and-condition",
    ];
    const allPages = [...staticPages, ...filteredProductPages, ...filteredBlogPages];

    // Generate XML
    const sitemap = `
      <?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${allPages
          .map(
            (page) => `
          <url>
            <loc>${baseUrl}${page}</loc>
          </url>`
          )
          .join("")}
      </urlset>
    `;

    res.setHeader("Content-Type", "application/xml");
    res.status(200).send(sitemap.trim());
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
