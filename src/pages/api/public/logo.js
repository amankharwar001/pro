
import ImagesData from '@/models/homePage/ImagesData'; 

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Fetch the avatar image associated with 'adminAvatar' referenceType
      const logo = await  ImagesData.findOne({ where: { referenceType: "websitelogo" } });
      const fevicon = await  ImagesData.findOne({ where: { referenceType: "websitefevicon" } });

      // Return both admin setting and avatar image data, even if empty
      return res.status(200).json({
        logo: logo || [], // Ensure an empty array if no image is found
        fevicon: fevicon || [], // Ensure an empty array if no image is found
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
