import ProductPageStatus from "@/models/productPage/Status";

export default async function handler(req, res) {
    if (req.headers['x-system-key'] !== process.env.NEXT_PUBLIC_SYSTEM_KEY) {
        return res.status(401).json({ message: 'Unauthorized Access' });
      }
    if (req.method === 'POST') {
        const { productId, productstatus } = req.query;

        if (!productId) {
            return res.status(400).json({ error: 'productId is required' });
        }

        if (!productstatus || !['draft', 'active'].includes(productstatus)) {
            return res.status(400).json({ error: 'Invalid productstatus. It must be either "draft" or "active".' });
        }

        try {
            
            const existingStatus = await ProductPageStatus.findOne({ where: { productId:productId } });

            if (existingStatus) {
                existingStatus.status = productstatus; // Update status if productId exists
                await existingStatus.save();
                return res.status(200).json(existingStatus); // Return the updated record
            } else {
                // Create a new record if it doesn't exist
                const newStatus = await ProductPageStatus.create({
                    productId,
                    status: productstatus,
                });

                return res.status(201).json(newStatus); // Return the newly created record
            }
        } catch (error) {
            console.error('Error processing productstatus:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    } else if (req.method === 'GET') {
        const { productId } = req.query;

        if (!productId) {
            return res.status(400).json({ error: 'productId is required' });
        }

        try {
            // Fetch the productstatus for the provided productId
            const productstatus = await ProductPageStatus.findOne({ where: { productId } });

            if (productstatus) {
                return res.status(200).json(productstatus);
            } else {
                return res.status(404).json({ error: 'productstatus not found for the provided productId' });
            }
        } catch (error) {
            console.error('Error fetching productstatus:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    } else {
        res.setHeader('Allow', ['POST', 'GET']);
        return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }
}
