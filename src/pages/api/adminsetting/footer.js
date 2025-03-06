import AdminFooterSetting from "@/models/adminSetting/footer";


export default async function handler(req, res) {
    if (req.method === 'GET') {
      try {
        const setting = await AdminFooterSetting.findOne();
        if (setting) {
          return res.status(200).json(setting);
        }
        return res.status(404).json({ message: 'No admin settings found' });
      } catch (error) {
        return res.status(500).json({ message: 'Error fetching settings', error: error.message });
      }
    }
  
    if (req.method === 'POST') {
      const { content, heading, buttons, socialLinks,copyright  } = req.body;
  
      try {
        let setting = await AdminFooterSetting.findOne();
  
        if (setting) {
          // Update existing entry
          await setting.update({ content, heading, buttons, socialLinks,copyright  });
          return res.status(200).json({ message: 'Settings updated successfully', data: setting });
        } else {
          // Create a new entry
          setting = await AdminFooterSetting.create({ content, heading, buttons, socialLinks,copyright  });
          return res.status(201).json({ message: 'Settings created successfully', data: setting });
        }
      } catch (error) {
        return res.status(500).json({ message: 'Error saving settings', error: error.message });
      }
    }
  
    res.status(405).json({ message: 'Method not allowed' });
  }
  