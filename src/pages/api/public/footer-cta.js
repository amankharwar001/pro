import FooterCTA from '@/models/adminSetting/footerCta';

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const footerCta = await FooterCTA.findOne();

      return res.status(200).json({
        success: true,
        data: footerCta,
      });
    } else {
      return res.status(405).json({
        success: false,
        message: `Method ${req.method} Not Allowed`,
      });
    }
  } catch (error) {
    console.error('API Error:', error);

    return res.status(500).json({
      success: false,
      message: 'An error occurred while processing the request.',
      error: error.message,
    });
  }
}
