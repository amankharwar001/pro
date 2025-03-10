import AdminFooterSetting from "@/models/adminSetting/footer";


export default async function handler(req, res) {
  if (req.headers['x-system-key'] !== process.env.NEXT_PUBLIC_SYSTEM_KEY) {
    return res.status(401).json({ message: 'Unauthorized Access' });
  }
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
  
    res.status(405).json({ message: 'Method not allowed' });
  }
  