import LeadFormEmail from "@/models/formEmail/Email";


export default async function handler(req, res) {
  if (req.headers['x-system-key'] !== process.env.NEXT_PUBLIC_SYSTEM_KEY) {
    return res.status(401).json({ message: 'Unauthorized Access' });
  }
  if (req.method === 'GET') {
    try {
      const [record] = await LeadFormEmail.findAll();
      return res.status(200).json(record || { message: 'No data found' });
    } catch (error) {
      return res.status(500).json({ message: 'Failed to fetch data', error });
    }
  }

  if (req.method === 'PUT') {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
      const [record] = await LeadFormEmail.findAll();

      if (record) {
        // Update existing record
        await record.update({ email, password });
      } else {
        // Create the record if not found
        await LeadFormEmail.create({ email, password });
      }

      return res.status(200).json({ message: 'Data updated successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Failed to update data', error });
    }
  }

  res.setHeader('Allow', ['GET', 'PUT']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
