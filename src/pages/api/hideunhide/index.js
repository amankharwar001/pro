import HideUnhideStatus from "@/models/hideUnhide";

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    const { SectionName, Status } = req.body; // Expecting section details in the request body
    
    if (!SectionName || !Status) {
      return res.status(400).json({ message: 'SectionName and Status are required' });
    }

    try {
      // Find if the section already exists
      const existingSection = await HideUnhideStatus.findOne({
        where: { SectionName }
      });

      if (existingSection) {
        // If the section exists, update it
        existingSection.Status = Status;
        await existingSection.save(); // Save updated section

        res.status(200).json({ message: 'Section updated successfully', section: existingSection });
      } else {
        // If the section does not exist, create a new one
        const newSection = await HideUnhideStatus.create({
          SectionName,
          Status
        });

        res.status(201).json({ message: 'Section created successfully', section: newSection });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error processing the request' });
    }
  } else if (req.method === 'GET') {
    const { SectionName } = req.query; // Expecting SectionName in the query parameters

    try {
      if (SectionName) {
        // If SectionName is provided, fetch the section by SectionName
        const section = await HideUnhideStatus.findOne({
          where: { SectionName }
        });

        if (!section) {
          return res.status(404).json({ message: 'Section not found' });
        }

        res.status(200).json(section); // Return the section details
      } else {
        res.status(400).json({ message: "SectionName is required" }); // Return error if no SectionName
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error retrieving section' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
