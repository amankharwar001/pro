import heroSectionProductPage from "@/models/productPage/HeroSectionProductPage";

export default async function handler(req, res) {
  if (req.headers['x-system-key'] !== process.env.NEXT_PUBLIC_SYSTEM_KEY) {
    return res.status(401).json({ message: 'Unauthorized Access' });
  }
    
  // If it's a POST request, create a new entry (if no data exists yet)
  if (req.method === 'POST') {
    try {
      const { nickname,title, heading, text, btn, btnLink } = req.body;
        // Create a new entry
        const newEntry = await heroSectionProductPage.create({
          nickname,
          title,
          heading,
          text,
          btn,
          btnLink,
        });
        return res.status(201).json(newEntry);  // Return the newly created entry
    } catch (error) {
      console.error('Error creating data:', error);
      return res.status(500).json({ error: 'Failed to create data' });
    }
  }

  // If any other HTTP method is used, return Method Not Allowed
  else {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}
