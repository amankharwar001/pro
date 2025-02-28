import AdminModel from "@/models/AdminModel"; // Assuming AdminModel is exported from the correct location
import bcrypt from "bcryptjs"; // Used for comparing hashed passwords

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { currentPassword, newEmail } = req.body;  // Current password & new email

    if (!currentPassword || !newEmail) {
      return res.status(400).json({ error: "Both current password and new email are required" });
    }

    try {
      // Fetch the single admin record from the database (no condition needed since there's only one)
      const admin = await AdminModel.findOne(); // No filter needed since there's only one admin

      if (!admin) {
        return res.status(404).json({ error: "Admin not found" });
      }

      // Compare the provided password with the stored hash
      const isPasswordValid = await bcrypt.compare(currentPassword, admin.password);

      if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid password" });
      }

      // Update email in the database
      admin.email = newEmail; // Set the new email
      await admin.save(); // Save changes

      return res.status(200).json({ message: "Email updated successfully", newEmail: admin.email });

    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
