import ProductPageStatus from "@/models/productPage/Status";

const handler =async(req,res) => {
  if (req.headers['x-system-key'] !== process.env.NEXT_PUBLIC_SYSTEM_KEY) {
    return res.status(401).json({ message: 'Unauthorized Access' });
  }
  const { method, body, query } = req;

  switch (method) {
    case 'PATCH':
      const { status } = body;
      const { id } = query;

      // Check if the provided status is restricted
      if (status !== 'draft' && status !== 'active') {
        return res.status(400).json({ error: 'Invalid status value' });
      }

      try {
        // Update the product status
        const [affectedRows] = await ProductPageStatus.update(
          { statusbar: status },
          { where: { id } }
        );

        if (affectedRows === 1) {
          res.status(200).json({ message: 'Status updated successfully' });
        } else {
          res.status(404).json({ error: 'Product status not found' });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while updating the status' });
      }
      break;

    default:
      res.setHeader('Allow', ['PATCH']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
};

export default handler;