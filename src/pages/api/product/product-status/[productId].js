import ProductPageStatus from "@/models/productPage/Status";
import heroSectionProductPage from '@/models/productPage/HeroSectionProductPage.js';
import section2Product from '@/models/productPage/Section2Product.js';
import section3Product from '@/models/productPage/Section3Products.js';
import section4Product from '@/models/productPage/Section4Product.js';
import section5Product from '@/models/productPage/Section5Product.js';
import section6Product from '@/models/productPage/Section6Product.js';
import section7Product from '@/models/productPage/Section7Product.js';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { productId, productstatus } = req.query;

        if (!productId) {
            return res.status(400).json({ error: 'productId is required' });
        }

        if (!productstatus || !['draft', 'active'].includes(productstatus)) {
            return res.status(400).json({ error: 'Invalid productstatus. It must be either "draft" or "active".' });
        }

        try {
            // Check if the productId exists in all required models
            // const heroExists = await heroSectionProductPage.findOne({ where: { id: productId } });
            // const section2Exists = await section2Product.findOne({ where: { heroSectionId: productId } });
            // const section3Exists = await section3Product.findOne({ where: { heroSectionId: productId } });
            // const section4Exists = await section4Product.findOne({ where: { heroSectionId: productId } });
            // const section5Exists = await section5Product.findOne({ where: { heroSectionId: productId } });
            // const section6Exists = await section6Product.findOne({ where: { heroSectionId: productId } });
            // const section7Exists = await section7Product.findOne({ where: { heroSectionId: productId } });

            // if (!heroExists || !section2Exists || !section3Exists || !section4Exists || !section5Exists || !section6Exists || !section7Exists) {
            //     return res.status(400).json({
            //         error: 'Product is missing in one or more sections. Please fill all sections before activating.',
            //     });
            // }

            // Check if productstatus already exists for the provided productId
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
