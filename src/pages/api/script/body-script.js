// import BodyScript from "@/models/Script/BodyScript";


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
//             return res.status(400).json({ error: 'BodyScript field is required' });
//           }
  
//           const newScript = await BodyScript.create({ script });
  
//           res.status(201).json({ message: 'Head script created successfully', data: newScript });
//         } catch (error) {
//           console.error(error);
//           res.status(500).json({ error: 'Failed to create head script' });
//         }
//         break;
  
//       // Get all head scripts
//       case 'GET':
//         try {
//           const scripts = await BodyScript.findAll();
  
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
//             return res.status(400).json({ error: 'BodyScript field is required' });
//           }
  
//           const scriptModel = await BodyScript.findByPk(id);
  
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
  
//           const scriptModel = await BodyScript.findByPk(id);
  
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













import BodyScript from "@/models/Script/BodyScript";

export default async function handler(req, res) {
  if (req.headers['x-system-key'] !== process.env.NEXT_PUBLIC_SYSTEM_KEY) {
    return res.status(401).json({ message: 'Unauthorized Access' });
  }

  const { method } = req;

  switch (method) {
    // ✅ GET - fetch the only body script
    case 'GET':
      try {
        const script = await BodyScript.findOne();
        res.status(200).json(script || {});
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch body script' });
      }
      break;

    // ✅ POST - create or update single record
    case 'POST':
      try {
        const { script } = req.body;

        if (!script) {
          return res.status(400).json({ error: 'script field is required' });
        }

        const existingScript = await BodyScript.findOne();

        if (existingScript) {
          await existingScript.update({ script });
          return res.status(200).json({ message: 'Body script updated successfully', data: existingScript });
        } else {
          const newScript = await BodyScript.create({ script });
          return res.status(201).json({ message: 'Body script created successfully', data: newScript });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to save body script' });
      }
      break;

    // ✅ PUT - update by ID manually
    case 'PUT':
      try {
        const { id } = req.query;
        const { script } = req.body;

        if (!script) {
          return res.status(400).json({ error: 'script field is required' });
        }

        const scriptModel = await BodyScript.findByPk(id);

        if (!scriptModel) {
          return res.status(404).json({ error: 'Body script not found' });
        }

        await scriptModel.update({ script });

        res.status(200).json({ message: 'Body script updated successfully', data: scriptModel });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update body script' });
      }
      break;

    // ✅ DELETE - delete by ID (if needed manually)
    case 'DELETE':
      try {
        const { id } = req.query;

        const scriptModel = await BodyScript.findByPk(id);

        if (!scriptModel) {
          return res.status(404).json({ error: 'Body script not found' });
        }

        await scriptModel.destroy();

        res.status(200).json({ message: 'Body script deleted successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete body script' });
      }
      break;

    // ❌ Invalid method
    default:
      res.status(405).json({ error: 'Method not allowed' });
  }
}
