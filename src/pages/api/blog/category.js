// Import necessary modules and models

import Category from '@/models/blogPage/Category';
import { Sequelize } from 'sequelize';
import { isUUID } from 'validator';

export default async function handler(req, res) {
    if (req.headers['x-system-key'] !== process.env.NEXT_PUBLIC_SYSTEM_KEY) {
        return res.status(401).json({ message: 'Unauthorized Access' });
      }
    switch (req.method) {
        case 'GET':
            try {
                const categories = await Category.findAll();
                res.status(200).json(categories);
            } catch (error) {
                res.status(500).json({ message: error.message });
            }
            break;

        case 'POST':
            try {
                const { category } = req.body;
                const newCategory = await Category.create({ category });
                res.status(201).json(newCategory);
            } catch (error) {
                res.status(500).json({ message: error.message });
            }
            break;

        case 'PUT':
        case 'PATCH':
            try {
                const { id } = req.query;
                const { category } = req.body;

                // Validate UUID
                if (!isUUID(id)) {
                    return res.status(400).json({ message: 'Invalid UUID' });
                }

                const updatedCategory = await Category.findByPk(id);
                if (!updatedCategory) {
                    return res.status(404).json({ message: 'Category not found' });
                }

                updatedCategory.category = category;
                await updatedCategory.save();
                res.status(200).json(updatedCategory);
            } catch (error) {
                res.status(500).json({ message: error.message });
            }
            break;

        case 'DELETE':
            try {
                const { id } = req.query;

                // Validate UUID
                if (!isUUID(id)) {
                    return res.status(400).json({ message: 'Invalid UUID' });
                }

                const deletedCategory = await Category.findByPk(id);
                if (!deletedCategory) {
                    return res.status(404).json({ message: 'Category not found' });
                }

                await deletedCategory.destroy();
                res.status(200).json({ message: 'Category deleted successfully' });
            } catch (error) {
                res.status(500).json({ message: error.message });
            }
            break;

        default:
            res.setHeader('Allow', ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
            break;
    }
}
