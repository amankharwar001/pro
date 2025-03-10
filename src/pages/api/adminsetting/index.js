import adminSetting from '@/models/adminSetting';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const setting = await adminSetting.findOne();
      if (setting) {
        return res.status(200).json({ name: setting.name });
      }
      return res.status(404).json({ message: 'Admin name not found' });
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching admin name', error: error.message });
    }
  }

  if (req.method === 'POST') {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Name is required' });
    }

    try {
      // Find if an entry exists with the name "adminName"
      let setting = await adminSetting.findOne();

      if (setting) {
        // If the entry exists, update it
        setting = await setting.update({ name });
        return res.status(200).json({ message: 'Admin name updated successfully', data: setting });
      } else {
        // If the entry doesn't exist, create a new one
        setting = await adminSetting.create({ name });
        return res.status(200).json({ message: 'Admin name created successfully', data: setting });
      }
    } catch (error) {
      return res.status(500).json({ message: 'Error saving or updating admin name', error: error.message });
    }
  }

  res.status(405).json({ message: 'Method not allowed' });
}
