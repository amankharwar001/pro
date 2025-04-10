
// import FooterScript from "@/models/Script/FooterScript";


// export default async function handler(req, res) {
//   if (req.headers['x-system-key'] !== process.env.NEXT_PUBLIC_SYSTEM_KEY) {
//     return res.status(401).json({ message: 'Unauthorized Access' });
//   }
//     const { method } = req;
  
//     switch (method) {
//       // Create a new head script
//       case 'POST':
//         try {
//           const { script } = req.body;
  
//           if (!script) {
//             return res.status(400).json({ error: 'FooterScript field is required' });
//           }
  
//           const newScript = await FooterScript.create({ script });
  
//           res.status(201).json({ message: 'Head script created successfully', data: newScript });
//         } catch (error) {
//           console.error(error);
//           res.status(500).json({ error: 'Failed to create head script' });
//         }
//         break;
  
//       // Get all head scripts
//       case 'GET':
//         try {
//           const scripts = await FooterScript.findAll();
  
//           res.status(200).json( scripts );
//         } catch (error) {
//           console.error(error);
//           res.status(500).json({ error: 'Failed to fetch head scripts' });
//         }
//         break;
  
//       // Update an existing head script by ID
//       case 'PUT':
//         try {
//           const { id } = req.query;
//           const { script } = req.body;
  
//           if (!script) {
//             return res.status(400).json({ error: 'FooterScript field is required' });
//           }
  
//           const scriptModel = await FooterScript.findByPk(id);
  
//           if (!scriptModel) {
//             return res.status(404).json({ error: 'Head script not found' });
//           }
  
//           await scriptModel.update({ script });
  
//           res.status(200).json({ message: 'Head script updated successfully', data: scriptModel });
//         } catch (error) {
//           console.error(error);
//           res.status(500).json({ error: 'Failed to update head script' });
//         }
//         break;
  
//       // Delete a head script by ID
//       case 'DELETE':
//         try {
//           const { id } = req.query;
  
//           const scriptModel = await FooterScript.findByPk(id);
  
//           if (!scriptModel) {
//             return res.status(404).json({ error: 'Head script not found' });
//           }
  
//           await scriptModel.destroy();
  
//           res.status(200).json({ message: 'Head script deleted successfully' });
//         } catch (error) {
//           console.error(error);
//           res.status(500).json({ error: 'Failed to delete head script' });
//         }
//         break;
  
//       // Method not allowed
//       default:
//         res.status(405).json({ error: 'Method not allowed' });
//     }
//   }











import FooterScript from "@/models/Script/FooterScript";

export default async function handler(req, res) {
  if (req.headers['x-system-key'] !== process.env.NEXT_PUBLIC_SYSTEM_KEY) {
    return res.status(401).json({ message: 'Unauthorized Access' });
  }

  const { method } = req;

  switch (method) {
    // ✅ GET - fetch current footer script (only one expected)
    case 'GET':
      try {
        const script = await FooterScript.findOne();
        res.status(200).json(script || {});
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch footer script' });
      }
      break;

    // ✅ POST - create or update footer script (single record logic)
    case 'POST':
      try {
        const { script } = req.body;

        if (!script) {
          return res.status(400).json({ error: 'script field is required' });
        }

        const existingScript = await FooterScript.findOne();

        if (existingScript) {
          await existingScript.update({ script });
          return res.status(200).json({ message: 'Footer script updated successfully', data: existingScript });
        } else {
          const newScript = await FooterScript.create({ script });
          return res.status(201).json({ message: 'Footer script created successfully', data: newScript });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to save footer script' });
      }
      break;

    // ✅ PUT - update by ID (manual update)
    case 'PUT':
      try {
        const { id } = req.query;
        const { script } = req.body;

        if (!script) {
          return res.status(400).json({ error: 'script field is required' });
        }

        const scriptModel = await FooterScript.findByPk(id);

        if (!scriptModel) {
          return res.status(404).json({ error: 'Footer script not found' });
        }

        await scriptModel.update({ script });

        res.status(200).json({ message: 'Footer script updated successfully', data: scriptModel });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update footer script' });
      }
      break;

    // ✅ DELETE - delete by ID
    case 'DELETE':
      try {
        const { id } = req.query;

        const scriptModel = await FooterScript.findByPk(id);

        if (!scriptModel) {
          return res.status(404).json({ error: 'Footer script not found' });
        }

        await scriptModel.destroy();

        res.status(200).json({ message: 'Footer script deleted successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete footer script' });
      }
      break;

    // ❌ Method Not Allowed
    default:
      res.status(405).json({ error: 'Method not allowed' });
  }
}
