// import ProductArrangement from "@/models/productPage/ProductArrangement"; 

// export default async function handler(req, res) {
//   if (req.method === "POST") {
//     try {
//       const { info } = req.body;

//       if (!info || typeof info !== "object") {
//         return res.status(400).json({ error: "Invalid product arrangement data" });
//       }

//       // Check if an entry already exists
//       const existingData = await ProductArrangement.findOne();

//       if (existingData) {
//         // Update the existing record
//         await existingData.update({ info });
//         return res.status(200).json({ message: "Product arrangement updated successfully", data: existingData });
//       } else {
//         // Insert new data if none exists
//         const savedData = await ProductArrangement.create({ info });
//         return res.status(201).json({ message: "Product arrangement saved successfully", data: savedData });
//       }
//     } catch (error) {
//       console.error("Error saving product arrangement:", error);
//       return res.status(500).json({ error: "Failed to save product arrangement" });
//     }
//   } 
  
//   else if (req.method === "GET") {
//     try {
//       const arrangementData = await ProductArrangement.findOne();
//       return res.status(200).json({ data: arrangementData });
//     } catch (error) {
//       console.error("Error fetching product arrangement:", error);
//       return res.status(500).json({ error: "Failed to fetch product arrangement" });
//     }
//   } 
  
//   else {
//     return res.status(405).json({ error: "Method Not Allowed" });
//   }
// }




import ProductArrangement from "@/models/productPage/ProductArrangement"; 
import HeroSectionProductPage from "@/models/productPage/HeroSectionProductPage";
import SEOProductPage from "@/models/productPage/SEO";
import ProductPageStatus from "@/models/productPage/Status";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { info } = req.body;

      if (!Array.isArray(info) || info.some(id => typeof id !== "string")) {
        return res.status(400).json({ error: "Invalid product arrangement data" });
      }

      const existingData = await ProductArrangement.findOne();

      if (existingData) {
        await existingData.update({ info });
        return res.status(200).json({ message: "Product arrangement updated successfully" });
      } else {
        const savedData = await ProductArrangement.create({ info });
        return res.status(201).json({ message: "Product arrangement saved successfully" });
      }
    } catch (error) {
      console.error("Error saving product arrangement:", error);
      return res.status(500).json({ error: "Failed to save product arrangement" });
    }
  } 

  else if (req.method === "GET") {
    try {
      const arrangementData = await ProductArrangement.findOne();

      if (!arrangementData || !Array.isArray(arrangementData.info)) {
        return res.status(200).json({ data: [] });
      }

      const productIds = arrangementData.info; // Selected product IDs

      console.log("product id show is here in api ",productIds)

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

  else {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
}
