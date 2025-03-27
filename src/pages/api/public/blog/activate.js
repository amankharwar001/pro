import BlogActivate from "@/models/blogPage/blogactivate";


export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const blogStatus = await BlogActivate.findOne({ order: [["createdAt", "DESC"]] });
      res.status(200).json({ status: blogStatus ? blogStatus.status : "draft" });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch blog status" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
