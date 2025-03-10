// import heroSectionProductPage from '@/models/productPage/HeroSectionProductPage.js';
// import section2Product from '@/models/productPage/Section2Product.js';
// import section3Product from '@/models/productPage/Section3Products.js';
// import section4Product from '@/models/productPage/Section4Product.js';
// import section5Product from '@/models/productPage/Section5Product.js';
// import section6Product from '@/models/productPage/Section6Product.js';
// import section7Product from '@/models/productPage/Section7Product.js';
// import SEOProductPage from '@/models/productPage/SEO.js';
// import ProductPageStatus from '@/models/productPage/Status.js';
// export default async function handler(req, res) {
//   if (req.method === "DELETE") {
//     const { id } = req.query; // Get the product ID from the query parameter
    
//     if (!id) {
//       return res.status(400).json({ error: "Product ID is required" });
//     }

//     try {  
//       // Attempt to delete the product by its ID
//       const deletedProduct = await heroSectionProductPage.destroy({
//         where: { id: id }, // Use Sequelize's destroy method to delete by ID
//       });

//       if (deletedProduct === 0) {
//         return res.status(404).json({ error: "Product not found" });
//       }

//       return res.status(200).json({ message: "Product deleted successfully" });
//     } catch (error) {
//       console.error("Error deleting product:", error);
//       return res.status(500).json({ error: "Failed to delete product" });
//     }
//   }

//   // If the method is not DELETE, return Method Not Allowed
//   else {
//     return res.status(405).json({ error: "Method Not Allowed" });
//   }
// }

import heroSectionProductPage from '@/models/productPage/HeroSectionProductPage.js';
import section2Product from '@/models/productPage/Section2Product.js';
import section3Product from '@/models/productPage/Section3Products.js';
import section4Product from '@/models/productPage/Section4Product.js';
import section5Product from '@/models/productPage/Section5Product.js';
import section6Product from '@/models/productPage/Section6Product.js';
import section7Product from '@/models/productPage/Section7Product.js';
import SEOProductPage from '@/models/productPage/SEO.js';
import ProductPageStatus from '@/models/productPage/Status.js';

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    const { id } = req.query; // Get the product ID from the query parameter
    
    if (!id) {
      return res.status(400).json({ error: 'Product ID is required' });
    }

    try {
      // Check if the hero section exists
      const heroSectionExists = await heroSectionProductPage.findOne({ where: { id } });
      if (!heroSectionExists) {
        return res.status(404).json({ error: 'Hero section not found' });
      }

      // Function to delete related records from a model
      const deleteRecords = async (model, whereCondition) => {
        try {
          await model.destroy(whereCondition);
        } catch (err) {
          console.error(`Error deleting records from ${model.name}:`, err);
          throw new Error(`Failed to delete records from ${model.name}`);
        }
      };

      // Delete related records in parallel
      await Promise.all([
        deleteRecords(section2Product, { where: { heroSectionId: id } }),
        deleteRecords(section3Product, { where: { heroSectionId: id } }),
        deleteRecords(section4Product, { where: { heroSectionId: id } }),
        deleteRecords(section5Product, { where: { heroSectionId: id } }),
        deleteRecords(section6Product, { where: { heroSectionId: id } }),
        deleteRecords(section7Product, { where: { heroSectionId: id } }),
        deleteRecords(SEOProductPage, { where: { heroSectionId: id } }),
        deleteRecords(ProductPageStatus, { where: { productId: id } }),
      ]);

      // Delete the main hero section record
      const deletedHeroSection = await heroSectionProductPage.destroy({ where: { id } });
      if (deletedHeroSection) {
        return res.status(200).json({ message: 'Hero section and all related records deleted successfully' });
      } else {
        return res.status(404).json({ error: 'Hero section not found during deletion' });
      }
    } catch (error) {
      console.error('Error deleting hero section and related data:', error);
      return res.status(500).json({ error: 'Failed to delete hero section and related data' });
    }
  } else {
    // If the method is not DELETE, return Method Not Allowed
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}
