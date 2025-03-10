import GetInTouch from "@/models/getInTouch";

export default async function handler(req, res) {
  if (req.headers['x-system-key'] !== process.env.NEXT_PUBLIC_SYSTEM_KEY) {
    return res.status(401).json({ message: 'Unauthorized Access' });
  }
  const { method } = req;

  switch (method) {
    // GET: Fetch the single existing entry
    case "GET":
      try {
        const entry = await GetInTouch.findOne();
        if (!entry) return res.status(404).json({ error: "No entry found" });
        return res.status(200).json(entry);
      } catch (error) {
        console.error("Error fetching data:", error);
        return res.status(500).json({ error: "Failed to fetch data" });
      }

    // POST: Create or update the first entry
    case "POST":
      try {
        const { heading, content, card } = req.body;

        // Validate required fields
        if (!heading || !content || !Array.isArray(card)) {
          return res.status(400).json({
            error: "Heading, content, and card (array of objects) are required",
          });
        }

        // Check if the first entry exists
        const existingEntry = await GetInTouch.findOne();

        if (existingEntry) {
          // Update the existing entry
          const updatedEntry = await existingEntry.update({
            heading,
            content,
            card,
          });
          return res.status(200).json(updatedEntry);
        } else {
          // Create a new entry if none exists
          const newEntry = await GetInTouch.create({
            heading,
            content,
            card,
          });
          return res.status(201).json(newEntry);
        }
      } catch (error) {
        console.error("Error creating/updating data:", error);
        return res.status(500).json({ error: "Failed to create/update data" });
      }

    // DELETE: Reset the entry by clearing its fields (soft delete)
    case "DELETE":
      try {
        const entry = await GetInTouch.findOne();

        if (!entry) {
          return res.status(404).json({ error: "No entry found" });
        }

        // Clear the fields instead of deleting the record
        await entry.update({
          heading: "",
          content: "",
          card: [],
        });

        return res.status(200).json({ message: "Entry cleared successfully" });
      } catch (error) {
        console.error("Error clearing data:", error);
        return res.status(500).json({ error: "Failed to clear data" });
      }

    // Method not allowed
    default:
      return res.status(405).json({ error: "Method not allowed" });
  }
}
