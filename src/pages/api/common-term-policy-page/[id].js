import CommonTermConditionPage from '@/models/commontermpolicypage';

export default async function handler(req, res) {
    if (req.headers['x-system-key'] !== process.env.NEXT_PUBLIC_SYSTEM_KEY) {
        return res.status(401).json({ message: 'Unauthorized Access' });
      }
    
    const { method } = req;
    const { id } = req.query;

    switch (method) {
        case 'GET':
            try {
                if (id) {
                    // Fetch a single record by ID
                    const record = await CommonTermConditionPage.findOne({where:{referenceType:id}});
                    if (!record) {
                        return res.status(404).json({ success: false, message: 'Record not found' });
                    }
                    res.status(200).json({ success: true, data: record });
                } 
            } catch (error) {
                res.status(500).json({ success: false, message: 'Server error', error: error.message });
            }
            break;

        case 'POST':
            try {
                const { content, referenceType } = req.body;

                if (!content || !referenceType) {
                    return res.status(400).json({ success: false, message: 'Content and referenceType are required' });
                }

                const newRecord = await CommonTermConditionPage.create({ content, referenceType });
                res.status(201).json({ success: true, data: newRecord });
            } catch (error) {
                res.status(500).json({ success: false, message: 'Server error', error: error.message });
            }
            break;

        case 'PUT':
            try {
                if (!id) {
                    return res.status(400).json({ success: false, message: 'ID is required for updating a record' });
                }

                const { content, referenceType } = req.body;

                const record = await CommonTermConditionPage.findByPk(id);
                if (!record) {
                    return res.status(404).json({ success: false, message: 'Record not found' });
                }

                record.content = content ?? record.content;
                record.referenceType = referenceType ?? record.referenceType;
                await record.save();

                res.status(200).json({ success: true, data: record });
            } catch (error) {
                res.status(500).json({ success: false, message: 'Server error', error: error.message });
            }
            break;

        case 'DELETE':
            try {
                if (!id) {
                    return res.status(400).json({ success: false, message: 'ID is required for deleting a record' });
                }

                const record = await CommonTermConditionPage.findByPk(id);
                if (!record) {
                    return res.status(404).json({ success: false, message: 'Record not found' });
                }

                await record.destroy();
                res.status(200).json({ success: true, message: 'Record deleted successfully' });
            } catch (error) {
                res.status(500).json({ success: false, message: 'Server error', error: error.message });
            }
            break;

        default:
            res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
            res.status(405).json({ success: false, message: `Method ${method} not allowed` });
            break;
    }
}
