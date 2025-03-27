import BlogActivate from "@/models/blogPage/blogactivate";


export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const blogStatus = await BlogActivate.findOne({ order: [["createdAt", "DESC"]] });
      res.status(200).json({ status: blogStatus ? blogStatus.status : "draft" });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch blog status" });
    }
  } else if (req.method === "POST") {
    try {
      const { status } = req.body;
      if (!["active", "draft"].includes(status)) {
        return res.status(400).json({ error: "Invalid status value" });
      }

      await BlogActivate.create({ status });
      res.status(200).json({ message: "Blog status updated successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to update blog status" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
