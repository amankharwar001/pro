import AboutSection2 from "@/models/aboutPage/Section2";



export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      try {
        const section = await AboutSection2.findOne();
        if (section) {
          res.status(200).json(section);
        } else {
          res.status(200).json({}); // Return an empty object if no entry exists
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Failed to fetch data' });
      }
      break;
    case 'POST':
      try {
        const { title, heading, text } = req.body;

        if (!title || !heading || !text) {
          return res.status(400).json({ error: 'Title, heading, and text are required' });
        }

        let section = await AboutSection2.findOne();  // Find the first entry

        if (section) {
          // Update if entry exists
          section.title = title;
          section.heading = heading;
          section.text = text;
          await section.save();
          res.status(200).json(section);
        } else {
          // Create a new entry if none exists
          const newSection = await AboutSection2.create({
            title,
            heading,
            text,
          });
          res.status(201).json(newSection);
        }
      } catch (error) {
        console.error('Error creating/updating data:', error);
        res.status(500).json({ error: 'Failed to create/update data' });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).json({ error: 'Method Not Allowed' });
  }
}
