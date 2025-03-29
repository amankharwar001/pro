import ProductArrangement from "@/models/productPage/ProductArrangement"; 

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { info } = req.body;

      if (!info || typeof info !== "object") {
        return res.status(400).json({ error: "Invalid product arrangement data" });
      }

      // Check if an entry already exists
      const existingData = await ProductArrangement.findOne();

      if (existingData) {
        // Update the existing record
        await existingData.update({ info });
        return res.status(200).json({ message: "Product arrangement updated successfully", data: existingData });
      } else {
        // Insert new data if none exists
        const savedData = await ProductArrangement.create({ info });
        return res.status(201).json({ message: "Product arrangement saved successfully", data: savedData });
      }
    } catch (error) {
      console.error("Error saving product arrangement:", error);
      return res.status(500).json({ error: "Failed to save product arrangement" });
    }
  } 
  
  else if (req.method === "GET") {
    try {
      const arrangementData = await ProductArrangement.findOne();
      return res.status(200).json({ data: arrangementData });
    } catch (error) {
      console.error("Error fetching product arrangement:", error);
      return res.status(500).json({ error: "Failed to fetch product arrangement" });
    }
  } 
  
  else {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
}
