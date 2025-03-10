
import adminSetting from '@/models/adminSetting'; // MongoDB model
import ImagesData from '@/models/homePage/ImagesData'; // MongoDB model

export default async function handler(req, res) {
  if (req.headers['x-system-key'] !== process.env.NEXT_PUBLIC_SYSTEM_KEY) {
    return res.status(401).json({ message: 'Unauthorized Access' });
  }
  if (req.method === 'GET') {
    try {
      // Fetch the admin setting from the database
      const setting = await adminSetting.findOne(); // Adjust query as needed

      // Fetch the avatar image associated with 'adminAvatar' referenceType
      const avatarImage = await  ImagesData.findOne({ where: { referenceType: "adminAvatar" } });

      // If no admin setting is found, return an empty object
      if (!setting) {
        return res.status(200).json({
          setting: {},
          avatarImage: [],
        });
      }

      // Return both admin setting and avatar image data, even if empty
      return res.status(200).json({
        admin: setting.name || {}, // Ensure an empty object if no setting is found
        avatarImage: avatarImage || [], // Ensure an empty array if no image is found
      });
    } catch (error) {
      console.error('Error fetching data:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    // Handle unsupported methods
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
