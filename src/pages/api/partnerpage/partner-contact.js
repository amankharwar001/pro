import PartnerContactForm from "@/models/partnerPage/PartnerContactForm";

export default async function handler(req, res) {
  const { method, query } = req;

  try {
    if (method === "GET") {
      // Fetch all contact entries
      const contacts = await PartnerContactForm.findAll();
      return res.status(200).json(contacts);
    }

    if (method === "DELETE") {
      const { id } = query;

      // Validate if ID is provided
      if (!id) {
        return res.status(400).json({ error: "ID is required for deletion." });
      }

      // Find and delete the contact entry by ID
      const contact = await PartnerContactForm.findByPk(id);
      if (!contact) {
        return res.status(404).json({ error: "Contact not found." });
      }

      await contact.destroy();
      return res.status(200).json({ message: "Contact deleted successfully." });
    }

    // Handle unsupported methods
    return res.status(405).json({ error: "Method not allowed." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error." });
  }
}
