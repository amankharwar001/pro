

import BlogActivate from "@/models/blogPage/blogactivate";
import SEOProductPage from "@/models/productPage/SEO";
import ProductPageStatus from "@/models/productPage/Status";
import SEOBlogPage from "@/models/blogPage/SEO";
import BlogStatus from "@/models/blogPage/BlogStatus";

import CreatePageSEO from "@/models/create-page/SEO";
import CreatePageStatus from "@/models/create-page/PageStatus";

export default async function handler(req, res) {
  if (req.headers["x-system-key"] !== process.env.NEXT_PUBLIC_SYSTEM_KEY) {
    return res.status(401).json({ message: "Unauthorized Access" });
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_PATH;

  try {
    // === Product Page ===
    const activeProductStatuses = await ProductPageStatus.findAll({
      where: { status: "active" },
      attributes: ["productId"],
    });
    const activeProductIds = activeProductStatuses.map((status) => status.productId);

    const productPages = await Promise.all(
      activeProductIds.map(async (id) => {
        const seo = await SEOProductPage.findOne({ where: { heroSectionId: id } });
        return seo?.slug ? `product/${seo.slug}` : null;
      })
    );

    // === Blog Page ===
    const activeBlogStatuses = await BlogStatus.findAll({
      where: { status: "active" },
      attributes: ["blogId"],
    });
    const activeBlogIds = activeBlogStatuses.map((status) => status.blogId);

    const blogPages = await Promise.all(
      activeBlogIds.map(async (id) => {
        const seo = await SEOBlogPage.findOne({ where: { blogId: id } });
        return seo?.slug ? `blog/${seo.slug}` : null;
      })
    );
    const blogActivation = await BlogActivate.findOne();
    const isBlogActive = blogActivation?.status === "active";

    // === Create Page ===
    const activeCreateStatuses = await CreatePageStatus.findAll({
      where: { status: "active" },
      attributes: ["id"],
    });
    const activeCreateIds = activeCreateStatuses.map((status) => status.id);

    const createPages = await Promise.all(
      activeCreateIds.map(async (id) => {
        const seo = await CreatePageSEO.findOne({ where: { id } });
        return seo?.slug ? seo.slug : null;
      })
    );

    // === Filter & Combine ===
    const filteredProductPages = productPages.filter((page) => page);
    const filteredBlogPages = blogPages.filter((page) => page);
    const filteredCreatePages = createPages.filter((page) => page);

    const staticPages = [
      "",
      "about",
      "contact",
      "partner",
      "refund-policy",
      "privacy-policy",
      "term-and-condition",
      "transaction-document",
    ];

    const allPages = [
      ...staticPages,
      ...filteredProductPages,
      ...(isBlogActive ? filteredBlogPages : []),
      ...filteredCreatePages,
    ];

    // === Generate Sitemap XML ===
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
