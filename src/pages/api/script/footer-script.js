
import FooterScript from "@/models/Script/FooterScript";


export default async function handler(req, res) {
    const { method } = req;
  
    switch (method) {
      // Create a new head script
      case 'POST':
        try {
          const { script } = req.body;
  
          if (!script) {
            return res.status(400).json({ error: 'FooterScript field is required' });
          }
  
          const newScript = await FooterScript.create({ script });
  
          res.status(201).json({ message: 'Head script created successfully', data: newScript });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Failed to create head script' });
        }
        break;
  
      // Get all head scripts
      case 'GET':
        try {
          const scripts = await FooterScript.findAll();
  
          res.status(200).json( scripts );
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Failed to fetch head scripts' });
        }
        break;
  
      // Update an existing head script by ID
      case 'PUT':
        try {
          const { id } = req.query;
          const { script } = req.body;
  
          if (!script) {
            return res.status(400).json({ error: 'FooterScript field is required' });
          }
  
          const scriptModel = await FooterScript.findByPk(id);
  
          if (!scriptModel) {
            return res.status(404).json({ error: 'Head script not found' });
          }
  
          await scriptModel.update({ script });
  
          res.status(200).json({ message: 'Head script updated successfully', data: scriptModel });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Failed to update head script' });
        }
        break;
  
      // Delete a head script by ID
      case 'DELETE':
        try {
          const { id } = req.query;
  
          const scriptModel = await FooterScript.findByPk(id);
  
          if (!scriptModel) {
            return res.status(404).json({ error: 'Head script not found' });
          }
  
          await scriptModel.destroy();
  
          res.status(200).json({ message: 'Head script deleted successfully' });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Failed to delete head script' });
        }
        break;
  
      // Method not allowed
      default:
        res.status(405).json({ error: 'Method not allowed' });
    }
  }