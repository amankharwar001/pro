import ProductArrangement from "@/models/productPage/ProductArrangement";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const arrangementData = await ProductArrangement.findOne();
      return res.status(200).json({ data: arrangementData });
    } catch (error) {
      console.error("Error fetching product arrangement:", error);
      return res.status(500).json({ error: "Failed to fetch product arrangement" });
    }
  } 
  
  return res.status(405).json({ error: "Method Not Allowed" });
}
