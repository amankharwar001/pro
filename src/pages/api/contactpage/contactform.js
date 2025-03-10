import ContactForm from "@/models/contactPage/ContactForm";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const {
        name,
        designation,
        companyName,
        address,
        city,
        country,
        state,
        pinCode,
        phone,
        email,
        enquiryType,
        queryComment,
      } = req.body;

      if (!name || !designation || !companyName || !address || !city || !country || !state || !pinCode || !phone || !email || !enquiryType || !queryComment) {
        return res.status(400).json({ error: 'All fields are required' });
      }

      // Create a new entry in the database
      const newSubmission = await ContactForm.create({
        name,
        designation,
        companyName,
        address,
        city,
        country,
        state,
        pinCode,
        phone,
        email,
        enquiryType,
        queryComment,
      });

      return res.status(201).json({ message: 'Form submitted successfully', data: newSubmission });
    } catch (error) {
      console.error('Error saving data:', error);
      return res.status(500).json({ error: 'Failed to save data' });
    }
  } else if (req.method === 'GET') {
    try {
      // Fetch all submissions
      const data = await ContactForm.findAll(); // Sequelize's method to get all entries

      return res.status(200).json({ message: 'Data retrieved successfully', data });
    } catch (error) {
      console.error('Error retrieving data:', error);
      return res.status(500).json({ error: 'Failed to retrieve data' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const { id } = req.query;

      // Delete a specific submission
      const deletedSubmission = await ContactForm.destroy({ where: { id } });

      if (!deletedSubmission) {
        return res.status(404).json({ error: 'Submission not found' });
      }

      return res.status(200).json({ message: 'Submission deleted successfully' });
    } catch (error) {
      console.error('Error deleting data:', error);
      return res.status(500).json({ error: 'Failed to delete data' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
